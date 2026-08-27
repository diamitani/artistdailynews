import { NextResponse } from "next/server";
import { INITIAL_FEEDS } from "@/lib/feeds-config";
import { fetchAndParseFeed } from "@/lib/rss-parser";
import { summarizeWithAINewsdesk } from "@/lib/ai-newsdesk";
import { Article } from "@/lib/types";

export async function POST(req: Request) {
  try {
    const activeFeeds = INITIAL_FEEDS.filter((f) => f.enabled);
    const allParsedArticles: Article[] = [];

    // Fetch top 4 feeds concurrently to ensure fast response time
    const feedPromises = activeFeeds.slice(0, 4).map((feed) => fetchAndParseFeed(feed));
    const results = await Promise.allSettled(feedPromises);

    for (const res of results) {
      if (res.status === "fulfilled" && Array.isArray(res.value)) {
        allParsedArticles.push(...res.value);
      }
    }

    return NextResponse.json({
      success: true,
      ingestedCount: allParsedArticles.length,
      feedsAttempted: activeFeeds.length,
      sampleArticles: allParsedArticles.slice(0, 3),
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("[API News Sync Error]", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to synchronize RSS feeds.",
      },
      { status: 500 }
    );
  }
}
