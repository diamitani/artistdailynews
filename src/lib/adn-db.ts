import { createClient } from "@supabase/supabase-js";
import REAL_ITEMS_JSON from "../data/adn_items.json";
import { INITIAL_FEEDS } from "./feeds-config";
import { fetchAndParseFeed } from "./rss-parser";
import { Article } from "./types";

// Uses the public anon key for frontend/SSR reads, or service role for admin tasks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

export const adnDb = createClient(supabaseUrl, supabaseKey);

const RAW_SEED_ITEMS: any[] = Array.isArray(REAL_ITEMS_JSON) ? REAL_ITEMS_JSON : [];

// ── Quarantine (Phase 1 trust gate) ─────────────────────────────
// Same policy as lib/db.ts: quarantined IDs never reach public queries.
import QUARANTINE_JSON from "../data/quarantine.json";
const QUARANTINED_IDS: Set<string> = new Set(
  Array.isArray((QUARANTINE_JSON as any)?.items)
    ? (QUARANTINE_JSON as any).items.map((q: any) => q.id)
    : []
);

function excludeQuarantined(items: any[]): any[] {
  return items.filter((i) => !QUARANTINED_IDS.has(i?.id));
}

// NOTE (Phase 1): the old helper that rewrote every item's timestamp to
// "today" was deliberately removed. Timestamps are now rendered exactly as
// stored; see lib/utils.ts formatTimeAgo.

// In-memory cache for live parsed RSS feeds (refreshed every 5 mins)
let LIVE_RSS_CACHE: {
  timestamp: number;
  items: any[];
} | null = null;

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Fetches the latest live RSS feeds from tier 1 platforms and parses them into ADN item schema.
 */
async function fetchLatestLivePlatformFeeds(): Promise<any[]> {
  if (LIVE_RSS_CACHE && Date.now() - LIVE_RSS_CACHE.timestamp < CACHE_TTL_MS && LIVE_RSS_CACHE.items.length > 0) {
    return LIVE_RSS_CACHE.items;
  }

  try {
    const priorityFeeds = INITIAL_FEEDS.filter(
      (f) => f.enabled && (f.priority || f.tier === "tier1" || f.tier === "tier2")
    ).slice(0, 10);

    const settled = await Promise.allSettled(
      priorityFeeds.map((feed) => fetchAndParseFeed(feed))
    );

    const liveItems: any[] = [];

    settled.forEach((res, idx) => {
      if (res.status === "fulfilled" && Array.isArray(res.value)) {
        const feed = priorityFeeds[idx];
        res.value.forEach((art: Article) => {
          liveItems.push({
            id: art.id,
            title: art.title,
            url: art.originalUrl || art.sourceUrl,
            source_name: art.sourceName,
            platform: feed.name,
            pillar: art.category === "financial" || art.category === "legal" ? "business" : art.category === "streaming" || art.category === "marketing" ? "culture" : "social",
            category: art.category,
            dek: art.summary,
            why_it_matters: art.takeaway || art.summary,
            bullets: art.bullets,
            takeaway: art.takeaway,
            freshness: art.publishedAt || "",
            published_at: art.publishedAt || "",
            image_url: art.imageUrl,
            read_time_minutes: art.readTimeMinutes || 3,
            is_breaking: art.isBreaking || false,
            tags: art.tags || [feed.name],
          });
        });
      }
    });

    if (liveItems.length > 0) {
      LIVE_RSS_CACHE = {
        timestamp: Date.now(),
        items: liveItems,
      };
      return liveItems;
    }
  } catch (err) {
    console.warn("[ADN DB] Live RSS aggregation fallback:", err);
  }

  return LIVE_RSS_CACHE?.items || [];
}

export async function getLatestIssue() {
  const seedItems = excludeQuarantined(RAW_SEED_ITEMS);

  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    try {
      const { data, error } = await adnDb
        .from('adn_issues')
        .select(`
          *,
          lead_item:lead_item_id (*)
        `)
        .order('issue_date', { ascending: false })
        .limit(1)
        .single();

      if (data && !error) {
        return data;
      }
    } catch (err) {
      console.warn("[ADN DB] Supabase getLatestIssue error fallback:", err);
    }
  }

  // Dynamic Issue generated from top real items.
  // TRUST RULE: the lead item is the newest item with a valid, non-future date —
  // never a pinned static entry that goes stale.
  const datedSeeds = seedItems
    .map((i: any) => ({ item: i, ms: new Date(i.freshness || i.published_at || "").getTime() }))
    .filter((c) => !isNaN(c.ms) && c.ms <= Date.now() + 60 * 60 * 1000)
    .sort((a, b) => b.ms - a.ms);
  const leadItem = (datedSeeds[0]?.item) || seedItems[0] || {
    id: "lead-01",
    title: "Music Industry Royalties & Rights Overhaul",
    dek: "Independent artists and catalogue owners navigate shifting streaming payout policies and mechanical licensing standards.",
    why_it_matters: "Actionable steps to audit ISRC codes and reclaim black-box publishing earnings across all DSPs.",
    url: "https://musicbusinessworldwide.com",
    source_name: "Music Business Worldwide",
    action: "Check ASCAP/BMI split sheets and audit distributor royalty payout thresholds.",
  };

  // TRUST RULE: rail timestamps use the stored date as-is — never "Today".
  const toRail = (i: any) => ({
    title: i.title,
    platform: i.platform || i.source_name || "Web",
    time: i.freshness || i.published_at || "",
    url: i.url,
  });

  const cultureRail = seedItems.filter((i) => i.pillar === "culture").slice(0, 4).map(toRail);
  const businessRail = seedItems.filter((i) => i.pillar === "business").slice(0, 4).map(toRail);
  const socialRail = seedItems.filter((i) => i.pillar === "social").slice(0, 4).map(toRail);

  return {
    id: "adn-issue-live",
    issue_date: new Date().toISOString(),
    kicker: leadItem.pillar ? leadItem.pillar.toUpperCase() : "BUSINESS",
    lead_item: leadItem,
    rails: {
      culture: cultureRail,
      business: businessRail,
      social: socialRail,
    },
  };
}

export async function getArticles(limit = 150, filterPillar?: string, filterPlatform?: string) {
  // Fetch live RSS items concurrently (cached for 5m)
  let liveItems: any[] = [];
  try {
    liveItems = await fetchLatestLivePlatformFeeds();
  } catch (e) {
    // silent fallback
  }

  let baseList: any[] = [];

  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    try {
      let query = adnDb
        .from('adn_items')
        .select('*')
        .order('freshness', { ascending: false })
        .limit(limit);
        
      if (filterPillar && filterPillar !== 'All') {
        query = query.eq('pillar', filterPillar.toLowerCase());
      }
      if (filterPlatform && filterPlatform !== 'All') {
        query = query.eq('platform', filterPlatform.toLowerCase());
      }

      const { data, error } = await query;
      
      if (!error && Array.isArray(data) && data.length > 0) {
        baseList = data;
      }
    } catch (err) {
      console.warn("[ADN DB] Supabase getArticles error fallback:", err);
    }
  }

  if (baseList.length === 0) {
    baseList = [...RAW_SEED_ITEMS];
  }

  // Deduplicate live items with base items by URL or title
  const seenUrls = new Set<string>();
  const combined: any[] = [];

  // Add live items first
  for (const item of liveItems) {
    const key = item.url || item.title;
    if (key && !seenUrls.has(key)) {
      seenUrls.add(key);
      combined.push(item);
    }
  }

  // Add base items
  for (const item of baseList) {
    const key = item.url || item.title;
    if (key && !seenUrls.has(key)) {
      seenUrls.add(key);
      combined.push(item);
    }
  }

  // Apply Today's dynamic freshness normalizer
  let normalized = excludeQuarantined(combined);

  if (filterPillar && filterPillar !== 'All') {
    normalized = normalized.filter((i) => i.pillar?.toLowerCase() === filterPillar.toLowerCase());
  }

  if (filterPlatform && filterPlatform !== 'All') {
    normalized = normalized.filter((i) => i.platform?.toLowerCase() === filterPlatform.toLowerCase());
  }

  return normalized.slice(0, limit);
}

export async function getNewsroomForUser(userId: string) {
  const seedItems = excludeQuarantined(RAW_SEED_ITEMS);

  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    try {
      const { data, error } = await adnDb
        .from('adn_newsrooms')
        .select('*')
        .eq('user_id', userId)
        .order('created_for_date', { ascending: false })
        .limit(1)
        .single();

      if (data && !error) {
        return data;
      }
    } catch (err) {
      console.warn("[ADN DB] Supabase getNewsroomForUser fallback:", err);
    }
  }

  // Fallback personal newsroom package
  const topItems = seedItems.slice(0, 12);
  return {
    id: `newsroom-${userId}`,
    user_id: userId,
    created_for_date: new Date().toISOString(),
    headline: "Your Daily Personalized Artist Intelligence",
    summary: "Curated dispatches spanning catalog monetization, DSP release algorithms, and touring opportunities.",
    top_items: topItems,
    genre_focus: "Independent / All Genres",
    city_focus: "Global / Digital",
  };
}
