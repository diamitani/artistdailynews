import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES } from "@/lib/feeds-config";
import { MOCK_ARTICLES } from "@/lib/mock-articles";
import { TopicDeskClient } from "@/components/TopicDeskClient";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug === category);

  if (!cat) {
    return { title: "Topic Channel | Artist Daily News" };
  }

  return {
    title: `${cat.name} — Independent Music Intelligence | Artist Daily News`,
    description: cat.description,
    alternates: {
      canonical: `https://artistdailynews.com/topics/${cat.slug}`,
    },
    openGraph: {
      title: `${cat.name} — Independent Music Intelligence | Artist Daily News`,
      description: cat.description,
      url: `https://artistdailynews.com/topics/${cat.slug}`,
      siteName: "Artist Daily News",
      type: "website",
    },
  };
}

export default async function TopicPage({ params }: Props) {
  const { category } = await params;
  const currentCat = CATEGORIES.find((c) => c.slug === category);

  if (!currentCat) {
    notFound();
  }

  const categoryArticles = MOCK_ARTICLES.filter((a) => a.category === currentCat.id);

  return (
    <TopicDeskClient
      currentCategory={currentCat}
      articles={categoryArticles}
      allArticles={MOCK_ARTICLES}
    />
  );
}
