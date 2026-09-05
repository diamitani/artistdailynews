export type CategoryType =
  | "financial"
  | "streaming"
  | "tech-ai"
  | "marketing"
  | "legal"
  | "podcasts"
  | "tutorials"
  | "opportunities"
  | "social";

export interface CategoryInfo {
  id: CategoryType;
  name: string;
  slug: string;
  icon: string;
  color: string;
  description: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string;
  bullets: string[];
  takeaway: string;
  content?: string;
  category: CategoryType;
  sourceName: string;
  sourceUrl: string;
  originalUrl: string;
  imageUrl: string;
  publishedAt: string;
  readTimeMinutes: number;
  isBreaking?: boolean;
  isFeatured?: boolean;
  isSponsored?: boolean;
  sponsorName?: string;
  sponsorCtaUrl?: string;
  author?: string;
  tags: string[];
}

export interface FeedSource {
  id: string;
  name: string;
  url: string;
  category: CategoryType;
  website: string;
  tier: "tier1" | "tier2" | "tier3" | "niche";
  enabled: boolean;
  lastFetchedAt?: string;
  status: "healthy" | "failing" | "pending";
  priority?: number;
}

export interface PodcastEpisode {
  id: string;
  title: string;
  showName: string;
  host: string;
  duration: string;
  publishedAt: string;
  summary: string;
  audioUrl?: string;
  spotifyUrl: string;
  appleUrl: string;
  imageUrl: string;
  tags: string[];
}

export interface VideoItem {
  id: string;
  title: string;
  channelName: string;
  channelUrl?: string;
  videoUrl: string;
  embedUrl: string;
  thumbnailUrl: string;
  duration: string;
  publishedAt: string;
  category: "essay" | "masterclass" | "interview" | "documentary";
  viewsFormatted?: string;
  description: string;
  tags: string[];
}

export interface ChannelResource {
  id: string;
  name: string;
  handle: string;
  category: "Business & A&R" | "Production & Mixing" | "Marketing & Growth" | "Culture & Documentaries" | "Gear & Tech";
  subscribers?: string;
  description: string;
  youtubeUrl: string;
  rssFeedUrl?: string;
  websiteUrl?: string;
  featuredTopic: string;
}

export interface PressPassApplication {
  id: string;
  applicantName: string;
  artistOrOutletName: string;
  email: string;
  phone: string;
  role: "photographer" | "journalist" | "artist" | "videographer" | "manager";
  targetEvent: string;
  eventDate: string;
  portfolioUrl: string;
  socialLink: string;
  coveragePitch: string;
  status: "pending" | "approved" | "under_review" | "rejected";
  createdAt: string;
}

export interface SponsorshipPackage {
  id: string;
  name: string;
  priceFormatted: string;
  priceCents: number;
  period: "one-time" | "weekly" | "monthly";
  description: string;
  features: string[];
  highlight?: boolean;
  stripePriceId?: string;
}

export interface Subscriber {
  id: string;
  email: string;
  name?: string;
  role: string;
  topicsOfInterest: CategoryType[];
  tier: "free" | "pro_insider" | "enterprise";
  subscribedAt: string;
}

// ── Top 100 Platforms & Resource Database Schema ──
export type PlatformPillar =
  | "Trade & Business Journalism"
  | "Indie Strategy & D2C"
  | "Streaming, Metadata & Rights"
  | "Audio Engineering & Production"
  | "Culture, Editorial & Discovery"
  | "Podcasts & Video Channels";

export type PlatformTier = "tier1" | "tier2" | "tier3";
export type PlatformContentType = "Articles" | "Podcasts" | "Videos" | "Multi-Format" | "Research & Data";

export interface PlatformResource {
  id: string;
  name: string;
  slug: string;
  pillar: PlatformPillar;
  category: CategoryType;
  tier: PlatformTier;
  websiteUrl: string;
  rssFeedUrl?: string;
  youtubeChannelUrl?: string;
  youtubeChannelId?: string;
  contentType: PlatformContentType;
  dailyPostFrequency: number;
  scrapeStatus: "active" | "manual" | "partner" | "paused";
  priorityRank: number;
  description: string;
  editorialNotes?: string;
}

// ── Daily Article Ingestion Record (Upload Sheet) ──
export interface DailyArticleIngestRecord {
  articleId: string;
  dateIngested: string; // YYYY-MM-DD
  platformId: string;
  platformName: string;
  articleTitle: string;
  originalUrl: string;
  author: string;
  summaryDek: string;
  takeawayBullet1: string;
  takeawayBullet2: string;
  takeawayBullet3: string;
  category: CategoryType;
  tags: string[];
  readTimeMinutes: number;
  status: "published" | "staged" | "draft" | "archived";
}

// ── Daily YouTube Video Ingestion Record (Upload Sheet) ──
export type VideoQueryCategory =
  | "music_business_news"
  | "music_industry_news"
  | "music_podcasts"
  | "music_production_masterclasses"
  | "artist_interviews"
  | "streaming_analytics";

export interface DailyVideoIngestRecord {
  videoId: string;
  youtubeVideoId: string; // 11-char verified ID
  title: string;
  channelName: string;
  channelHandle: string;
  channelUrl: string;
  searchQueryCategory: VideoQueryCategory;
  duration: string;
  thumbnailUrl: string;
  embedUrl: string;
  videoUrl: string;
  publishedDate: string; // YYYY-MM-DD or ISO
  keyTakeaway: string;
  viewsEstimate: string;
  status: "published" | "staged" | "draft";
}
