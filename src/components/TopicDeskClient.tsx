"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BreakingTicker } from "@/components/BreakingTicker";
import { NewsGrid } from "@/components/NewsGrid";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { AdContainer } from "@/components/AdContainer";
import { SummaryDrawer } from "@/components/SummaryDrawer";
import { PressPassModal } from "@/components/PressPassModal";
import { SubscriptionModal } from "@/components/SubscriptionModal";
import { CATEGORIES } from "@/lib/feeds-config";
import { Article, CategoryInfo } from "@/lib/types";
import { ArrowLeft, Ticket, Sparkles } from "lucide-react";

interface TopicDeskClientProps {
  currentCategory: CategoryInfo;
  articles: Article[];
  allArticles: Article[];
}

export function TopicDeskClient({ currentCategory, articles, allArticles }: TopicDeskClientProps) {
  const [selectedArticleForDrawer, setSelectedArticleForDrawer] = useState<Article | null>(null);
  const [pressPassModalOpen, setPressPassModalOpen] = useState(false);
  const [vipModalOpen, setVipModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] justify-between">
      {/* Top 3-Tier Broadsheet Masthead */}
      <Header />

      {/* Breaking News Marquee Ticker */}
      <BreakingTicker articles={allArticles} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 w-full">
        {/* Channel Masthead */}
        <div className="card-brand p-6 sm:p-10 relative overflow-hidden space-y-4">
          <div className="flex items-center space-x-2 text-xs font-mono text-[var(--text-muted)]">
            <Link href="/" className="hover:text-[var(--accent-primary)] flex items-center space-x-1">
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              <span>Front Page</span>
            </Link>
            <span>/</span>
            <span>Channel Desks</span>
            <span>/</span>
            <span className="text-[var(--accent-primary)] font-bold uppercase tracking-wider">{currentCategory.name}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-primary)] live-pulse"></span>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--accent-primary)]">
                  OFFICIAL ADN EDITORIAL DESK
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[var(--text-primary)] leading-tight">
                {currentCategory.name}
              </h1>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-3xl leading-relaxed">
                {currentCategory.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => setPressPassModalOpen(true)}
                className="btn-brand-outline text-xs px-4 py-2.5 flex items-center space-x-1.5"
              >
                <Ticket className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                <span>Media Credentials</span>
              </button>
              <button
                onClick={() => setVipModalOpen(true)}
                className="btn-brand text-xs px-4 py-2.5 flex items-center space-x-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>VIP Pro Data</span>
              </button>
            </div>
          </div>

          {/* Quick Desk Navigation Pills */}
          <div className="pt-4 border-t border-[var(--border-color)] flex items-center space-x-2 overflow-x-auto scrollbar-none text-xs font-mono">
            <span className="text-[var(--text-muted)] uppercase shrink-0 mr-1">Other Desks:</span>
            {CATEGORIES.filter((c) => c.id !== currentCategory.id).map((c) => (
              <Link
                key={c.id}
                href={`/topics/${c.slug}`}
                className="bg-[var(--bg-secondary)] hover:bg-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-3 py-1 rounded-lg border border-[var(--border-color)] transition-colors whitespace-nowrap"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Top Header Leaderboard Ad */}
        <AdContainer slotType="leaderboard" />

        {/* News Grid Filtered to This Category by Default */}
        <NewsGrid
          initialArticles={allArticles}
          defaultCategory={currentCategory.id}
          onQuickRead={(art) => setSelectedArticleForDrawer(art)}
        />
      </main>

      {/* Newsletter Signup */}
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

      <Footer />
    </div>
  );
}
