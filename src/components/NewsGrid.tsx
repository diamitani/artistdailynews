"use client";

import { useState, useMemo } from "react";
import { Article, CategoryType } from "@/lib/types";
import { CATEGORIES } from "@/lib/feeds-config";
import { ArticleCard } from "./ArticleCard";
import { AdContainer } from "./AdContainer";
import { Search, Filter, Sparkles, Layers, SlidersHorizontal, BookOpen, ArrowRight, Zap, TrendingUp } from "lucide-react";
import Link from "next/link";

interface NewsGridProps {
  initialArticles: Article[];
  onQuickRead: (article: Article) => void;
}

export function NewsGrid({ initialArticles, onQuickRead }: NewsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"latest" | "breaking">("latest");

  const filteredArticles = useMemo(() => {
    let list = [...initialArticles];

    // Filter by Category
    if (selectedCategory !== "all") {
      list = list.filter((a) => a.category === selectedCategory);
    }

    // Filter by Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.sourceName.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === "breaking") {
      list.sort((a, b) => (b.isBreaking ? 1 : 0) - (a.isBreaking ? 1 : 0));
    } else {
      list.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    }

    return list;
  }, [initialArticles, selectedCategory, searchQuery, sortBy]);

  // Featured "Big Read" story for magazine break
  const bigReadStory = initialArticles.find((a) => a.category === "financial" && !a.isFeatured) || initialArticles[1];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Category Pills & Filters Navigation Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#212638] pb-4">
          
          {/* Section Title */}
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#D4FF00] uppercase tracking-wider mb-0.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>THE DAILY INTELLIGENCE WIRE</span>
            </div>
            <h2 className="font-serif-headline text-2xl sm:text-3xl font-black text-white flex items-center">
              Front-Page Dispatches & Analysis
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Curated from 50+ industry sources &bull; Updated continuously across global bureaus
            </p>
          </div>

          {/* Search Bar & Sorting */}
          <div className="flex items-center space-x-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search royalties, AI, Spotify..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#11131E] border border-[#23283C] focus:border-[#D4FF00] rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-white"
                >
                  &times;
                </button>
              )}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#11131E] border border-[#23283C] text-xs text-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:border-[#D4FF00] font-mono"
            >
              <option value="latest">Latest Dispatches</option>
              <option value="breaking">Breaking First</option>
            </select>
          </div>
        </div>

        {/* Scrollable Category Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold uppercase whitespace-nowrap transition-all ${
              selectedCategory === "all"
                ? "bg-[#D4FF00] text-black shadow-md shadow-[#D4FF00]/20"
                : "bg-[#11131E] text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
            }`}
          >
            All Desks ({initialArticles.length})
          </button>

          {CATEGORIES.map((cat) => {
            const count = initialArticles.filter((a) => a.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                  isSelected
                    ? "bg-white text-black font-bold shadow-md"
                    : "bg-[#11131E] text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
                }`}
              >
                <span>{cat.name}</span>
                <span className="text-[10px] opacity-70">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Articles Grid with Native Ad Injection & The Big Read */}
      {filteredArticles.length === 0 ? (
        <div className="bg-[#11131E] border border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <Layers className="w-8 h-8 mx-auto text-slate-600" />
          <h3 className="font-serif-headline text-lg font-bold text-white">No dispatches found</h3>
          <p className="text-xs text-slate-400">
            Try adjusting your search query or select another category desk.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="text-xs text-[#D4FF00] hover:underline font-bold uppercase font-mono"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.slice(0, 6).map((article, idx) => (
              <div key={article.id} className="contents">
                <ArticleCard article={article} onQuickRead={onQuickRead} />
              </div>
            ))}
          </div>

          {/* "The Big Read" — Magazine Feature Spread Unit */}
          {bigReadStory && selectedCategory === "all" && !searchQuery && (
            <div className="bg-gradient-to-r from-[#171A29] via-[#121420] to-[#0D0F18] border border-[#2D334C] rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden group">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="bg-[#D4FF00] text-black font-black text-[10px] uppercase tracking-wider px-3 py-1 rounded">
                      ★ THE BIG READ
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Deep-Dive Investigation &bull; {bigReadStory.readTimeMinutes} min read
                    </span>
                  </div>

                  <h3 className="font-serif-headline text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight group-hover:text-[#D4FF00] transition-colors">
                    <Link href={`/news/${bigReadStory.slug}`}>{bigReadStory.title}</Link>
                  </h3>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    {bigReadStory.summary}
                  </p>

                  <div className="pull-quote text-xs sm:text-sm text-slate-200 mt-2">
                    {bigReadStory.takeaway}
                  </div>

                  <div className="pt-3 flex items-center space-x-4">
                    <Link
                      href={`/news/${bigReadStory.slug}`}
                      className="bg-[#D4FF00] hover:bg-[#bde600] text-black font-black text-xs uppercase px-5 py-2.5 rounded-lg flex items-center space-x-1.5 shadow-lg shadow-[#D4FF00]/15 transition-transform active:scale-95"
                    >
                      <span>Read Feature Essay</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <button
                      onClick={() => onQuickRead(bigReadStory)}
                      className="text-xs font-mono text-slate-300 hover:text-white bg-slate-800/80 px-4 py-2.5 rounded-lg border border-slate-700 font-semibold flex items-center space-x-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#D4FF00]" />
                      <span>30s Brief</span>
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
                    <img
                      src={bigReadStory.imageUrl}
                      alt={bigReadStory.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Remaining Articles Grid */}
          {filteredArticles.length > 6 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {filteredArticles.slice(6).map((article) => (
                <ArticleCard key={article.id} article={article} onQuickRead={onQuickRead} />
              ))}
            </div>
          )}

          {/* In-Feed Native Leaderboard Sponsor Slot */}
          <div className="pt-2">
            <AdContainer slotType="in-feed" />
          </div>
        </div>
      )}
    </section>
  );
}
