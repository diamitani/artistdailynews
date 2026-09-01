import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES } from "@/lib/feeds-config";
import { getArticles } from "@/lib/adn-db";
import { TopicDeskClient } from "@/components/TopicDeskClient";

export const dynamic = "force-dynamic";
export const revalidate = 60;

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

// Map category slugs to pillar names used in the database
const CATEGORY_TO_PILLAR: Record<string, string> = {
  financial: "business",
  streaming: "culture",
  "tech-ai": "ideas",
  marketing: "culture",
  legal: "business",
  podcasts: "culture",
  tutorials: "ideas",
  opportunities: "business",
};

export default async function TopicPage({ params }: Props) {
  const { category } = await params;
  const currentCat = CATEGORIES.find((c) => c.slug === category);

  if (!currentCat) {
    notFound();
  }

  // Fetch all articles first
  const allArticles = await getArticles(100);

  // Filter by category field OR by mapped pillar
  const pillar = CATEGORY_TO_PILLAR[currentCat.id];
  const categoryArticles = allArticles.filter(
    (a: any) => a.category === currentCat.id || a.pillar === pillar
  );

  return (
    <TopicDeskClient
      currentCategory={currentCat}
      articles={categoryArticles}
      allArticles={allArticles}
    />
  );
}
