"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { BreakingTicker } from "@/components/BreakingTicker";
import { NewsGrid } from "@/components/NewsGrid";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { AdContainer } from "@/components/AdContainer";
import { SummaryDrawer } from "@/components/SummaryDrawer";
import { PressPassModal } from "@/components/PressPassModal";
import { SubscriptionModal } from "@/components/SubscriptionModal";
import { CATEGORIES } from "@/lib/feeds-config";
import { Article, CategoryInfo } from "@/lib/types";
import { Layers, ArrowLeft, Ticket, Sparkles, BookOpen, ExternalLink, ShieldCheck, ChevronRight } from "lucide-react";

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
    <div className="min-h-screen flex flex-col bg-[#08090D]">
      {/* Top 3-Tier Broadsheet Masthead */}
      <Header />

      {/* Breaking News Marquee Ticker */}
      <BreakingTicker articles={allArticles} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Channel Masthead */}
        <div className="bg-[#11131E] border border-[#23283C] rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden space-y-4">
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
            <Link href="/" className="hover:text-white flex items-center space-x-1">
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              <span>Front Page</span>
            </Link>
            <span>/</span>
            <span>Channel Desks</span>
            <span>/</span>
            <span className="text-[#D4FF00] font-bold uppercase tracking-wider">{currentCategory.name}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="w-3.5 h-3.5 rounded-full bg-[#D4FF00] live-pulse"></span>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D4FF00]">
                  OFFICIAL ADN EDITORIAL DESK
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                {currentCategory.name}
              </h1>
              <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
                {currentCategory.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => setPressPassModalOpen(true)}
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase px-4 py-2.5 rounded-xl border border-slate-700 transition-colors flex items-center space-x-1.5"
              >
                <Ticket className="w-3.5 h-3.5 text-[#D4FF00]" />
                <span>Media Credentials</span>
              </button>
              <button
                onClick={() => setVipModalOpen(true)}
                className="bg-[#D4FF00] hover:bg-[#bde600] text-black font-black text-xs uppercase px-4 py-2.5 rounded-xl transition-transform active:scale-95 shadow-md shadow-[#D4FF00]/10 flex items-center space-x-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>VIP Pro Data</span>
              </button>
            </div>
          </div>

          {/* Quick Desk Navigation Pills */}
          <div className="pt-4 border-t border-slate-800/80 flex items-center space-x-2 overflow-x-auto scrollbar-none text-xs font-mono">
            <span className="text-slate-500 uppercase shrink-0 mr-1">Other Desks:</span>
            {CATEGORIES.filter((c) => c.id !== currentCategory.id).map((c) => (
              <Link
                key={c.id}
                href={`/topics/${c.slug}`}
                className="bg-[#0A0B10] hover:bg-slate-800 text-slate-400 hover:text-white px-3 py-1 rounded-lg border border-slate-800 transition-colors whitespace-nowrap"
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
    </div>
  );
}
