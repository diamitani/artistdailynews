/**
 * Artist Daily News - TypeScript Types
 * Shared types for the daily news feature
 */

export type Pillar = 'business' | 'culture' | 'ideas';

export type NewsletterFrequency = 'daily' | 'weekly' | 'none';

export interface AdnItem {
  id: string;
  title: string;
  dek?: string;
  url: string;
  source_name: string;
  pillar: Pillar;
  freshness: string; // ISO timestamp
  snippet?: string;
  created_at: string;
  updated_at: string;
}

export interface AdnSource {
  id: string;
  name: string;
  feed_url: string;
  pillar: Pillar;
  is_active: boolean;
  last_fetched_at?: string;
  created_at: string;
  updated_at: string;
}

export interface AdnUserBookmark {
  id: string;
  user_id: string;
  item_id: string;
  notes?: string;
  saved_at: string;
}

export interface AdnUserReadingHistory {
  id: string;
  user_id: string;
  item_id: string;
  read_at: string;
  read_percentage: number;
  time_spent_seconds: number;
}

export interface AdnNewsletterSubscription {
  id: string;
  user_id: string;
  is_subscribed: boolean;
  frequency: NewsletterFrequency;
  preferred_time: string; // HH:MM:SS
  pillars: Pillar[];
  subscribed_at: string;
  unsubscribed_at?: string;
  last_sent_at?: string;
  created_at: string;
  updated_at: string;
}

// Joined types for queries
export interface AdnItemWithBookmark extends AdnItem {
  is_bookmarked: boolean;
  bookmark_notes?: string;
}

export interface AdnItemWithReadingHistory extends AdnItem {
  read_percentage: number;
  time_spent_seconds: number;
  read_at?: string;
}
