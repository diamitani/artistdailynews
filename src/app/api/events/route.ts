/**
 * POST /api/events — beacon endpoint for reader analytics.
 * GET  /api/events — aggregate rollups for the internal dashboard (service role required).
 *
 * Follows the db.ts REST pattern: Supabase via fetch, graceful no-op
 * when SUPABASE_SERVICE_ROLE_KEY is absent. Never throws — always JSON.
 */
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const EVENT_TYPES = new Set([
  "page_view",
  "engaged_read",
  "source_click",
  "signup",
  "share",
  "offer_click",
]);

// Substring match against the request User-Agent; bots are stored with
// bot_flag=true and are excluded from every aggregate.
const BOT_SUBSTRINGS = [
  "bot",
  "crawler",
  "spider",
  "headless",
  "lighthouse",
  "vercel",
  "pingdom",
  "slurp",
  "mediapartners-google",
  "ahrefs",
  "semrush",
  "mj12bot",
  "dotbot",
  "petalbot",
  "bytespider",
  "gptbot",
  "ccbot",
  "anthropic-ai",
  "claudebot",
  "facebookexternalhit",
  "twitterbot",
  "linkedinbot",
  "embedly",
  "quora",
  "slackbot",
  "discordbot",
  "whatsapp",
  "telegrambot",
  "monitor",
  "uptime",
  "statuscake",
  "uptimerobot",
  "datadog",
  "newrelic",
  "sentry",
];

// Best-effort dedupe: one stored page_view per (anon_id, article_slug) per 30 minutes.
// In-memory Map — survives as long as the server process lives (fine for Phase 1).
const DEDUPE_WINDOW_MS = 30 * 60 * 1000;
const pageViewSeen = new Map<string, number>();

function pruneDedupeCache() {
  const cutoff = Date.now() - DEDUPE_WINDOW_MS;
  for (const [key, ts] of pageViewSeen) {
    if (ts < cutoff) pageViewSeen.delete(key);
  }
}

function isBot(userAgent: string | null): boolean {
  if (!userAgent) return true; // beacon-less synthetic hits: treat as non-human
  const ua = userAgent.toLowerCase();
  return BOT_SUBSTRINGS.some((s) => ua.includes(s));
}

function restBase(): { url: string; key: string } | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return { url, key };
}

type EventBody = {
  articleId?: string;
  articleSlug?: string;
  event?: string;
  sessionId?: string;
  anonId?: string;
  referrer?: string;
};

export async function POST(req: NextRequest) {
  try {
    let body: EventBody = {};
    try {
      body = (await req.json()) as EventBody;
    } catch {
      return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
    }

    const { articleId, articleSlug, event, sessionId, anonId, referrer } = body;

    if (!event || !EVENT_TYPES.has(event)) {
      return NextResponse.json({ ok: false, error: "invalid_event" }, { status: 400 });
    }

    const userAgent = req.headers.get("user-agent");
    const botFlag = isBot(userAgent);

    // Dedupe page_views only; other events (clicks, signups, shares) are always stored.
    if (event === "page_view" && anonId && articleSlug) {
      pruneDedupeCache();
      const key = `${anonId}|${articleSlug}`;
      const last = pageViewSeen.get(key);
      const now = Date.now();
      if (last && now - last < DEDUPE_WINDOW_MS) {
        return NextResponse.json({ ok: true, deduped: true, bot: botFlag });
      }
      pageViewSeen.set(key, now);
    }

    const rest = restBase();
    if (!rest) {
      console.log("[analytics] Supabase unconfigured — event not persisted:", event, articleSlug);
      return NextResponse.json({ ok: true, stored: false });
    }

    const row = {
      article_id: articleId || null,
      article_slug: articleSlug || null,
      event_type: event,
      session_id: sessionId || null,
      anon_id: anonId || null,
      referrer: referrer || null,
      user_agent: userAgent ? userAgent.slice(0, 500) : null,
      bot_flag: botFlag,
    };

    const res = await fetch(`${rest.url}/rest/v1/reader_events`, {
      method: "POST",
      headers: {
        apikey: rest.key,
        Authorization: `Bearer ${rest.key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(row),
    });

    if (!res.ok) {
      console.warn("[analytics] reader_events insert failed:", res.status);
      return NextResponse.json({ ok: true, stored: false });
    }

    return NextResponse.json({ ok: true, stored: true, bot: botFlag });
  } catch (err) {
    console.warn("[analytics] POST /api/events error:", err);
    return NextResponse.json({ ok: true, stored: false });
  }
}

export async function GET(req: NextRequest) {
  try {
    const rest = restBase();
    if (!rest) {
      return NextResponse.json({ configured: false });
    }

    const { searchParams } = new URL(req.url);
    const days = Math.min(Math.max(parseInt(searchParams.get("days") || "7", 10) || 7, 1), 90);
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

    const headers = { apikey: rest.key, Authorization: `Bearer ${rest.key}` };

    // Totals by event type (humans only)
    const totalsRes = await fetch(
      `${rest.url}/rest/v1/reader_events?select=event_type&created_at=gte.${since}&bot_flag=eq.false`,
      { headers }
    );
    const totals: Record<string, number> = {
      page_view: 0,
      engaged_read: 0,
      source_click: 0,
      signup: 0,
      share: 0,
      offer_click: 0,
    };
    if (totalsRes.ok) {
      const rows = (await totalsRes.json()) as Array<{ event_type: string }>;
      for (const r of rows) {
        if (r.event_type in totals) totals[r.event_type] += 1;
      }
    }

    // Per-article rollup (humans only, slugs present)
    const articleRes = await fetch(
      `${rest.url}/rest/v1/reader_events?select=article_slug,event_type&created_at=gte.${since}&bot_flag=eq.false&article_slug=not.is.null&limit=5000`,
      { headers }
    );
    const perArticle: Record<string, { views: number; engaged: number; sourceClicks: number }> = {};
    if (articleRes.ok) {
      const rows = (await articleRes.json()) as Array<{ article_slug: string; event_type: string }>;
      for (const r of rows) {
        const bucket = (perArticle[r.article_slug] ||= { views: 0, engaged: 0, sourceClicks: 0 });
        if (r.event_type === "page_view") bucket.views += 1;
        else if (r.event_type === "engaged_read") bucket.engaged += 1;
        else if (r.event_type === "source_click") bucket.sourceClicks += 1;
      }
    }

    return NextResponse.json({ configured: true, days, totals, perArticle });
  } catch (err) {
    console.warn("[analytics] GET /api/events error:", err);
    return NextResponse.json({ configured: false, error: "failed" });
  }
}
