/**
 * Server-only reader analytics helpers (service-role REST queries on reader_events).
 * Returns [] / zeros when Supabase is unconfigured. Never throws.
 */
import { db } from "./db";

type MostReadItem = {
  slug: string;
  title?: string;
  sourceName?: string;
  views: number;
  engagedReads: number;
};

type ArticleStats = {
  views7d: number;
  engaged7d: number;
  sourceClicks7d: number;
};

type EventTotals = {
  page_view: number;
  engaged_read: number;
  source_click: number;
  signup: number;
  share: number;
  offer_click: number;
};

function restConfig(): { url: string; key: string } | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return { url, key };
}

function isConfigured(): boolean {
  return !!restConfig();
}

export function analyticsConfigured(): boolean {
  return isConfigured();
}

async function fetchEvents(
  since: string,
  select: string,
  extraFilter: string = ""
): Promise<Array<{ article_slug: string | null; event_type: string }>> {
  const cfg = restConfig();
  if (!cfg) return [];
  try {
    const params = `select=${select}&created_at=gte.${since}&bot_flag=eq.false${extraFilter}`;
    const res = await fetch(`${cfg.url}/rest/v1/reader_events?${params}&limit=10000`, {
      headers: { apikey: cfg.key, Authorization: `Bearer ${cfg.key}` },
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function sinceISO(days: number): string {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
}

/**
 * Ranked most-read articles: unique page_views desc, then engaged_reads desc.
 * Bot-flagged events excluded. Titles/source names resolved from the article catalog.
 */
export async function getMostRead(limit = 5, days = 7): Promise<MostReadItem[]> {
  try {
    const cfg = restConfig();
    if (!cfg) return [];

    const rows = await fetchEvents(sinceISO(days), "article_slug,event_type,anon_id");

    const viewsBySlug = new Map<string, Set<string>>(); // slug -> unique anon_ids
    const engagedBySlug = new Map<string, number>();

    for (const r of rows) {
      if (!r.article_slug) continue;
      if (r.event_type === "page_view") {
        if (!viewsBySlug.has(r.article_slug)) viewsBySlug.set(r.article_slug, new Set());
        // Unique reader: count distinct anon_ids; fall back to a synthetic token
        // when anon_id is missing so those views still count as one each.
        viewsBySlug.get(r.article_slug)!.add((r as { anon_id?: string }).anon_id || `__none_${r.article_slug}_${viewsBySlug.get(r.article_slug)!.size}`);
      } else if (r.event_type === "engaged_read") {
        engagedBySlug.set(r.article_slug, (engagedBySlug.get(r.article_slug) || 0) + 1);
      }
    }

    const items: MostReadItem[] = Array.from(viewsBySlug.entries()).map(([slug, set]) => ({
      slug,
      views: set.size,
      engagedReads: engagedBySlug.get(slug) || 0,
    }));

    items.sort((a, b) => b.views - a.views || b.engagedReads - a.engagedReads);

    const top = items.slice(0, Math.max(1, limit));

    // Resolve titles + source names from the article catalog (best-effort).
    for (const item of top) {
      try {
        const article = await db.articles.getBySlug(item.slug);
        if (article) {
          item.title = article.title;
          item.sourceName = article.sourceName;
        }
      } catch {
        // leave title undefined; MostRead falls back to the slug label
      }
    }

    return top;
  } catch {
    return [];
  }
}

/** Per-article stats for the last 7 days (humans only). */
export async function getArticleStats(slug: string): Promise<ArticleStats> {
  const zero = { views7d: 0, engaged7d: 0, sourceClicks7d: 0 };
  try {
    const cfg = restConfig();
    if (!cfg) return zero;
    const rows = await fetchEvents(sinceISO(7), "event_type", `&article_slug=eq.${encodeURIComponent(slug)}`);
    const stats = { ...zero };
    for (const r of rows) {
      if (r.event_type === "page_view") stats.views7d += 1;
      else if (r.event_type === "engaged_read") stats.engaged7d += 1;
      else if (r.event_type === "source_click") stats.sourceClicks7d += 1;
    }
    return stats;
  } catch {
    return zero;
  }
}

export type ArticleRollup = {
  slug: string;
  title?: string;
  sourceName?: string;
  views: number;
  engagedReads: number;
  sourceClicks: number;
};

/**
 * Per-article rollup (raw counts, not unique) for a window of `days`.
 * Used by the internal dashboard table.
 */
export async function getArticleRollup(days: number): Promise<ArticleRollup[]> {
  try {
    const cfg = restConfig();
    if (!cfg) return [];
    const rows = await fetchEvents(sinceISO(days), "article_slug,event_type");
    const map = new Map<string, ArticleRollup>();
    for (const r of rows) {
      if (!r.article_slug) continue;
      let bucket = map.get(r.article_slug);
      if (!bucket) {
        bucket = { slug: r.article_slug, views: 0, engagedReads: 0, sourceClicks: 0 };
        map.set(r.article_slug, bucket);
      }
      if (r.event_type === "page_view") bucket.views += 1;
      else if (r.event_type === "engaged_read") bucket.engagedReads += 1;
      else if (r.event_type === "source_click") bucket.sourceClicks += 1;
    }
    const items = Array.from(map.values());
    items.sort((a, b) => b.views - a.views || b.engagedReads - a.engagedReads);

    const top = items.slice(0, 100);
    for (const item of top) {
      try {
        const article = await db.articles.getBySlug(item.slug);
        if (article) {
          item.title = article.title;
          item.sourceName = article.sourceName;
        }
      } catch {
        // leave undefined; dashboard falls back to the slug
      }
    }
    return top;
  } catch {
    return [];
  }
}

/** Totals per event type for the last `days` days (humans only). */
export async function getEventTotals(days: number): Promise<EventTotals> {
  const zero: EventTotals = {
    page_view: 0,
    engaged_read: 0,
    source_click: 0,
    signup: 0,
    share: 0,
    offer_click: 0,
  };
  try {
    const cfg = restConfig();
    if (!cfg) return zero;
    const rows = await fetchEvents(sinceISO(days), "event_type");
    const totals = { ...zero };
    for (const r of rows) {
      if (r.event_type in totals) totals[r.event_type as keyof EventTotals] += 1;
    }
    return totals;
  } catch {
    return zero;
  }
}
