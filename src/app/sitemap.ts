import { MetadataRoute } from "next";
import { CATEGORIES } from "@/lib/feeds-config";
import { getArticles } from "@/lib/adn-db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://artistdailynews.com";

  // Core editorial routes
  const coreRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/news-home`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.85,
    },
  ];

  // Multimedia & Hubs
  const mediaRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/library`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/podcasts`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/newsletters`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/chat`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Creator Business & Tools
  const creatorRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/press-pass`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/network`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/advertise`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    },
  ];

  // Category/topic channels from feeds configuration
  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${baseUrl}/topics/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "hourly" as const,
    priority: 0.85,
  }));

  // Real article routes from the live article feed (RSS + Supabase merged).
  // Falls back to an empty list if the feed fetch fails — core routes still ship.
  let articleRoutes: MetadataRoute.Sitemap = [];
  try {
    const articles = await getArticles(400);
    const seen = new Set<string>();
    articleRoutes = articles
      .filter(
        (art: any) => art?.slug && !seen.has(art.slug) && (seen.add(art.slug), true)
      )
      .map((art: any) => {
        const rawDate = art.publishedAt || art.published_at || art.date;
        let lastModified: Date = new Date();
        if (rawDate) {
          const parsed = new Date(rawDate);
          if (!isNaN(parsed.getTime())) lastModified = parsed;
        }
        return {
          url: `${baseUrl}/news/${art.slug}`,
          lastModified,
          changeFrequency: "daily" as const,
          priority: 0.8,
        };
      });
  } catch {
    // Silent fallback: sitemap still serves core/category routes.
  }

  // Combine and deduplicate by URL
  const allRoutes = [
    ...coreRoutes,
    ...mediaRoutes,
    ...creatorRoutes,
    ...categoryRoutes,
    ...articleRoutes,
  ];

  const seenUrls = new Set<string>();
  return allRoutes.filter((route) => {
    if (seenUrls.has(route.url)) {
      return false;
    }
    seenUrls.add(route.url);
    return true;
  });
}
