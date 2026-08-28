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
  defaultCategory?: CategoryType | "all";
}

export function NewsGrid({ initialArticles, onQuickRead, defaultCategory = "all" }: NewsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | "all">(defaultCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"latest" | "breaking">("latest");

  const filteredArticles = useMemo(() => {
    let list = [...initialArticles];

    if (selectedCategory !== "all") {
      list = list.filter((a) => a.category === selectedCategory);
    }

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

    if (sortBy === "breaking") {
      list.sort((a, b) => (b.isBreaking ? 1 : 0) - (a.isBreaking ? 1 : 0));
    } else {
      list.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    }

    return list;
  }, [initialArticles, selectedCategory, searchQuery, sortBy]);

  const bigReadStory = initialArticles.find((a) => a.category === "financial" && !a.isFeatured) || initialArticles[1];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Category Pills & Filters */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-4">
          
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[var(--accent-gold)] uppercase tracking-wider mb-0.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>THE DAILY INTELLIGENCE WIRE</span>
            </div>
            <h2 className="font-serif-headline text-2xl sm:text-3xl font-black text-[var(--text-primary)] flex items-center">
              Front-Page Dispatches & Analysis
            </h2>
            <p className="text-xs text-[var(--text-muted)] font-mono mt-0.5">
              Curated from 50+ industry sources &bull; Updated continuously across global bureaus
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder="Search royalties, AI, Spotify..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] focus:border-[var(--accent-gold)] rounded-xl pl-9 pr-3 py-2 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                >
                  &times;
                </button>
              )}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[var(--bg-card)] border border-[var(--border-color)] text-xs text-[var(--text-secondary)] rounded-xl px-3 py-2 focus:outline-none focus:border-[var(--accent-gold)] font-mono"
            >
              <option value="latest">Latest Dispatches</option>
              <option value="breaking">Breaking First</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold uppercase whitespace-nowrap transition-all ${
              selectedCategory === "all"
                ? "bg-[var(--accent-gold)] text-white shadow-md"
                : "bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] border border-[var(--border-color)]"
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
                    ? "bg-[var(--text-primary)] text-[var(--bg-card)] font-bold shadow-md"
                    : "bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] border border-[var(--border-color)]"
                }`}
              >
                <span>{cat.name}</span>
                <span className="text-[10px] opacity-70">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="card-elevated rounded-2xl p-12 text-center space-y-3">
          <Layers className="w-8 h-8 mx-auto text-[var(--text-muted)]" />
          <h3 className="font-serif-headline text-lg font-bold text-[var(--text-primary)]">No dispatches found</h3>
          <p className="text-xs text-[var(--text-muted)]">
            Try adjusting your search query or select another category desk.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="text-xs text-[var(--accent-gold)] hover:underline font-bold uppercase font-mono"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.slice(0, 6).map((article) => (
              <ArticleCard key={article.id} article={article} onQuickRead={onQuickRead} />
            ))}
          </div>

          {/* "The Big Read" — Magazine Feature */}
          {bigReadStory && selectedCategory === "all" && !searchQuery && (
            <div className="card-elevated rounded-3xl p-6 sm:p-10 relative overflow-hidden group border-[var(--accent-gold)]/20">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="gold-badge text-[10px] px-3 py-1 rounded">
                      ★ THE BIG READ
                    </span>
                    <span className="text-xs font-mono text-[var(--text-muted)]">
                      Deep-Dive Investigation &bull; {bigReadStory.readTimeMinutes} min read
                    </span>
                  </div>

                  <h3 className="font-serif-headline text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--text-primary)] leading-tight group-hover:text-[var(--accent-gold)] transition-colors">
                    <Link href={`/news/${bigReadStory.slug}`}>{bigReadStory.title}</Link>
                  </h3>

                  <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                    {bigReadStory.summary}
                  </p>

                  <div className="pull-quote text-xs sm:text-sm text-[var(--text-primary)] mt-2">
                    {bigReadStory.takeaway}
                  </div>

                  <div className="pt-3 flex items-center space-x-4">
                    <Link
                      href={`/news/${bigReadStory.slug}`}
                      className="bg-[var(--accent-gold)] hover:bg-[var(--accent-gold-hover)] text-white font-black text-xs uppercase px-5 py-2.5 rounded-lg flex items-center space-x-1.5 shadow-lg transition-transform active:scale-95"
                    >
                      <span>Read Feature Essay</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <button
                      onClick={() => onQuickRead(bigReadStory)}
                      className="text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-[var(--bg-secondary)] px-4 py-2.5 rounded-lg border border-[var(--border-color)] font-semibold flex items-center space-x-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                      <span>30s Brief</span>
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[var(--border-color)] shadow-xl">
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

          {/* Remaining Articles */}
          {filteredArticles.length > 6 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {filteredArticles.slice(6).map((article) => (
                <ArticleCard key={article.id} article={article} onQuickRead={onQuickRead} />
              ))}
            </div>
          )}

          <div className="pt-2">
            <AdContainer slotType="in-feed" />
          </div>
        </div>
      )}
    </section>
  );
}
