"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { BreakingTicker } from "@/components/BreakingTicker";
import { HeroHeadline } from "@/components/HeroHeadline";
import { MarketTerminal } from "@/components/MarketTerminal";
import { NewsGrid } from "@/components/NewsGrid";
import { FinancialCalculator } from "@/components/FinancialCalculator";
import { ReleaseChecklistTool } from "@/components/ReleaseChecklistTool";
import { PodcastPlayer } from "@/components/PodcastPlayer";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { SummaryDrawer } from "@/components/SummaryDrawer";
import { PressPassModal } from "@/components/PressPassModal";
import { SubscriptionModal } from "@/components/SubscriptionModal";
import { AdContainer } from "@/components/AdContainer";
import { MOCK_ARTICLES, MOCK_PODCASTS } from "@/lib/mock-articles";
import { Article } from "@/lib/types";

export default function HomePage() {
  const [selectedArticleForDrawer, setSelectedArticleForDrawer] = useState<Article | null>(null);
  const [pressPassModalOpen, setPressPassModalOpen] = useState(false);
  const [vipModalOpen, setVipModalOpen] = useState(false);

  const leadArticle = MOCK_ARTICLES.find((a) => a.isFeatured) || MOCK_ARTICLES[0];
  const subArticles = MOCK_ARTICLES.filter((a) => a.id !== leadArticle.id).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-[#08090D]">
      {/* Top 3-Tier Broadsheet Masthead */}
      <Header />

      {/* Breaking News Marquee Ticker */}
      <BreakingTicker articles={MOCK_ARTICLES} />

      {/* Top Header Leaderboard Ad (728x90) */}
      <AdContainer slotType="leaderboard" />

      {/* Hero 3-Column Broadsheet Lead Spread */}
      <HeroHeadline
        leadArticle={leadArticle}
        subArticles={subArticles}
        onQuickRead={(art) => setSelectedArticleForDrawer(art)}
      />

      {/* Real-Time Market Intelligence Terminal */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <MarketTerminal />
      </section>

      {/* Main Filterable News Grid with 8 Category Desks & The Big Read */}
      <NewsGrid
        initialArticles={MOCK_ARTICLES}
        onQuickRead={(art) => setSelectedArticleForDrawer(art)}
      />

      {/* Interactive 6-Week Pre-Release Algorithmic Blueprint */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <ReleaseChecklistTool />
      </section>

      {/* Interactive Music Business Financial Lab */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <FinancialCalculator />
      </section>

      {/* Industry Podcast & Audio Network Hub */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <PodcastPlayer episodes={MOCK_PODCASTS} />
      </section>

      {/* High-Conversion Daily Intelligence Newsletter Capture */}
      <NewsletterSignup />

      {/* Slide-out 30-Second Executive Summary Drawer */}
      <SummaryDrawer
        article={selectedArticleForDrawer}
        onClose={() => setSelectedArticleForDrawer(null)}
      />

      {/* Official Press Pass Accreditation Modal */}
      <PressPassModal
        isOpen={pressPassModalOpen}
        onClose={() => setPressPassModalOpen(false)}
      />

      {/* VIP Pro Subscription Modal */}
      <SubscriptionModal
        isOpen={vipModalOpen}
        onClose={() => setVipModalOpen(false)}
      />
    </div>
  );
}

