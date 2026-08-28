import { NextResponse } from "next/server";
import { INITIAL_FEEDS } from "@/lib/feeds-config";
import { fetchAndParseFeed } from "@/lib/rss-parser";
import { db } from "@/lib/db";
import { Article } from "@/lib/types";

export const maxDuration = 60; // Set Next.js max execution duration
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  return handleRssIngest(req);
}

export async function POST(req: Request) {
  return handleRssIngest(req);
}

async function handleRssIngest(req: Request) {
  const startTime = Date.now();
  const { searchParams } = new URL(req.url);
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  // Authorization verification (if CRON_SECRET is configured)
  if (cronSecret) {
    const bearerToken = authHeader?.replace("Bearer ", "");
    const querySecret = searchParams.get("secret");
    if (bearerToken !== cronSecret && querySecret !== cronSecret) {
      return NextResponse.json({ error: "Unauthorized cron execution." }, { status: 401 });
    }
  }

  try {
    const activeFeeds = INITIAL_FEEDS.filter((f) => f.enabled);
    const allIngestedArticles: Article[] = [];
    const feedResults: { name: string; category: string; count: number; status: string }[] = [];

    // Process in batches of 4 feeds to manage memory & network sockets
    const batchSize = 4;
    for (let i = 0; i < activeFeeds.length; i += batchSize) {
      const batch = activeFeeds.slice(i, i + batchSize);
      const settled = await Promise.allSettled(batch.map((feed) => fetchAndParseFeed(feed)));

      settled.forEach((result, idx) => {
        const feed = batch[idx];
        if (result.status === "fulfilled" && Array.isArray(result.value)) {
          allIngestedArticles.push(...result.value);
          feedResults.push({
            name: feed.name,
            category: feed.category,
            count: result.value.length,
            status: "success",
          });
        } else {
          feedResults.push({
            name: feed.name,
            category: feed.category,
            count: 0,
            status: "failed",
          });
        }
      });
    }

    // Persist and deduplicate in database
    const { inserted, updated } = await db.articles.upsertMany(allIngestedArticles);
    const durationMs = Date.now() - startTime;

    console.log(
      `[Cron RSS Ingest Completed] Ingested ${allIngestedArticles.length} items (${inserted} new, ${updated} updated) from ${activeFeeds.length} feeds in ${durationMs}ms.`
    );

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      durationMs,
      telemetry: {
        totalFeedsAttempted: activeFeeds.length,
        totalArticlesParsed: allIngestedArticles.length,
        newArticlesInserted: inserted,
        existingArticlesUpdated: updated,
      },
      feedSummary: feedResults,
      sampleLatest: allIngestedArticles.slice(0, 3).map((a) => ({
        title: a.title,
        source: a.sourceName,
        category: a.category,
        publishedAt: a.publishedAt,
      })),
    });
  } catch (error: any) {
    console.error("[Cron RSS Ingest Fatal Error]", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Fatal error during autonomous feed ingestion.",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
