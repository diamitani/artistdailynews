import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/", "/dashboard"],
      },
      {
        userAgent: "Googlebot-News",
        allow: ["/", "/news/", "/topics/"],
      },
    ],
    sitemap: "https://artistdailynews.com/sitemap.xml",
  };
}
