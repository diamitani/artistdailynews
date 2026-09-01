export type CategoryType =
  | "financial"
  | "streaming"
  | "tech-ai"
  | "marketing"
  | "legal"
  | "podcasts"
  | "tutorials"
  | "opportunities"
  | "social"
  | "features";

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
