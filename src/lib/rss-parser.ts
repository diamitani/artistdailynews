import { XMLParser } from "fast-xml-parser";
import { Article, CategoryType, FeedSource } from "./types";
import { slugify } from "./utils";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  trimValues: true,
});

export async function fetchAndParseFeed(source: FeedSource): Promise<Article[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout

    const response = await fetch(source.url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "ArtistDailyNews-Bot/1.0 (+https://artistdailynews.com)",
        Accept: "application/rss+xml, application/xml, text/xml, application/atom+xml",
      },
      next: { revalidate: 3600 },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`[RSS Ingest] Failed to fetch feed from ${source.name} (${response.status})`);
      return [];
    }

    const xmlText = await response.text();
    const parsed = parser.parse(xmlText);

    let rawItems: any[] = [];

    // Standard RSS 2.0 channel -> item
    if (parsed?.rss?.channel?.item) {
      const items = parsed.rss.channel.item;
      rawItems = Array.isArray(items) ? items : [items];
    }
    // Atom feed -> entry
    else if (parsed?.feed?.entry) {
      const entries = parsed.feed.entry;
      rawItems = Array.isArray(entries) ? entries : [entries];
    }
    // RDF / RSS 1.0
    else if (parsed?.["rdf:RDF"]?.item) {
      const items = parsed["rdf:RDF"].item;
      rawItems = Array.isArray(items) ? items : [items];
    }

    const articles: Article[] = [];

    for (const item of rawItems.slice(0, 10)) {
      const title = cleanHtml(item.title || "Untitled Article");
      if (!title || title.length < 5) continue;

      const link = extractLink(item) || source.website;
      const pubDateStr = item.pubDate || item.published || item.updated || item["dc:date"] || new Date().toISOString();
      const rawContent = item["content:encoded"] || item.content || item.description || item.summary || "";
      const cleanedSnippet = cleanHtml(rawContent).slice(0, 280);
      const imageUrl = extractImage(item, rawContent) || defaultImageForCategory(source.category);

      const slug = `${slugify(title).slice(0, 60)}-${Math.random().toString(36).substring(2, 6)}`;

      articles.push({
        id: `rss-${slugify(source.name)}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        title,
        slug,
        summary: cleanedSnippet || `Latest updates on independent music business and creator intelligence from ${source.name}.`,
        bullets: [
          `Key industry intelligence reported directly from ${source.name}.`,
          "Impacts independent artists, streaming visibility, and catalogue rights.",
          "Read original coverage for complete verified metrics and primary sources.",
        ],
        takeaway: `Review your release schedule and distributor metadata to align with new developments reported by ${source.name}.`,
        category: source.category,
        sourceName: source.name,
        sourceUrl: source.website,
        originalUrl: link,
        imageUrl,
        publishedAt: new Date(pubDateStr).toISOString(),
        readTimeMinutes: Math.max(2, Math.ceil(cleanedSnippet.split(" ").length / 60)),
        tags: [source.name, source.category, "Industry News"],
        content: cleanHtml(rawContent),
      });
    }

    return articles;
  } catch (error) {
    console.error(`[RSS Ingest Error] ${source.name}:`, error);
    return [];
  }
}

function extractLink(item: any): string {
  if (typeof item.link === "string") return item.link;
  if (item.link?.["@_href"]) return item.link["@_href"];
  if (Array.isArray(item.link)) {
    const alternate = item.link.find((l: any) => l["@_rel"] === "alternate" || !l["@_rel"]);
    if (alternate?.["@_href"]) return alternate["@_href"];
  }
  if (item.guid && typeof item.guid === "string" && item.guid.startsWith("http")) return item.guid;
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
  // 4. HTML img tag
  const imgMatch = rawContent.match(/<img[^>]+src=["']([^"'>]+)["']/i);
  if (imgMatch && imgMatch[1] && !imgMatch[1].includes("doubleclick") && !imgMatch[1].includes("feedburner")) {
    return imgMatch[1];
  }
  return null;
}

function cleanHtml(htmlStr: any): string {
  if (!htmlStr) return "";
  const str = typeof htmlStr === "object" ? htmlStr["#text"] || "" : String(htmlStr);
  return str
    .replace(/<[^>]*>?/gm, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
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
