"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Article } from "@/lib/types";
import { formatTimeAgo } from "@/lib/utils";
import { 
  Globe, 
  ExternalLink, 
  ArrowUpRight, 
  Sparkles, 
  Clock, 
  Layers
} from "lucide-react";

interface NewsByPlatformSectionProps {
  articles: Article[];
  onQuickRead?: (article: Article) => void;
}

interface PlatformDefinition {
  id: string;
  name: string;
  category: string;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
  accentColor: string;
  description: string;
  url: string;
  matches: (article: Article) => boolean;
}

const PLATFORMS: PlatformDefinition[] = [
  {
    id: "all",
    name: "All Platforms",
    category: "Aggregated",
    badgeBg: "bg-[var(--accent-primary)]/10",
    badgeText: "text-[var(--accent-primary)]",
    borderColor: "border-[var(--accent-primary)]/30",
    accentColor: "var(--accent-primary)",
    description: "Real-time dispatches aggregated from 50+ music industry trade publications and verified creator communities.",
    url: "https://artistdailynews.com",
    matches: () => true,
  },
  {
    id: "mbw",
    name: "Music Business Worldwide",
    category: "Industry Finance",
    badgeBg: "bg-emerald-500/10",
    badgeText: "text-emerald-400",
    borderColor: "border-emerald-500/30",
    accentColor: "#10B981",
    description: "The global authority on record label revenue, streaming economics, catalog valuations, and executive shifts.",
    url: "https://musicbusinessworldwide.com",
    matches: (a) => a.sourceName.toLowerCase().includes("music business") || a.sourceName.toLowerCase().includes("mbw"),
  },
  {
    id: "billboard",
    name: "Billboard Pro",
    category: "Charts & Business",
    badgeBg: "bg-blue-500/10",
    badgeText: "text-blue-400",
    borderColor: "border-blue-500/30",
    accentColor: "#3B82F6",
    description: "Official chart analytics, DSP algorithm updates, festival economics, and major publishing agreements.",
    url: "https://billboard.com/business",
    matches: (a) => a.sourceName.toLowerCase().includes("billboard"),
  },
  {
    id: "pitchfork",
    name: "Pitchfork",
    category: "Reviews & Culture",
    badgeBg: "bg-rose-500/10",
    badgeText: "text-rose-400",
    borderColor: "border-rose-500/30",
    accentColor: "#F43F5E",
    description: "Critical album reviews, rising indie artist features, festival dispatch photography, and trend analysis.",
    url: "https://pitchfork.com",
    matches: (a) => a.sourceName.toLowerCase().includes("pitchfork"),
  },
  {
    id: "djmag",
    name: "DJ Mag",
    category: "Electronic & Club",
    badgeBg: "bg-purple-500/10",
    badgeText: "text-purple-400",
    borderColor: "border-purple-500/30",
    accentColor: "#A855F7",
    description: "Electronic music culture, club sound systems, DJ gear reviews, and underground festival dispatches.",
    url: "https://djmag.com",
    matches: (a) => a.sourceName.toLowerCase().includes("dj mag") || a.sourceName.toLowerCase().includes("djmag"),
  },
  {
    id: "bandcamp",
    name: "Bandcamp Daily",
    category: "Indie Direct-to-Fan",
    badgeBg: "bg-cyan-500/10",
    badgeText: "text-cyan-400",
    borderColor: "border-cyan-500/30",
    accentColor: "#06B6D4",
    description: "Deep-dive underground releases, global vinyl culture, DIY community highlights, and Bandcamp Friday reports.",
    url: "https://daily.bandcamp.com",
    matches: (a) => a.sourceName.toLowerCase().includes("bandcamp"),
  },
  {
    id: "soundonsound",
    name: "Sound on Sound",
    category: "Production & Engineering",
    badgeBg: "bg-amber-500/10",
    badgeText: "text-amber-400",
    borderColor: "border-amber-500/30",
    accentColor: "#F59E0B",
    description: "High-end recording techniques, DAW mastering guides, analog mixing gear tests, and acoustic optimization.",
    url: "https://soundonsound.com",
    matches: (a) => a.sourceName.toLowerCase().includes("sound on sound") || a.sourceName.toLowerCase().includes("soundonsound"),
  },
  {
    id: "reddit",
    name: "Reddit / Communities",
    category: "Grassroots Discussions",
    badgeBg: "bg-orange-500/10",
    badgeText: "text-orange-400",
    borderColor: "border-orange-500/30",
    accentColor: "#FF5722",
    description: "Unfiltered discussions from r/WeAreTheMusicMakers, r/musicproduction, and independent creator forums.",
    url: "https://reddit.com/r/WeAreTheMusicMakers",
    matches: (a) => a.sourceName.toLowerCase().includes("reddit") || a.sourceName.toLowerCase().includes("community"),
  },
];

export function NewsByPlatformSection({ articles, onQuickRead }: NewsByPlatformSectionProps) {
  const [selectedPlatformId, setSelectedPlatformId] = useState<string>("all");

  const selectedPlatform = useMemo(() => {
    return PLATFORMS.find((p) => p.id === selectedPlatformId) || PLATFORMS[0];
  }, [selectedPlatformId]);

  const filteredArticles = useMemo(() => {
    if (selectedPlatform.id === "all") {
      return articles.slice(0, 12);
    }
    const matched = articles.filter(selectedPlatform.matches);
    return matched.length > 0 ? matched.slice(0, 12) : articles.slice(0, 9);
  }, [articles, selectedPlatform]);

  const countsByPlatform = useMemo(() => {
    const counts: Record<string, number> = {};
    PLATFORMS.forEach((p) => {
      if (p.id === "all") {
        counts[p.id] = articles.length;
      } else {
        counts[p.id] = articles.filter(p.matches).length;
      }
    });
    return counts;
  }, [articles]);

  return (
    <section className="py-12 border-t border-[var(--border-color)]">
      <div className="space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[var(--accent-primary)] uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>Publisher & Platform Intelligence Directory</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight">
              News by Platform
            </h2>
            <p className="text-sm text-[var(--text-secondary)] max-w-2xl">
              Filter industry intelligence by your preferred publication, trade desk, or creator forum.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <a
              href={selectedPlatform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-mono font-bold bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-highlight)] transition-colors"
            >
              <span>Visit {selectedPlatform.name}</span>
              <ExternalLink className="w-3 h-3 text-[var(--text-muted)]" />
            </a>
          </div>
        </div>

        {/* Platform Filter Tabs (Horizontal Scrollable on Mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {PLATFORMS.map((platform) => {
            const isSelected = platform.id === selectedPlatformId;
            const count = countsByPlatform[platform.id] || 0;
            return (
              <button
                key={platform.id}
                onClick={() => setSelectedPlatformId(platform.id)}
                className={`group flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all border shrink-0 ${
                  isSelected
                    ? "bg-[var(--bg-card)] border-[var(--border-highlight)] text-[var(--text-primary)] shadow-sm ring-1 ring-[var(--border-highlight)]"
                    : "bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border-color)]"
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full transition-transform group-hover:scale-125"
                  style={{ backgroundColor: platform.accentColor }}
                />
                <span>{platform.name}</span>
                {count > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isSelected
                        ? "bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]"
                        : "bg-[var(--bg-primary)] text-[var(--text-muted)]"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Platform Summary Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center space-x-3.5">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm shrink-0 border"
              style={{ 
                backgroundColor: `${selectedPlatform.accentColor}15`, 
                borderColor: `${selectedPlatform.accentColor}40`,
                color: selectedPlatform.accentColor 
              }}
            >
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-sm text-[var(--text-primary)]">{selectedPlatform.name}</span>
                <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${selectedPlatform.badgeBg} ${selectedPlatform.badgeText} ${selectedPlatform.borderColor}`}>
                  {selectedPlatform.category}
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5 max-w-2xl">
                {selectedPlatform.description}
              </p>
            </div>
          </div>

          <div className="text-[11px] font-mono text-[var(--text-muted)] shrink-0 flex items-center space-x-2 self-end sm:self-center">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-emerald)] live-pulse"></span>
            <span>Feed Active &bull; Ingested hourly</span>
          </div>
        </div>

        {/* Articles Grid for Selected Platform */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, idx) => (
            <article
              key={article.id || idx}
              className="group card-brand p-5 flex flex-col justify-between hover:shadow-md hover:border-[var(--border-highlight)] transition-all duration-300"
            >
              <div className="space-y-3">
                {/* Header Meta */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <span 
                    className="font-bold uppercase tracking-wider text-[10px] px-2 py-0.5 rounded border"
                    style={{ 
                      color: selectedPlatform.accentColor,
                      borderColor: `${selectedPlatform.accentColor}30`,
                      backgroundColor: `${selectedPlatform.accentColor}10` 
                    }}
                  >
                    {article.sourceName || selectedPlatform.name}
                  </span>
                  <span className="text-[var(--text-muted)] flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {formatTimeAgo(article.publishedAt)}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif font-bold text-base sm:text-lg text-[var(--text-primary)] leading-snug group-hover:text-[var(--accent-primary)] transition-colors line-clamp-2">
                  <a href={article.originalUrl} target="_blank" rel="noopener noreferrer">
                    {article.title}
                  </a>
                </h3>

                {/* Summary */}
                <p className="text-xs text-[var(--text-secondary)] line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-[var(--border-color)] flex items-center justify-between">
                {onQuickRead ? (
                  <button
                    onClick={() => onQuickRead(article)}
                    className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-[var(--accent-primary)] hover:underline"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>30s Briefing</span>
                  </button>
                ) : (
                  <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">
                    {article.category} Desk
                  </span>
                )}

                <Link
                  href={`/news/${article.slug}`}
                  className="inline-flex items-center space-x-1 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                >
                  <span>Full Story</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="text-center pt-2">
          <Link
            href="/news"
            className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent-primary)] hover:text-[var(--accent-primary-hover)] transition-colors"
          >
            <span>Browse All 2,000+ Ingested Articles in Chronological Wire</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
