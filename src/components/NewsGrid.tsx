"use client";

import { useState, useMemo } from "react";
import { Article, CategoryType } from "@/lib/types";
import { CATEGORIES } from "@/lib/feeds-config";
import { ArticleCard } from "./ArticleCard";
import { AdContainer } from "./AdContainer";
import { Search, BookOpen, ArrowRight, Layers, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface NewsGridProps {
  initialArticles: Article[];
  onQuickRead: (article: Article) => void;
  defaultCategory?: CategoryType | "all";
}

const ARTICLES_PER_PAGE = 12;

export function NewsGrid({ initialArticles, onQuickRead, defaultCategory = "all" }: NewsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | "all">(defaultCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"latest" | "breaking">("latest");
  const [currentPage, setCurrentPage] = useState(1);

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

    // Reset to page 1 when filters change
    setCurrentPage(1);

    return list;
  }, [initialArticles, selectedCategory, searchQuery, sortBy]);

  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const bigReadStory = initialArticles.find((a) => a.category === "financial" && !a.isFeatured) || initialArticles[1];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Category Pills & Filters */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-4">
          
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[var(--accent-primary)] uppercase tracking-wider mb-0.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>THE DAILY INTELLIGENCE WIRE</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)] flex items-center">
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
                className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] focus:border-[var(--accent-primary)] rounded-xl pl-9 pr-3 py-2 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none transition-colors"
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
              className="bg-[var(--bg-card)] border border-[var(--border-color)] text-xs text-[var(--text-secondary)] rounded-xl px-3 py-2 focus:outline-none focus:border-[var(--accent-primary)] font-mono"
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
                ? "bg-[var(--accent-primary)] text-white shadow-sm"
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
                    ? "bg-[var(--text-primary)] text-white font-bold shadow-sm"
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
        <div className="card-brand p-12 text-center space-y-3">
          <Layers className="w-8 h-8 mx-auto text-[var(--text-muted)]" />
          <h3 className="font-serif text-lg font-bold text-[var(--text-primary)]">No dispatches found</h3>
          <p className="text-xs text-[var(--text-muted)]">
            Try adjusting your search query or select another category desk.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="text-xs text-[var(--accent-primary)] hover:underline font-bold uppercase font-mono"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedArticles.map((article) => (
              <ArticleCard key={article.id} article={article} onQuickRead={onQuickRead} />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2 pt-8 border-t border-[var(--border-color)]">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  // Show first page, last page, current page, and pages around current
                  const showPage =
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1);

                  const showEllipsis =
                    (page === currentPage - 2 && currentPage > 3) ||
                    (page === currentPage + 2 && currentPage < totalPages - 2);

                  if (showEllipsis) {
                    return (
                      <span key={page} className="px-2 text-[var(--text-muted)]">
                        ...
                      </span>
                    );
                  }

                  if (!showPage) return null;

                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`min-w-[36px] h-9 px-3 rounded-lg font-mono text-sm transition-colors ${
                        currentPage === page
                          ? "bg-[var(--accent-primary)] text-white font-bold"
                          : "border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Page Info */}
          {filteredArticles.length > 0 && (
            <div className="text-center text-xs font-mono text-[var(--text-muted)]">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredArticles.length)} of {filteredArticles.length} articles
            </div>
          )}
        </div>
      )}
    </section>
  );
}
