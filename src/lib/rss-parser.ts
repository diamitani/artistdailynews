import { XMLParser } from "fast-xml-parser";
import { Article, CategoryType, FeedSource } from "./types";
import { slugify } from "./utils";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  trimValues: true,
  cdataPropName: "__cdata",
});

export async function fetchAndParseFeed(source: FeedSource): Promise<Article[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9000); // 9s timeout

    const response = await fetch(source.url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "ArtistDailyNews-Aggregator/2.0 (+https://artistdailynews.com; editorial@artistdailynews.com)",
        Accept: "application/rss+xml, application/xml, text/xml, application/atom+xml, */*",
      },
      next: { revalidate: 1800 },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`[RSS Ingest] Warning: HTTP ${response.status} from ${source.name}`);
      return [];
    }

    const xmlText = await response.text();
    const parsed = parser.parse(xmlText);

    let rawItems: any[] = [];

    // 1. Standard RSS 2.0 channel -> item
    if (parsed?.rss?.channel?.item) {
      const items = parsed.rss.channel.item;
      rawItems = Array.isArray(items) ? items : [items];
    }
    // 2. Atom feed -> entry
    else if (parsed?.feed?.entry) {
      const entries = parsed.feed.entry;
      rawItems = Array.isArray(entries) ? entries : [entries];
    }
    // 3. RDF / RSS 1.0 -> item
    else if (parsed?.["rdf:RDF"]?.item) {
      const items = parsed["rdf:RDF"].item;
      rawItems = Array.isArray(items) ? items : [items];
    }

    const articles: Article[] = [];

    for (const item of rawItems.slice(0, 15)) {
      const rawTitle = extractText(item.title) || "Untitled Industry Dispatch";
      const title = cleanHtml(rawTitle);
      if (!title || title.length < 6) continue;

      const link = extractLink(item) || source.website;
      const pubDateStr =
        item.pubDate ||
        item.published ||
        item.updated ||
        item["dc:date"] ||
        new Date().toISOString();

      const rawContent =
        extractText(item["content:encoded"]) ||
        extractText(item.content) ||
        extractText(item.description) ||
        extractText(item.summary) ||
        "";

      const cleanedSnippet = cleanHtml(rawContent).slice(0, 320);
      const imageUrl = extractImage(item, rawContent) || defaultImageForCategory(source.category);

      const uniqueHash = Math.random().toString(36).substring(2, 6);
      const slug = `${slugify(title).slice(0, 65)}-${uniqueHash}`;

      // Synthesize Takeaways & Strategic DIY Signal
      const takeaway = generateActionableTakeaway(source.name, source.category, title);
      const bullets = generateBullets(source.name, source.category, title, cleanedSnippet);

      articles.push({
        id: `art-${slugify(source.name)}-${Date.now()}-${uniqueHash}`,
        title,
        slug,
        summary:
          cleanedSnippet ||
          `Exclusive coverage and market intelligence reported by ${source.name} regarding independent music rights, streaming discovery, and creator economics.`,
        bullets,
        takeaway,
        category: source.category,
        sourceName: source.name,
        sourceUrl: source.website,
        originalUrl: link,
        imageUrl,
        publishedAt: isValidDate(pubDateStr) ? new Date(pubDateStr).toISOString() : new Date().toISOString(),
        readTimeMinutes: Math.max(2, Math.min(8, Math.ceil(cleanedSnippet.split(" ").length / 45))),
        isBreaking: title.toLowerCase().includes("breaking") || title.toLowerCase().includes("urgent"),
        tags: [source.name, source.category, "Music Business", "Independent Rights"],
        content: cleanHtml(rawContent),
        author: `${source.name} Newsdesk`,
      });
    }

    return articles;
  } catch (error) {
    console.error(`[RSS Parser Error] Failed to process ${source.name}:`, error);
    return [];
  }
}

function extractText(val: any): string {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (val.__cdata) return val.__cdata;
  if (val["#text"]) return val["#text"];
  return String(val);
}

function extractLink(item: any): string {
  if (typeof item.link === "string") return item.link;
  if (item.link?.["@_href"]) return item.link["@_href"];
  if (Array.isArray(item.link)) {
    const alternate = item.link.find((l: any) => l["@_rel"] === "alternate" || !l["@_rel"]);
    if (alternate?.["@_href"]) return alternate["@_href"];
  }
  if (item.guid && typeof item.guid === "string" && item.guid.startsWith("http")) return item.guid;
  if (item.guid?.["#text"] && item.guid["#text"].startsWith("http")) return item.guid["#text"];
  return "";
}

function extractImage(item: any, rawContent: string): string | null {
  // 1. Media content
  if (item["media:content"]?.["@_url"]) return item["media:content"]["@_url"];
  if (Array.isArray(item["media:content"]) && item["media:content"][0]?.["@_url"]) {
    return item["media:content"][0]["@_url"];
  }
  // 2. Enclosure
  if (item.enclosure?.["@_url"] && item.enclosure["@_type"]?.includes("image")) {
    return item.enclosure["@_url"];
  }
  // 3. Media thumbnail
  if (item["media:thumbnail"]?.["@_url"]) return item["media:thumbnail"]["@_url"];
  // 4. Embedded HTML image tag
  const imgMatch = rawContent.match(/<img[^>]+src=["']([^"'>]+)["']/i);
  if (imgMatch && imgMatch[1] && !imgMatch[1].includes("doubleclick") && !imgMatch[1].includes("feedburner") && !imgMatch[1].includes("gravatar")) {
    return imgMatch[1];
  }
  return null;
}

function cleanHtml(htmlStr: any): string {
  if (!htmlStr) return "";
  const str = typeof htmlStr === "object" ? htmlStr["#text"] || htmlStr.__cdata || "" : String(htmlStr);
  return str
    .replace(/<[^>]*>?/gm, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function isValidDate(d: any): boolean {
  const time = new Date(d).getTime();
  return !isNaN(time);
}

function generateActionableTakeaway(sourceName: string, category: CategoryType, title: string): string {
  switch (category) {
    case "financial":
      return `Review catalogue split sheets and ensure master recordings have registered ISRC/ISWC codes to capture all international mechanical royalties.`;
    case "streaming":
      return `Optimize your 4-week pre-save window and algorithmic pitch metadata in Spotify for Artists to maximize Release Radar momentum.`;
    case "tech-ai":
      return `Integrate AI-assisted mastering and automated stems workflow while retaining 100% human songwriting copyright ownership.`;
    case "marketing":
      return `Focus short-form video hooks on the 15-second chorus climax to increase TikTok audio save rates and algorithmic sound page adds.`;
    case "legal":
      return `Audit all producer contracts for work-for-hire provisions and cap distributor recoupment percentages to safeguard catalogue equity.`;
    default:
      return `Align release schedules and rights distribution with the industry trends and market indicators documented by ${sourceName}.`;
  }
}

function generateBullets(sourceName: string, category: CategoryType, title: string, snippet: string): string[] {
  return [
    `Primary dispatch verified directly from ${sourceName}.`,
    `Direct strategic impact on ${category} policy and independent artist revenue streams.`,
    `Independent rights holders advised to review distributor agreements and schedule compliance.`,
  ];
}

function defaultImageForCategory(category: CategoryType): string {
  const images: Record<CategoryType, string> = {
    financial: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    streaming: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
    "tech-ai": "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80",
    marketing: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
    legal: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80",
    podcasts: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80",
    tutorials: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1200&q=80",
    opportunities: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80",
  };
  return images[category] || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80";
}

