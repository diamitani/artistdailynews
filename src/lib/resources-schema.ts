import {
  PlatformResource,
  DailyArticleIngestRecord,
  DailyVideoIngestRecord,
  PlatformPillar,
  PlatformTier,
  CategoryType,
  VideoQueryCategory,
} from "./types";

/**
 * Escapes a string for CSV compatibility
 */
export function escapeCsvField(val: unknown): string {
  if (val === null || val === undefined) return '""';
  const str = Array.isArray(val) ? val.join(" | ") : String(val);
  const escaped = str.replace(/"/g, '""');
  return `"${escaped}"`;
}

/**
 * Converts Top 100 Platforms to CSV format
 */
export function platformsToCsv(platforms: PlatformResource[]): string {
  const headers = [
    "Platform ID",
    "Platform Name",
    "Slug",
    "Pillar",
    "Category",
    "Tier",
    "Website URL",
    "RSS Feed URL",
    "YouTube Channel URL",
    "Content Type",
    "Daily Post Frequency",
    "Scrape Status",
    "Priority Rank",
    "Description",
    "Editorial Notes",
  ];

  const rows = platforms.map((p) => [
    escapeCsvField(p.id),
    escapeCsvField(p.name),
    escapeCsvField(p.slug),
    escapeCsvField(p.pillar),
    escapeCsvField(p.category),
    escapeCsvField(p.tier),
    escapeCsvField(p.websiteUrl),
    escapeCsvField(p.rssFeedUrl || ""),
    escapeCsvField(p.youtubeChannelUrl || ""),
    escapeCsvField(p.contentType),
    escapeCsvField(p.dailyPostFrequency),
    escapeCsvField(p.scrapeStatus),
    escapeCsvField(p.priorityRank),
    escapeCsvField(p.description),
    escapeCsvField(p.editorialNotes || ""),
  ]);

  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
}

/**
 * Converts Daily Article Ingestion Records to CSV format
 */
export function dailyArticlesToCsv(records: DailyArticleIngestRecord[]): string {
  const headers = [
    "Article ID",
    "Date Ingested",
    "Platform ID",
    "Platform Name",
    "Article Title",
    "Original URL",
    "Author",
    "Summary / Dek",
    "Takeaway Bullet 1",
    "Takeaway Bullet 2",
    "Takeaway Bullet 3",
    "Category",
    "Tags",
    "Read Time (Mins)",
    "Status",
  ];

  const rows = records.map((r) => [
    escapeCsvField(r.articleId),
    escapeCsvField(r.dateIngested),
    escapeCsvField(r.platformId),
    escapeCsvField(r.platformName),
    escapeCsvField(r.articleTitle),
    escapeCsvField(r.originalUrl),
    escapeCsvField(r.author),
    escapeCsvField(r.summaryDek),
    escapeCsvField(r.takeawayBullet1),
    escapeCsvField(r.takeawayBullet2),
    escapeCsvField(r.takeawayBullet3),
    escapeCsvField(r.category),
    escapeCsvField(r.tags.join(" | ")),
    escapeCsvField(r.readTimeMinutes),
    escapeCsvField(r.status),
  ]);

  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
}

/**
 * Converts Daily YouTube Video Records to CSV format
 */
export function dailyVideosToCsv(records: DailyVideoIngestRecord[]): string {
  const headers = [
    "Video ID",
    "YouTube Video ID",
    "Video Title",
    "Channel Name",
    "Channel Handle",
    "Channel URL",
    "Search Query Category",
    "Duration",
    "Thumbnail URL",
    "Embed URL",
    "Video Watch URL",
    "Published Date",
    "Key Takeaway",
    "Views Estimate",
    "Status",
  ];

  const rows = records.map((r) => [
    escapeCsvField(r.videoId),
    escapeCsvField(r.youtubeVideoId),
    escapeCsvField(r.title),
    escapeCsvField(r.channelName),
    escapeCsvField(r.channelHandle),
    escapeCsvField(r.channelUrl),
    escapeCsvField(r.searchQueryCategory),
    escapeCsvField(r.duration),
    escapeCsvField(r.thumbnailUrl),
    escapeCsvField(r.embedUrl),
    escapeCsvField(r.videoUrl),
    escapeCsvField(r.publishedDate),
    escapeCsvField(r.keyTakeaway),
    escapeCsvField(r.viewsEstimate),
    escapeCsvField(r.status),
  ]);

  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
}
