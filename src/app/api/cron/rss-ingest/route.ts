import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { createClient } from "@supabase/supabase-js";
import { INITIAL_FEEDS } from "@/lib/feeds-config";
import { fetchAndParseFeed } from "@/lib/rss-parser";
import { Article, FeedSource } from "@/lib/types";

export const maxDuration = 300; // Pro plan: allow the full tier1+tier2 sweep
export const dynamic = "force-dynamic";

/**
 * Daily content sync (Vercel Cron: 0 6 * * * UTC).
 *
 * Fetches enabled tier1/tier2 RSS feeds and upserts them into Supabase
 * `adn_items` — the table `getArticles()` reads for the homepage. Writes go
 * to Supabase only; the serverless filesystem is read-only at runtime, so
 * JSON-file writes would silently vanish between invocations.
 *
 * Editorial policy (replaces the old blunt ADN_AUTO_PUBLISH kill-switch):
 *  - suspect items (death-claim keywords)      → quarantined (human review)
 *  - allowlisted publishers with a valid,
 *    non-future publisher date                  → published w/ full provenance
 *  - everything else                            → draft (human review)
 *
 * Auth: CRON_SECRET is required. Vercel Cron automatically sends it as
 * `Authorization: Bearer <CRON_SECRET>` when the env var is set.
 */

// Established publishers whose feeds auto-publish. Everything else defaults
// to draft for human review.
const AUTO_PUBLISH_FEED_IDS = new Set<string>([
  "feed-mbw-main",
  "feed-billboard-biz",
  "feed-billboard-main",
  "feed-variety-music",
  "feed-rollingstone",
  "feed-pitchfork",
  "feed-pitchfork-reviews",
  "feed-thefader",
  "feed-stereogum",
  "feed-consequence",
  "feed-npr-music",
  "feed-nme",
  "feed-spin",
  "feed-guardian-music",
  "feed-bandcamp-daily",
  "feed-cdbaby-diy",
  "feed-musictech",
  "feed-digitalmusicnews",
  "feed-musicrow",
  "feed-djmag",
]);

const TRACKING_PARAMS = new Set([
  "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
  "fbclid", "gclid", "gclsrc", "mc_cid", "mc_eid", "igshid", "ref", "output",
]);

/** Canonical URL for dedupe: lowercase host, strip tracking params + hash + trailing slash. */
function normalizeUrl(raw: string): string {
  try {
    const u = new URL(raw.trim());
    u.hash = "";
    for (const p of [...u.searchParams.keys()]) {
      if (TRACKING_PARAMS.has(p.toLowerCase())) u.searchParams.delete(p);
    }
    u.hostname = u.hostname.toLowerCase();
    return u.toString().replace(/\/$/, "");
  } catch {
    return raw.trim().toLowerCase().replace(/\/$/, "");
  }
}

// Stories the owner verified as real reporting. The suspect-item filter must
// never re-quarantine these when feeds re-ingest them.
const VERIFIED_REAL_URLS = new Set<string>(
  [
    "https://www.theguardian.com/music/2026/jul/09/brian-potter-british-songwriter-rhinestone-cowboy-dies",
    "https://www.theguardian.com/music/2026/jul/09/bonnie-tyler-80s-pop-legend-known-for-total-eclipse-of-the-heart-and-more-dies-aged-75",
  ].map(normalizeUrl)
);

// Death-claim language that needs a human before it can go public.
const SUSPECT_DEATH_RE = /\b(obituary|dead at|dies at|died at|passes away|passed away|found dead|has died|killed in|dead aged)\b/i;

/** Deterministic row id so re-ingesting the same story updates one row. */
function deterministicId(canonicalUrl: string): string {
  return "art-" + createHash("sha1").update(canonicalUrl).digest("hex").slice(0, 16);
}

// Pillars: business (deals, royalties, legal), culture (news, releases, tours),
// social (features, community, tutorials). Mirrors scripts/ingest-real-articles.ts.
function determinePillar(art: Article): "business" | "culture" | "social" {
  const text = (art.title + " " + art.summary).toLowerCase();
  if (
    art.category === "financial" ||
    art.category === "legal" ||
    text.includes("royalt") || text.includes("payout") || text.includes("catalog") ||
    text.includes("deal") || text.includes("business") || text.includes("contract") ||
    text.includes("earnings") || text.includes("valuation") || text.includes("market") ||
    text.includes("acquisition") || text.includes("investment") || text.includes("copyright") ||
    text.includes("lawsuit") || text.includes("settlement")
  ) {
    return "business";
  }
  if (
    art.category === "social" || art.category === "tutorials" ||
    art.category === "podcasts" || art.category === "opportunities" ||
    art.category === "tech-ai" ||
    text.includes("interview") || text.includes("feature") || text.includes("spotlight") ||
    text.includes("guide") || text.includes("how to") || text.includes("tips") ||
    text.includes("masterclass") || text.includes("producer") ||
    text.includes("behind the") || text.includes("making of") || text.includes("community")
  ) {
    return "social";
  }
  return "culture";
}

function determinePlatform(art: Article): string {
  const text = (art.title + " " + art.summary + " " + art.sourceName).toLowerCase();
  if (text.includes("tiktok") || text.includes("reels") || text.includes("viral") || text.includes("short-form")) return "TikTok";
  if (text.includes("youtube") || text.includes("video") || text.includes("visual")) return "YouTube";
  if (text.includes("podcast") || text.includes("interview") || text.includes("audio")) return "Podcast";
  if (text.includes("instagram") || text.includes("social")) return "Instagram";
  if (text.includes("spotify") || text.includes("apple music") || text.includes("streaming")) return "Streaming";
  return "Web";
}

/** Valid, non-future publisher date — never inferred, never "now". */
function validPublisherDate(raw: string): string | null {
  if (!raw) return null;
  const ms = new Date(raw).getTime();
  if (isNaN(ms) || ms > Date.now() + 60 * 60 * 1000) return null;
  return new Date(ms).toISOString();
}

function isSuspect(art: Article, canonicalUrl: string): boolean {
  if (VERIFIED_REAL_URLS.has(canonicalUrl)) return false;
  return SUSPECT_DEATH_RE.test(art.title + " " + art.summary);
}

export async function GET(req: Request) {
  return handleRssIngest(req);
}

export async function POST(req: Request) {
  return handleRssIngest(req);
}

async function handleRssIngest(req: Request) {
  const startTime = Date.now();
  const { searchParams } = new URL(req.url);

  // ── Auth: fail closed ──────────────────────────────────────────
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    return NextResponse.json(
      { success: false, error: "CRON_SECRET is not configured; refusing to run." },
      { status: 500 }
    );
  }
  const bearerToken = req.headers.get("authorization")?.replace("Bearer ", "");
  const querySecret = searchParams.get("secret");
  if (bearerToken !== cronSecret && querySecret !== cronSecret) {
    return NextResponse.json({ error: "Unauthorized cron execution." }, { status: 401 });
  }

  // ── Supabase service-role client (writes bypass RLS) ───────────
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Supabase is not configured (need NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY); nothing was ingested.",
      },
      { status: 500 }
    );
  }
  const supabase = createClient(supabaseUrl, serviceKey);

  try {
    const activeFeeds = INITIAL_FEEDS.filter(
      (f: FeedSource) => f.enabled && (f.tier === "tier1" || f.tier === "tier2")
    );

    const feedResults: { name: string; category: string; count: number; status: string }[] = [];
    const seen = new Map<string, { art: Article; feed: FeedSource }>();

    // Batches of 8; the parser aborts hung feeds at 12s.
    const batchSize = 8;
    for (let i = 0; i < activeFeeds.length; i += batchSize) {
      const batch = activeFeeds.slice(i, i + batchSize);
      const settled = await Promise.allSettled(batch.map((feed) => fetchAndParseFeed(feed)));
      settled.forEach((result, idx) => {
        const feed = batch[idx];
        if (result.status === "fulfilled" && Array.isArray(result.value)) {
          let added = 0;
          for (const art of result.value) {
            const canonical = normalizeUrl(art.originalUrl || art.sourceUrl || "");
            if (!/^https?:\/\//i.test(canonical)) continue; // no canonical, no story
            if (!seen.has(canonical)) {
              seen.set(canonical, { art, feed });
              added++;
            }
          }
          feedResults.push({ name: feed.name, category: feed.category, count: added, status: "success" });
        } else {
          feedResults.push({ name: feed.name, category: feed.category, count: 0, status: "failed" });
        }
      });
    }

    // ── Map to adn_items rows with the editorial policy ──────────
    const ingestedAt = new Date().toISOString();
    const rows: Record<string, any>[] = [];
    let published = 0, drafted = 0, quarantined = 0;

    for (const { art, feed } of seen.values()) {
      const canonical = normalizeUrl(art.originalUrl || art.sourceUrl || "");
      const publisherDate = validPublisherDate(art.sourcePublishedAt || art.publishedAt || "");
      const suspect = isSuspect(art, canonical);

      let editorialStatus: "published" | "draft" | "quarantined";
      let quarantineReason: string | null = null;
      if (suspect) {
        editorialStatus = "quarantined";
        quarantineReason = "Suspect death claim — held for human editorial review (daily sync auto-quarantine)";
        quarantined++;
      } else if (AUTO_PUBLISH_FEED_IDS.has(feed.id) && publisherDate) {
        editorialStatus = "published";
        published++;
      } else {
        editorialStatus = "draft";
        drafted++;
      }

      rows.push({
        id: deterministicId(canonical),
        title: art.title,
        url: canonical,
        source_name: art.sourceName,
        source_url: art.sourceUrl || null,
        platform: determinePlatform(art),
        pillar: determinePillar(art),
        category: art.category,
        dek: art.summary || null,
        why_it_matters: art.takeaway || art.summary || null,
        bullets: art.bullets && art.bullets.length ? art.bullets : null,
        takeaway: art.takeaway || null,
        // TRUST: freshness/source dates come from the publisher only — never "now".
        freshness: publisherDate,
        published_at: publisherDate,
        source_published_at: publisherDate,
        ingested_at: ingestedAt,
        editorial_status: editorialStatus,
        quarantine_reason: quarantineReason,
        image_url: art.imageUrl || null,
        read_time_minutes: art.readTimeMinutes || 3,
        is_breaking: art.isBreaking || false,
        tags: art.tags && art.tags.length ? art.tags : [art.sourceName],
        updated_at: ingestedAt,
      });
    }

    // ── Upsert in chunks (conflict target: canonical url) ───────
    let upserted = 0;
    const chunkSize = 100;
    for (let i = 0; i < rows.length; i += chunkSize) {
      const chunk = rows.slice(i, i + chunkSize);
      const { error } = await supabase.from("adn_items").upsert(chunk, { onConflict: "url" });
      if (error) throw new Error(`Supabase upsert failed: ${error.message}`);
      upserted += chunk.length;
    }

    const durationMs = Date.now() - startTime;
    console.log(
      `[Cron RSS Ingest] Upserted ${upserted} rows (${published} published, ${drafted} draft, ${quarantined} quarantined) ` +
        `from ${activeFeeds.length} feeds in ${durationMs}ms.`
    );

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      durationMs,
      telemetry: {
        totalFeedsAttempted: activeFeeds.length,
        feedsSucceeded: feedResults.filter((f) => f.status === "success").length,
        uniqueArticles: rows.length,
        rowsUpserted: upserted,
        published,
        drafted,
        quarantined,
      },
      feedSummary: feedResults,
    });
  } catch (error: any) {
    console.error("[Cron RSS Ingest Fatal Error]", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Fatal error during RSS ingest.",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
