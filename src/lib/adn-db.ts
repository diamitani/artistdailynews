import { createClient } from "@supabase/supabase-js";
import REAL_ITEMS_JSON from "../data/adn_items.json";

// Uses the public anon key for frontend/SSR reads, or service role for admin tasks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

export const adnDb = createClient(supabaseUrl, supabaseKey);

const SEED_ITEMS: any[] = Array.isArray(REAL_ITEMS_JSON) ? REAL_ITEMS_JSON : [];

export async function getLatestIssue() {
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

  // Dynamic Issue generated from top real items
  const leadItem = SEED_ITEMS[0] || {
    id: "lead-01",
    title: "Music Industry Royalties & Rights Overhaul",
    dek: "Independent artists and catalogue owners navigate shifting streaming payout policies and mechanical licensing standards.",
    why_it_matters: "Actionable steps to audit ISRC codes and reclaim black-box publishing earnings across all DSPs.",
    url: "https://musicbusinessworldwide.com",
    source_name: "Music Business Worldwide",
    action: "Check ASCAP/BMI split sheets and audit distributor royalty payout thresholds.",
  };

  const cultureRail = SEED_ITEMS.filter((i) => i.pillar === "culture").slice(0, 4).map((i) => ({
    title: i.title,
    platform: i.platform || i.source_name || "Web",
    time: "Today",
    url: i.url,
  }));

  const businessRail = SEED_ITEMS.filter((i) => i.pillar === "business").slice(0, 4).map((i) => ({
    title: i.title,
    platform: i.platform || i.source_name || "Web",
    time: "Today",
    url: i.url,
  }));

  const ideasRail = SEED_ITEMS.filter((i) => i.pillar === "ideas").slice(0, 4).map((i) => ({
    title: i.title,
    platform: i.platform || i.source_name || "Web",
    time: "Today",
    url: i.url,
  }));

  return {
    id: "adn-issue-live",
    issue_date: new Date().toISOString(),
    kicker: leadItem.pillar ? leadItem.pillar.toUpperCase() : "BUSINESS",
    lead_item: leadItem,
    rails: {
      culture: cultureRail,
      business: businessRail,
      ideas: ideasRail,
    },
  };
}

export async function getArticles(limit = 60, filterPillar?: string, filterPlatform?: string) {
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
        return data;
      }
    } catch (err) {
      console.warn("[ADN DB] Supabase getArticles error fallback:", err);
    }
  }

  // Fallback to real cached seed items
  let filtered = [...SEED_ITEMS];

  if (filterPillar && filterPillar !== 'All') {
    filtered = filtered.filter((i) => i.pillar?.toLowerCase() === filterPillar.toLowerCase());
  }

  if (filterPlatform && filterPlatform !== 'All') {
    filtered = filtered.filter((i) => i.platform?.toLowerCase() === filterPlatform.toLowerCase());
  }

  return filtered.slice(0, limit);
}

export async function getNewsroomForUser(userId: string) {
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
  const topItems = SEED_ITEMS.slice(0, 12);
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
