import { MetadataRoute } from "next";
import { CATEGORIES } from "@/lib/feeds-config";
import { MOCK_ARTICLES } from "@/lib/mock-articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://artistdailynews.com";

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1.0,
    },
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
      priority: 0.8,
    },
    {
      url: `${baseUrl}/network`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/chat`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/advertise`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/podcasts`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  // Category routes
  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${baseUrl}/topics/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "hourly",
    priority: 0.85,
  }));

  // Article routes
  const articleRoutes: MetadataRoute.Sitemap = MOCK_ARTICLES.map((art) => ({
    url: `${baseUrl}/news/${art.slug}`,
    lastModified: new Date(art.publishedAt),
    changeFrequency: "monthly",
    priority: art.isFeatured ? 0.95 : 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...articleRoutes];
}
