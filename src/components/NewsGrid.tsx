"use client";

import { useState, useMemo } from "react";
import { Article, CategoryType } from "@/lib/types";
import { CATEGORIES } from "@/lib/feeds-config";
import { ArticleCard } from "./ArticleCard";
import { AdContainer } from "./AdContainer";
import { Search, Filter, Sparkles, Layers, SlidersHorizontal } from "lucide-react";

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

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Category Pills & Filters Navigation Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#272A38] pb-4">
          
          {/* Section Title */}
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4FF00] mr-2.5"></span>
              The Daily Intelligence Feed
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Aggregated across 50+ music industry sources &bull; Updated continuously
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
                className="w-full bg-[#141622] border border-[#272A38] focus:border-[#D4FF00] rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none transition-colors"
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
              className="bg-[#141622] border border-[#272A38] text-xs text-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#D4FF00]"
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
                : "bg-[#141622] text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
            }`}
          >
            All Channels ({initialArticles.length})
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
                    : "bg-[#141622] text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
                }`}
              >
                <span>{cat.name}</span>
                <span className="text-[10px] opacity-70">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Articles Grid with Native Ad Injection */}
      {filteredArticles.length === 0 ? (
        <div className="bg-[#12131C] border border-slate-800 rounded-xl p-12 text-center space-y-3">
          <Layers className="w-8 h-8 mx-auto text-slate-600" />
          <h3 className="text-base font-bold text-white">No dispatches found</h3>
          <p className="text-xs text-slate-400">
            Try adjusting your search query or select another category vertical.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="text-xs text-[#D4FF00] hover:underline font-bold uppercase"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, idx) => (
              <div key={article.id} className="contents">
                <ArticleCard article={article} onQuickRead={onQuickRead} />
                {/* Inject In-Feed Native Sponsor Unit every 6 articles */}
                {idx === 2 && (
                  <div className="col-span-1 md:col-span-2 lg:col-span-3">
                    <AdContainer slotType="in-feed" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
