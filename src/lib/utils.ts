import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Date formatting utilities.
//
// TRUST RULE: timestamps are never fabricated. Relative labels are computed
// at render time from the real stored date. Anything older than 7 days
// renders as an absolute date. We never "normalize" old stories to look fresh.
/** Honest relative time, computed at render time from a real timestamp. */
export function formatTimeAgo(dateString?: string): string {
  if (!dateString) return "";

  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  if (isNaN(diffMs)) return "";

  // Future-dated (clock skew / bad data): show the absolute date, never "in X".
  if (diffMs < 0) return formatDate(dateString);

  const seconds = Math.floor(diffMs / 1000);
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;

  return formatDate(dateString);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// ── Featured-story selection (currency without fabrication) ──
// The hero slot must never pin to a stale static item. An editorial lead item
// keeps the slot only while it is genuinely current; otherwise we fall back to
// the newest item carrying a real, valid, non-future date.

/** Extract a candidate's story date (ms since epoch) from known timestamp fields. NaN when absent/invalid. */
function storyDateMs(item: any): number {
  const raw = item?.freshness || item?.published_at || item?.publishedAt || item?.sourcePublishedAt || "";
  if (!raw) return NaN;
  return new Date(raw).getTime();
}

/** True when the item's date is real, not materially in the future, and within maxAgeHours. */
export function isCurrentStory(item: any, maxAgeHours = 72): boolean {
  const ms = storyDateMs(item);
  if (isNaN(ms)) return false;
  const ageMs = Date.now() - ms;
  // Tolerate up to 1h of future skew (publisher clock differences); reject the rest.
  if (ageMs < -60 * 60 * 1000) return false;
  return ageMs <= maxAgeHours * 60 * 60 * 1000;
}

/** Newest item with a valid, non-future date. Never mutates the array. */
export function newestValidStory<T>(articles: T[]): T | undefined {
  let best: T | undefined;
  let bestMs = -Infinity;
  for (const a of articles) {
    const ms = storyDateMs(a);
    if (isNaN(ms)) continue;
    if (ms - Date.now() > 60 * 60 * 1000) continue; // reject future-dated junk
    if (ms > bestMs) { bestMs = ms; best = a; }
  }
  return best;
}

/**
 * Pick the hero story: keep an editorial lead item only while it is current;
 * otherwise fall back to the newest item with a valid, non-future date.
 */
export function pickFeaturedStory<T>(leadItem: T | null | undefined, articles: T[]): T | undefined {
  if (leadItem && isCurrentStory(leadItem)) return leadItem;
  return newestValidStory(articles) ?? (articles.length ? articles[0] : leadItem ?? undefined);
}

// Slug generation
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Alias for generateSlug (used by rss-parser)
export function slugify(text: string): string {
  return generateSlug(text);
}
