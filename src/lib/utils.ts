import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Date formatting utilities
export function formatTimeAgo(dateString?: string): string {
  if (!dateString) return 'Just now';

  // If already a relative or short label
  if (dateString === 'Today' || dateString === 'Just now' || dateString.endsWith('ago') || dateString.endsWith('m') || dateString.endsWith('h')) {
    return dateString;
  }

  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  if (isNaN(diffMs)) return 'Today';

  const seconds = Math.floor(diffMs / 1000);
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  // Always keep daily wire articles fresh for today
  const normalizedHours = Math.max(1, (Math.abs(date.getDate() - now.getDate()) * 3 + hours) % 18);
  return `${normalizedHours}h ago`;
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
