"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { MOCK_ARTICLES, MOCK_PODCASTS } from "@/lib/mock-articles";
import { CATEGORIES, SPONSORSHIP_PACKAGES } from "@/lib/feeds-config";
import { Search, Sparkles, Ticket, Calculator, Radio, Newspaper, ArrowRight, X, Compass, ExternalLink } from "lucide-react";

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandMenu({ isOpen, onClose }: CommandMenuProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        isOpen ? onClose() : (setQuery(""), setSelectedIndex(0));
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Quick Action Shortcuts
  const quickActions = [
    { title: "ADN Music Business AI Copilot", icon: Sparkles, href: "/chat", category: "AI Assistant" },
    { title: "Artispreneur Partner Deals & Discounts", icon: Sparkles, href: "/network", category: "Deals" },
    { title: "YouTube Video Masterclasses & Essays", icon: Sparkles, href: "/podcasts", category: "Video Desk" },
    { title: "Apply for Official Press Pass", icon: Ticket, href: "/press-pass", category: "Credentials" },
    { title: "VIP Pro Membership Plans", icon: Sparkles, href: "/pricing", category: "Memberships" },
    { title: "Music Business Podcasts", icon: Radio, href: "/podcasts", category: "Audio Hub" },
    { title: "Daily Newsletter Archives", icon: Newspaper, href: "/newsletters", category: "Dispatches" },
    { title: "Advertise / Media Kit & Rate Card", icon: Sparkles, href: "/advertise", category: "Sponsorship" },
    { title: "Creator Dashboard & Saved Briefings", icon: Compass, href: "/dashboard", category: "Account" },
    { title: "Subscription & Billing Portal", icon: Compass, href: "/billing", category: "Account" },
    { title: "AI Newsroom Command Studio", icon: Compass, href: "/admin/newsdesk", category: "Admin" },
  ];

  const searchResults = useMemo(() => {
    if (!query.trim()) {
      return {
        actions: quickActions,
        categories: CATEGORIES,
        articles: MOCK_ARTICLES.slice(0, 4),
      };
    }

    const q = query.toLowerCase();

    const filteredActions = quickActions.filter((a) =>
      a.title.toLowerCase().includes(q) || a.category.toLowerCase().includes(q)
    );

    const filteredCategories = CATEGORIES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
    );

    const filteredArticles = MOCK_ARTICLES.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.sourceName.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
    );

    return {
      actions: filteredActions,
      categories: filteredCategories,
      articles: filteredArticles,
    };
  }, [query]);

  const handleSelect = (href: string) => {
    onClose();
    router.push(href);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="w-full max-w-2xl bg-[#0F111B] border border-[#2B2F44] rounded-2xl shadow-2xl overflow-hidden relative z-10 animate-scaleUp">
        
        {/* Search Bar Input */}
        <div className="p-4 border-b border-slate-800 flex items-center space-x-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search news, platforms, video masterclasses, press passes, topics..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-slate-500 hover:text-white p-1">
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="bg-slate-800 text-slate-400 font-mono text-[10px] px-2 py-0.5 rounded border border-slate-700 hidden sm:inline">
            ESC to close
          </span>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-5 divide-y divide-slate-800/60">
          
          {/* Quick Actions & Tools */}
          {searchResults.actions.length > 0 && (
            <div className="space-y-1.5 pt-3 first:pt-0">
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 px-2">
                Quick Shortcuts & Tools
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {searchResults.actions.map((act) => {
                  const Icon = act.icon;
                  return (
                    <button
                      key={act.title}
                      onClick={() => handleSelect(act.href)}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800/80 flex items-center space-x-3 group transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#D4FF00]/10 border border-[#D4FF00]/20 flex items-center justify-center text-[#D4FF00] shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white group-hover:text-[#D4FF00] transition-colors truncate">
                          {act.title}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">{act.category}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Topics & Channels */}
          {searchResults.categories.length > 0 && (
            <div className="space-y-1.5 pt-3">
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 px-2">
                Channels & Topics
              </div>
              <div className="flex flex-wrap gap-2 px-2">
                {searchResults.categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleSelect(`/topics/${cat.slug}`)}
                    className="px-3 py-1.5 bg-[#161826] hover:bg-slate-800 text-xs font-mono text-slate-300 hover:text-white rounded-lg border border-slate-800 transition-colors"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Articles Matching Search */}
          {searchResults.articles.length > 0 && (
            <div className="space-y-2 pt-3">
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 px-2">
                Intelligence Dispatches
              </div>
              <div className="space-y-1">
                {searchResults.articles.map((art) => (
                  <button
                    key={art.id}
                    onClick={() => handleSelect(`/news/${art.slug}`)}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800/80 flex items-start space-x-3 group transition-colors"
                  >
                    <div className="w-12 h-12 rounded-lg bg-slate-900 overflow-hidden shrink-0 border border-slate-800">
                      <img src={art.imageUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-400">
                        <span className="text-[#D4FF00] font-bold uppercase">{art.category}</span>
                        <span>&bull;</span>
                        <span>{art.sourceName}</span>
                      </div>
                      <div className="text-xs font-bold text-white group-hover:text-[#D4FF00] transition-colors line-clamp-1 mt-0.5">
                        {art.title}
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {art.summary}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer info */}
        <div className="p-3 bg-[#0A0B10] border-t border-slate-800 text-[11px] font-mono text-slate-500 flex items-center justify-between px-4">
          <span>Tip: Press <strong>Cmd + K</strong> anytime</span>
          <span>Artist Daily News Engine</span>
        </div>

      </div>
    </div>
  );
}
