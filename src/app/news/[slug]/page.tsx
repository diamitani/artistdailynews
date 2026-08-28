import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { BreakingTicker } from "@/components/BreakingTicker";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { ArticleDetailView } from "@/components/ArticleDetailView";
import { MOCK_ARTICLES } from "@/lib/mock-articles";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return MOCK_ARTICLES.map((art) => ({
    slug: art.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = MOCK_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return { title: "Dispatch Not Found | Artist Daily News" };
  }

  const title = `${article.title} — Artist Daily News`;
  const description = `${article.summary.slice(0, 155)}...`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://artistdailynews.com/news/${article.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://artistdailynews.com/news/${article.slug}`,
      siteName: "Artist Daily News",
      images: [
        {
          url: article.imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.publishedAt,
      authors: [article.author || "ADN Newsdesk"],
      section: article.category,
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [article.imageUrl],
      creator: "@artistdailynews",
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = MOCK_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = MOCK_ARTICLES.filter(
    (a) => a.id !== article.id && a.category === article.category
  ).slice(0, 3);

  // Full Institutional NewsArticle JSON-LD Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://artistdailynews.com/news/${article.slug}`,
    },
    headline: article.title,
    description: article.summary,
    image: [article.imageUrl],
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    articleSection: article.category.toUpperCase(),
    keywords: article.tags.join(", "),
    wordCount: (article.content || article.summary).split(/\s+/).length,
    author: [
      {
        "@type": "Person",
        name: article.author || "Marcus Vance",
        jobTitle: "Senior Music Business Editor",
        worksFor: {
          "@type": "Organization",
          name: "Artist Daily News",
        },
      },
    ],
    publisher: {
      "@type": "NewsMediaOrganization",
      name: "Artist Daily News",
      url: "https://artistdailynews.com",
      logo: {
        "@type": "ImageObject",
        url: "https://artistdailynews.com/artispreneur-logo.png",
      },
      parentOrganization: {
        "@type": "Organization",
        name: "Artispreneur Media Network",
        url: "https://artispreneur.com",
      },
    },
    isAccessibleForFree: true,
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#08090D]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />
      <BreakingTicker articles={MOCK_ARTICLES} />

      <ArticleDetailView
        article={article}
        relatedArticles={relatedArticles}
      />

      <NewsletterSignup />
    </div>
  );
}
