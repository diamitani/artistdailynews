import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { BreakingTicker } from "@/components/BreakingTicker";
import { NewsGrid } from "@/components/NewsGrid";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { AdContainer } from "@/components/AdContainer";
import { CATEGORIES } from "@/lib/feeds-config";
import { MOCK_ARTICLES } from "@/lib/mock-articles";
import { CategoryType } from "@/lib/types";

interface Props {
  params: Promise<{ category: string }>;
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
    <div className="min-h-screen flex flex-col bg-[#090A0F]">
      <Header />
      <BreakingTicker articles={MOCK_ARTICLES} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Channel Masthead */}
        <div className="bg-[#12141F] border border-[#272A38] rounded-2xl p-6 sm:p-8 space-y-3">
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span>Channels</span>
            <span>/</span>
            <span className="text-[#D4FF00] font-bold uppercase">{currentCat.name}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white flex items-center">
            <span className="w-3 h-3 rounded-full bg-[#D4FF00] mr-3"></span>
            {currentCat.name}
          </h1>

          <p className="text-sm text-slate-300 max-w-2xl">
            {currentCat.description}
          </p>
        </div>

        <AdContainer slotType="leaderboard" />

        {/* Filtered Grid */}
        <NewsGrid
          initialArticles={categoryArticles.length > 0 ? categoryArticles : MOCK_ARTICLES}
          onQuickRead={() => {}}
        />
      </main>

      <NewsletterSignup />
    </div>
  );
}
