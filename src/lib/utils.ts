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
