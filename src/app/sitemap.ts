import { MetadataRoute } from "next";
import { CATEGORIES } from "@/lib/feeds-config";
import { MOCK_ARTICLES } from "@/lib/mock-articles";

export default function sitemap(): MetadataRoute.Sitemap {
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

  // Featured article routes
  const articleRoutes: MetadataRoute.Sitemap = MOCK_ARTICLES.slice(0, 20).map((art) => ({
    url: `${baseUrl}/news/${art.slug}`,
    lastModified: new Date(art.publishedAt),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

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
