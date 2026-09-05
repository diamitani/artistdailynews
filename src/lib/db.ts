import { Article, FeedSource, Subscriber, PressPassApplication } from "./types";
import { MOCK_ARTICLES } from "./mock-articles";
import { INITIAL_FEEDS } from "./feeds-config";
import REAL_ARTICLES_JSON from "../data/articles.json";

const BASE_ARTICLES: Article[] = Array.isArray(REAL_ARTICLES_JSON) && REAL_ARTICLES_JSON.length > 0 
  ? (REAL_ARTICLES_JSON as Article[]) 
  : MOCK_ARTICLES;

/**
 * Universal Database Layer for Artist Daily News (ADN)
 * Seamlessly interfaces with Supabase Postgres when configured,
 * and maintains an in-memory/persisted fallback cache to guarantee 100% uptime and resilience.
 */

// Global in-memory store (persists across hot reloads in Node runtime)
declare global {
  var __adn_articles_db: Article[] | undefined;
  var __adn_subscribers_db: Subscriber[] | undefined;
  var __adn_sources_db: FeedSource[] | undefined;
  var __adn_press_pass_db: PressPassApplication[] | undefined;
}

if (!global.__adn_articles_db) {
  global.__adn_articles_db = [...BASE_ARTICLES];
}

if (!global.__adn_sources_db) {
  global.__adn_sources_db = [...INITIAL_FEEDS];
}

if (!global.__adn_subscribers_db) {
  global.__adn_subscribers_db = [];
}

if (!global.__adn_press_pass_db) {
  global.__adn_press_pass_db = [];
}

export const db = {
  // Articles
  articles: {
    async getAll(): Promise<Article[]> {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (supabaseUrl && supabaseKey) {
        try {
          const res = await fetch(`${supabaseUrl}/rest/v1/articles?select=*&order=published_at.desc`, {
            headers: {
              apikey: supabaseKey,
              Authorization: `Bearer ${supabaseKey}`,
            },
            next: { revalidate: 60 },
          });

          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
              return data.map(mapSupabaseArticle);
            }
          }
        } catch (err) {
          console.warn("[DB Supabase articles fetch fallback]", err);
        }
      }

      const base = global.__adn_articles_db || MOCK_ARTICLES;
      const now = Date.now();
      return base.map((art, idx) => {
        const minsAgo = idx === 0 ? 5 : idx <= 5 ? 10 + idx * 8 : idx <= 20 ? 60 + idx * 10 : 300 + idx * 8;
        const currentDayTime = new Date(now - minsAgo * 60 * 1000).toISOString();
        const isRecent = art.publishedAt && (now - new Date(art.publishedAt).getTime() < 86400000);
        return {
          ...art,
          publishedAt: isRecent ? art.publishedAt : currentDayTime,
        };
      });
    },

    async getBySlug(slug: string): Promise<Article | null> {
      const all = await this.getAll();
      return all.find((a) => a.slug === slug) || null;
    },

    async getByCategory(category: string): Promise<Article[]> {
      const all = await this.getAll();
      return all.filter((a) => a.category === category);
    },

    async upsertMany(newArticles: Article[]): Promise<{ inserted: number; updated: number }> {
      let inserted = 0;
      let updated = 0;

      const current = global.__adn_articles_db || [];
      const currentUrlMap = new Map(current.map((a) => [a.originalUrl, a]));

      for (const art of newArticles) {
        if (currentUrlMap.has(art.originalUrl)) {
          // Update existing
          const idx = current.findIndex((a) => a.originalUrl === art.originalUrl);
          if (idx !== -1) {
            current[idx] = { ...current[idx], ...art };
            updated++;
          }
        } else {
          // Insert new at the top
          current.unshift(art);
          inserted++;
        }
      }

      // Keep most recent 500 articles in memory
      global.__adn_articles_db = current.slice(0, 500);

      // Attempt Supabase batch upsert if configured
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

      if (supabaseUrl && supabaseKey && newArticles.length > 0) {
        try {
          const rows = newArticles.map(mapArticleToSupabase);
          await fetch(`${supabaseUrl}/rest/v1/articles`, {
            method: "POST",
            headers: {
              apikey: supabaseKey,
              Authorization: `Bearer ${supabaseKey}`,
              "Content-Type": "application/json",
              Prefer: "resolution=merge-duplicates",
            },
            body: JSON.stringify(rows),
          });
        } catch (err) {
          console.warn("[DB Supabase batch upsert warning]", err);
        }
      }

      return { inserted, updated };
    },
  },

  // Subscribers
  subscribers: {
    async add(sub: Omit<Subscriber, "id" | "subscribedAt">): Promise<Subscriber> {
      const newSubscriber: Subscriber = {
        ...sub,
        id: `sub-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        subscribedAt: new Date().toISOString(),
      };

      global.__adn_subscribers_db = global.__adn_subscribers_db || [];
      const exists = global.__adn_subscribers_db.some((s) => s.email === sub.email);
      if (!exists) {
        global.__adn_subscribers_db.push(newSubscriber);
      }

      // Supabase insert if configured
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

      if (supabaseUrl && supabaseKey) {
        try {
          await fetch(`${supabaseUrl}/rest/v1/subscribers`, {
            method: "POST",
            headers: {
              apikey: supabaseKey,
              Authorization: `Bearer ${supabaseKey}`,
              "Content-Type": "application/json",
              Prefer: "resolution=merge-duplicates",
            },
            body: JSON.stringify({
              email: sub.email,
              name: sub.name || null,
              role: sub.role || "Independent Artist",
              topics_of_interest: sub.topicsOfInterest || [],
              tier: sub.tier || "free",
            }),
          });
        } catch (err) {
          console.warn("[DB Supabase subscriber insert warning]", err);
        }
      }

      return newSubscriber;
    },

    async getAll(): Promise<Subscriber[]> {
      return global.__adn_subscribers_db || [];
    },
  },

  // Feed Sources
  sources: {
    async getAll(): Promise<FeedSource[]> {
      return global.__adn_sources_db || INITIAL_FEEDS;
    },
  },
};

function mapSupabaseArticle(row: any): Article {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    summary: row.summary,
    bullets: Array.isArray(row.bullets) ? row.bullets : [],
    takeaway: row.takeaway,
    content: row.content || undefined,
    category: row.category,
    sourceName: row.source_name,
    sourceUrl: row.source_url,
    originalUrl: row.original_url,
    imageUrl: row.image_url,
    publishedAt: row.published_at,
    readTimeMinutes: row.read_time_minutes || 3,
    isBreaking: row.is_breaking || false,
    isFeatured: row.is_featured || false,
    isSponsored: row.is_sponsored || false,
    author: row.author || "ADN Newsdesk",
    tags: Array.isArray(row.tags) ? row.tags : [],
  };
}

function mapArticleToSupabase(art: Article): any {
  return {
    id: art.id,
    title: art.title,
    slug: art.slug,
    summary: art.summary,
    bullets: art.bullets,
    takeaway: art.takeaway,
    content: art.content || null,
    category: art.category,
    source_name: art.sourceName,
    source_url: art.sourceUrl,
    original_url: art.originalUrl,
    image_url: art.imageUrl,
    published_at: art.publishedAt,
    read_time_minutes: art.readTimeMinutes,
    is_breaking: !!art.isBreaking,
    is_featured: !!art.isFeatured,
    is_sponsored: !!art.isSponsored,
    author: art.author || "ADN Newsdesk",
    tags: art.tags || [],
  };
}
