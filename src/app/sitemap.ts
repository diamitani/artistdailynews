import { MetadataRoute } from "next";
import { CATEGORIES } from "@/lib/feeds-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://artistdailynews.com";

  // Core editorial routes - highest priority
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
      priority: 1.0,
    },
  ];

  // Section pages - editorial pillars
  const sectionRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/topics/financial`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/topics/streaming`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/topics/social`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/topics/tech-ai`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.85,
    },
  ];

  // Premium content routes
  const premiumRoutes: MetadataRoute.Sitemap = [
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
  ];

  // Media & engagement routes
  const mediaRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/podcasts`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.85,
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

  // Tools & utility routes
  const toolRoutes: MetadataRoute.Sitemap = [
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
      priority: 0.75,
    },
  ];

  // Business routes
  const businessRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/advertise`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // User routes (lower priority for SEO)
  const userRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/dashboard`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/billing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  // Category/topic routes from config
  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${baseUrl}/topics/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "hourly" as const,
    priority: 0.85,
  }));

  return [
    ...coreRoutes,
    ...sectionRoutes,
    ...premiumRoutes,
    ...mediaRoutes,
    ...toolRoutes,
    ...businessRoutes,
    ...userRoutes,
    ...categoryRoutes,
  ];
}
