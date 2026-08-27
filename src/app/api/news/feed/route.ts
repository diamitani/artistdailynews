import { NextResponse } from "next/server";
import { MOCK_ARTICLES } from "@/lib/mock-articles";
import { CategoryType } from "@/lib/types";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") as CategoryType | null;
  const format = searchParams.get("format");
  const limit = parseInt(searchParams.get("limit") || "20", 10);

  let articles = [...MOCK_ARTICLES];

  if (category) {
    articles = articles.filter((a) => a.category === category);
  }

  articles = articles.slice(0, limit);

  // Return XML RSS Feed if requested
  if (format === "rss" || format === "xml") {
    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Artist Daily News (ADN) — Independent Music Intelligence</title>
    <link>https://artistdailynews.com</link>
    <description>Daily breaking news, royalties, streaming updates, and viral playbooks for independent musicians.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://artistdailynews.com/api/news/feed?format=rss" rel="self" type="application/rss+xml" />
    ${articles
      .map(
        (art) => `
    <item>
      <title><![CDATA[${art.title}]]></title>
      <link>https://artistdailynews.com/news/${art.slug}</link>
      <guid isPermaLink="true">https://artistdailynews.com/news/${art.slug}</guid>
      <pubDate>${new Date(art.publishedAt).toUTCString()}</pubDate>
      <description><![CDATA[${art.summary} (Why This Matters: ${art.takeaway})]]></description>
      <category>${art.category}</category>
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

    return new NextResponse(rssXml, {
      status: 200,
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  }

  // Return JSON Feed
  return NextResponse.json({
    title: "Artist Daily News Intelligence Feed",
    total: articles.length,
    articles,
  });
}
