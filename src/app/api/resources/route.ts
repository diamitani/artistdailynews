import { NextRequest, NextResponse } from "next/server";
import { TOP_100_PLATFORMS } from "@/lib/top100-platforms";
import { DAILY_ARTICLES_SHEET } from "@/lib/daily-articles-sheet";
import { DAILY_VIDEOS_SHEET } from "@/lib/daily-videos-sheet";
import { platformsToCsv, dailyArticlesToCsv, dailyVideosToCsv } from "@/lib/resources-schema";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "all"; // 'platforms' | 'articles' | 'videos' | 'all'
  const format = searchParams.get("format") || "json"; // 'json' | 'csv'
  const query = searchParams.get("query"); // for videos query filter

  if (type === "platforms") {
    if (format === "csv") {
      const csv = platformsToCsv(TOP_100_PLATFORMS);
      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": 'attachment; filename="top100_platforms.csv"',
        },
      });
    }
    return NextResponse.json({
      success: true,
      count: TOP_100_PLATFORMS.length,
      platforms: TOP_100_PLATFORMS,
    });
  }

  if (type === "articles") {
    if (format === "csv") {
      const csv = dailyArticlesToCsv(DAILY_ARTICLES_SHEET);
      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": 'attachment; filename="daily_articles_sheet.csv"',
        },
      });
    }
    return NextResponse.json({
      success: true,
      date: new Date().toISOString().split("T")[0],
      count: DAILY_ARTICLES_SHEET.length,
      articles: DAILY_ARTICLES_SHEET,
    });
  }

  if (type === "videos") {
    let filteredVideos = DAILY_VIDEOS_SHEET;
    if (query) {
      filteredVideos = filteredVideos.filter((v) => v.searchQueryCategory === query);
    }
    if (format === "csv") {
      const csv = dailyVideosToCsv(filteredVideos);
      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": 'attachment; filename="daily_videos_sheet.csv"',
        },
      });
    }
    return NextResponse.json({
      success: true,
      date: new Date().toISOString().split("T")[0],
      count: filteredVideos.length,
      videos: filteredVideos,
    });
  }

  // Default: Summary of all datasets
  return NextResponse.json({
    success: true,
    timestamp: new Date().toISOString(),
    datasets: {
      platforms: {
        count: TOP_100_PLATFORMS.length,
        endpoints: {
          json: "/api/resources?type=platforms&format=json",
          csv: "/api/resources?type=platforms&format=csv",
        },
      },
      daily_articles: {
        count: DAILY_ARTICLES_SHEET.length,
        endpoints: {
          json: "/api/resources?type=articles&format=json",
          csv: "/api/resources?type=articles&format=csv",
        },
      },
      daily_videos: {
        count: DAILY_VIDEOS_SHEET.length,
        queries: [
          "music_business_news",
          "music_industry_news",
          "music_podcasts",
          "music_production_masterclasses",
        ],
        endpoints: {
          json: "/api/resources?type=videos&format=json",
          csv: "/api/resources?type=videos&format=csv",
        },
      },
    },
  });
}
