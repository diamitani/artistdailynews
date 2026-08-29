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
import { MOCK_PODCASTS } from "@/lib/mock-articles";
import { Article } from "@/lib/types";

interface MediaHubShellProps {
  articles: Article[];
}

export function MediaHubShell({ articles }: MediaHubShellProps) {
  const [selectedArticleForDrawer, setSelectedArticleForDrawer] = useState<Article | null>(null);
  const [pressPassModalOpen, setPressPassModalOpen] = useState(false);
  const [vipModalOpen, setVipModalOpen] = useState(false);

  // If we don't have enough articles, fallback gracefully
  const leadArticle = articles.find((a) => a.isFeatured) || articles[0];
  const subArticles = articles.filter((a) => a.id !== leadArticle?.id).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top 3-Tier Masthead */}
      <Header />

      {/* Breaking News Marquee Ticker */}
      {articles.length > 0 && <BreakingTicker articles={articles} />}

      {/* Top Header Leaderboard Ad (728x90) */}
      <AdContainer slotType="leaderboard" />

      {/* Hero Platform Value Prop + Lead Story */}
      {leadArticle && (
        <HeroHeadline
          leadArticle={leadArticle}
          subArticles={subArticles}
          onQuickRead={(art) => setSelectedArticleForDrawer(art)}
        />
      )}

      {/* Real-Time Market Intelligence Terminal */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <MarketTerminal />
      </section>

      {/* Main Filterable News Grid */}
      <NewsGrid
        initialArticles={articles}
        onQuickRead={(art) => setSelectedArticleForDrawer(art)}
      />

      {/* Interactive 6-Week Pre-Release Blueprint */}
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

      {/* Newsletter Capture */}
      <NewsletterSignup />

      {/* Slide-out Summary Drawer */}
      <SummaryDrawer
        article={selectedArticleForDrawer}
        onClose={() => setSelectedArticleForDrawer(null)}
      />

      {/* Press Pass Modal */}
      <PressPassModal
        isOpen={pressPassModalOpen}
        onClose={() => setPressPassModalOpen(false)}
      />

      {/* VIP Subscription Modal */}
      <SubscriptionModal
        isOpen={vipModalOpen}
        onClose={() => setVipModalOpen(false)}
      />
    </div>
  );
}
