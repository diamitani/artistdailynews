import * as fs from "fs";
import * as path from "path";
import { INITIAL_FEEDS } from "../src/lib/feeds-config";
import { fetchAndParseFeed } from "../src/lib/rss-parser";
import { Article } from "../src/lib/types";

// Helper to determine pillar from category and content
// Pillars: business (deals, royalties, legal), culture (news, releases, tours), social (features, community, tutorials)
function determinePillar(art: Article): "business" | "culture" | "social" {
  const text = (art.title + " " + art.summary).toLowerCase();

  // BUSINESS: Financial, legal, streaming economics, deals
  if (
    art.category === "financial" ||
    art.category === "legal" ||
    text.includes("royalt") ||
    text.includes("payout") ||
    text.includes("catalog") ||
    text.includes("deal") ||
    text.includes("business") ||
    text.includes("contract") ||
    text.includes("earnings") ||
    text.includes("valuation") ||
    text.includes("market") ||
    text.includes("acquisition") ||
    text.includes("investment") ||
    text.includes("copyright") ||
    text.includes("lawsuit") ||
    text.includes("settlement")
  ) {
    return "business";
  }

  // SOCIAL: Features, tutorials, podcasts, community, production tips
  if (
    art.category === "social" ||
    art.category === "tutorials" ||
    art.category === "podcasts" ||
    art.category === "opportunities" ||
    art.category === "tech-ai" ||
    text.includes("interview") ||
    text.includes("feature") ||
    text.includes("spotlight") ||
    text.includes("guide") ||
    text.includes("how to") ||
    text.includes("tips") ||
    text.includes("masterclass") ||
    text.includes("producer") ||
    text.includes("behind the") ||
    text.includes("making of") ||
    text.includes("community")
  ) {
    return "social";
  }

  // CULTURE: Everything else - releases, tours, news, reviews
  return "culture";
}

// Helper to determine platform
function determinePlatform(art: Article): string {
  const text = (art.title + " " + art.summary + " " + art.sourceName).toLowerCase();
  if (text.includes("tiktok") || text.includes("reels") || text.includes("viral") || text.includes("short-form")) return "TikTok";
  if (text.includes("youtube") || text.includes("video") || text.includes("visual")) return "YouTube";
  if (text.includes("podcast") || text.includes("interview") || text.includes("audio")) return "Podcast";
  if (text.includes("instagram") || text.includes("social")) return "Instagram";
  if (text.includes("spotify") || text.includes("apple music") || text.includes("streaming")) return "Streaming";
  return "Web";
}

async function main() {
  console.log(`\n🚀 Starting Real RSS Feed Ingest across ${INITIAL_FEEDS.length} verified feeds...\n`);

  const allArticles: Article[] = [];
  const seenUrls = new Set<string>();
  const seenTitles = new Set<string>();

  for (const feed of INITIAL_FEEDS) {
    try {
      console.log(`📡 Fetching from: ${feed.name} (${feed.category})...`);
      const articles = await fetchAndParseFeed(feed);
      let added = 0;

      for (const art of articles) {
        const normTitle = art.title.toLowerCase().replace(/[^a-z0-9]/g, "");
        if (seenUrls.has(art.originalUrl) || seenTitles.has(normTitle)) {
          continue;
        }
        seenUrls.add(art.originalUrl);
        seenTitles.add(normTitle);
        allArticles.push(art);
        added++;
      }

      console.log(`   ✓ Added ${added} new articles from ${feed.name}`);
    } catch (err: any) {
      console.error(`   ✗ Error fetching ${feed.name}:`, err.message);
    }
  }

  // Sort by published date descending
  allArticles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  console.log(`\n📊 Total Unique Real Articles Ingested: ${allArticles.length}`);

  // Create adn_items format for the 3-pillar homepage and newsroom
  const adnItems = allArticles.map((art, idx) => {
    const pillar = determinePillar(art);
    const platform = determinePlatform(art);
    const signalScore = Math.floor(Math.random() * 25) + 75; // 75-100 score

    return {
      id: art.id,
      title: art.title,
      dek: art.summary,
      pillar,
      platform,
      freshness: art.publishedAt,
      ingested_at: art.publishedAt,
      url: art.originalUrl,
      source_name: art.sourceName,
      source_url: art.sourceUrl,
      why_it_matters: art.takeaway,
      bullets: art.bullets,
      image_url: art.imageUrl,
      category: art.category,
      signal_score: signalScore,
      author: art.author,
      slug: art.slug,
      read_time_minutes: art.readTimeMinutes,
    };
  });

  const dataDir = path.join(process.cwd(), "src", "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  fs.writeFileSync(path.join(dataDir, "articles.json"), JSON.stringify(allArticles, null, 2));
  fs.writeFileSync(path.join(dataDir, "adn_items.json"), JSON.stringify(adnItems, null, 2));

  console.log(`💾 Saved ${allArticles.length} articles to src/data/articles.json`);
  console.log(`💾 Saved ${adnItems.length} adn_items to src/data/adn_items.json`);
  console.log(`\nBreakdown by Pillar:`);
  console.log(`- Business: ${adnItems.filter(i => i.pillar === 'business').length}`);
  console.log(`- Culture: ${adnItems.filter(i => i.pillar === 'culture').length}`);
  console.log(`- Social: ${adnItems.filter(i => i.pillar === 'social').length}`);
  console.log(`\n✅ Ingest Complete!`);
}

main().catch(console.error);
