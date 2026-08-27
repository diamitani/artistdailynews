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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = MOCK_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return { title: "Article Not Found | Artist Daily News" };
  }

  return {
    title: `${article.title} | Artist Daily News`,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      images: [{ url: article.imageUrl, alt: article.title }],
      type: "article",
      publishedTime: article.publishedAt,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = MOCK_ARTICLES.find((a) => a.slug === slug) || MOCK_ARTICLES[0];

  if (!article) {
    notFound();
  }

  const relatedArticles = MOCK_ARTICLES.filter((a) => a.id !== article.id && a.category === article.category).slice(0, 3);

  // JSON-LD Structured Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.summary,
    image: [article.imageUrl],
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: [
      {
        "@type": "Organization",
        name: article.sourceName,
        url: article.sourceUrl,
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "Artist Daily News",
      logo: {
        "@type": "ImageObject",
        url: "https://artistdailynews.com/logo.png",
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090A0F]">
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
