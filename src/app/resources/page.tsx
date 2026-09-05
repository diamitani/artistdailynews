"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Database,
  Download,
  Search,
  ExternalLink,
  Rss,
  Youtube,
  Tv,
  Layers,
  FileSpreadsheet,
  CheckCircle2,
  Copy,
  ChevronRight,
  Filter,
  Flame,
  Radio,
  Clock,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { TOP_100_PLATFORMS } from "@/lib/top100-platforms";
import { DAILY_ARTICLES_SHEET } from "@/lib/daily-articles-sheet";
import { DAILY_VIDEOS_SHEET } from "@/lib/daily-videos-sheet";
import { PlatformPillar, VideoQueryCategory } from "@/lib/types";

type ActiveTab = "platforms" | "articles" | "videos" | "schema";

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("platforms");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPillar, setSelectedPillar] = useState<string>("ALL");
  const [selectedTier, setSelectedTier] = useState<string>("ALL");
  const [selectedVideoQuery, setSelectedVideoQuery] = useState<string>("ALL");
  const [copiedSql, setCopiedSql] = useState(false);

  // Filter Top 100 Platforms
  const filteredPlatforms = TOP_100_PLATFORMS.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.editorialNotes && p.editorialNotes.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesPillar = selectedPillar === "ALL" || p.pillar === selectedPillar;
    const matchesTier = selectedTier === "ALL" || p.tier === selectedTier;
    return matchesSearch && matchesPillar && matchesTier;
  });

  // Filter Daily Articles
  const filteredArticles = DAILY_ARTICLES_SHEET.filter((a) => {
    const matchesSearch =
      a.articleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.platformName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.summaryDek.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  // Filter Daily Videos
  const filteredVideos = DAILY_VIDEOS_SHEET.filter((v) => {
    const matchesSearch =
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.channelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.keyTakeaway.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesQueryCategory =
      selectedVideoQuery === "ALL" || v.searchQueryCategory === selectedVideoQuery;
    return matchesSearch && matchesQueryCategory;
  });

  const handleCopySql = () => {
    const sqlText = `-- Supabase / PostgreSQL Schema for ADN Resources
CREATE TABLE IF NOT EXISTS adn_platforms (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  pillar TEXT NOT NULL,
  category TEXT NOT NULL,
  tier TEXT NOT NULL,
  website_url TEXT NOT NULL,
  rss_feed_url TEXT,
  youtube_channel_url TEXT,
  content_type TEXT NOT NULL,
  daily_post_frequency INT DEFAULT 1,
  scrape_status TEXT DEFAULT 'active',
  priority_rank INT NOT NULL,
  description TEXT NOT NULL,
  editorial_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS adn_daily_articles (
  id TEXT PRIMARY KEY,
  date_ingested DATE NOT NULL DEFAULT CURRENT_DATE,
  platform_id TEXT REFERENCES adn_platforms(id) ON DELETE SET NULL,
  platform_name TEXT NOT NULL,
  article_title TEXT NOT NULL,
  slug TEXT NOT NULL,
  original_url TEXT NOT NULL UNIQUE,
  author TEXT DEFAULT 'Staff Reporter',
  summary_dek TEXT NOT NULL,
  takeaway_bullets TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  read_time_minutes INT DEFAULT 3,
  status TEXT DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS adn_daily_videos (
  id TEXT PRIMARY KEY,
  date_ingested DATE NOT NULL DEFAULT CURRENT_DATE,
  youtube_video_id TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  channel_name TEXT NOT NULL,
  channel_handle TEXT,
  channel_url TEXT NOT NULL,
  search_query_category TEXT NOT NULL,
  duration TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  embed_url TEXT NOT NULL,
  video_url TEXT NOT NULL,
  published_date TIMESTAMPTZ NOT NULL,
  key_takeaway TEXT NOT NULL,
  views_estimate TEXT,
  status TEXT DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT NOW()
);`;
    navigator.clipboard.writeText(sqlText);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const pillars: PlatformPillar[] = [
    "Trade & Business Journalism",
    "Indie Strategy & D2C",
    "Streaming, Metadata & Rights",
    "Audio Engineering & Production",
    "Culture, Editorial & Discovery",
    "Podcasts & Video Channels",
  ];

  return (
    <div className="min-h-screen bg-[#07090e] text-[#e2e8f0] pb-24">
      {/* Top Breadcrumb & Status */}
      <div className="border-b border-[#1e293b]/70 bg-[#0c1017]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between text-xs text-[#94a3b8]">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-[#475569]" />
            <span className="text-[#00e599] font-mono font-medium">Resources & Ingestion Architecture</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#00e599]/10 text-[#00e599] border border-[#00e599]/20 font-mono text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00e599] animate-pulse"></span>
              Live Sync: 100 Platforms
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="border-b border-[#1e293b]/80 bg-gradient-to-b from-[#0f172a]/90 via-[#0a0f18] to-[#07090e] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1e293b]/80 border border-[#334155] text-xs font-mono text-[#00e599] uppercase tracking-wider mb-3">
                <Database className="w-3.5 h-3.5 text-[#00e599]" />
                Music Industry Resource Schema & Data Sheets
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Top 100 Platforms & Daily Ingestion Engine
              </h1>
              <p className="mt-2 text-sm sm:text-base text-[#94a3b8] max-w-3xl leading-relaxed">
                Structured database schema, verified RSS feeds, and ready-to-upload daily spreadsheets for 
                trade journalism, indie D2C, audio engineering, and verified YouTube intelligence.
              </p>
            </div>

            {/* Quick Export Actions */}
            <div className="flex flex-wrap gap-2.5 shrink-0">
              <a
                href="/exports/top100_platforms.csv"
                download="top100_platforms.csv"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#1e293b] hover:bg-[#334155] border border-[#334155] text-xs font-medium text-white transition-all shadow-sm hover:shadow"
              >
                <Download className="w-3.5 h-3.5 text-[#00e599]" />
                Export Top 100 CSV
              </a>
              <a
                href="/exports/daily_articles_sheet.csv"
                download="daily_articles_sheet.csv"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#1e293b] hover:bg-[#334155] border border-[#334155] text-xs font-medium text-white transition-all shadow-sm hover:shadow"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-[#38bdf8]" />
                Export Daily Articles CSV
              </a>
              <a
                href="/exports/daily_videos_sheet.csv"
                download="daily_videos_sheet.csv"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#1e293b] hover:bg-[#334155] border border-[#334155] text-xs font-medium text-white transition-all shadow-sm hover:shadow"
              >
                <Youtube className="w-3.5 h-3.5 text-[#f43f5e]" />
                Export Videos CSV
              </a>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            <div className="bg-[#0f172a]/60 border border-[#1e293b] rounded-xl p-4">
              <div className="text-xs text-[#94a3b8] uppercase tracking-wider font-mono">Top Platforms</div>
              <div className="text-2xl font-bold text-white mt-1">100 Active</div>
              <div className="text-[11px] text-[#00e599] mt-0.5">Across 6 Core Pillars</div>
            </div>
            <div className="bg-[#0f172a]/60 border border-[#1e293b] rounded-xl p-4">
              <div className="text-xs text-[#94a3b8] uppercase tracking-wider font-mono">Daily Articles Sheet</div>
              <div className="text-2xl font-bold text-[#38bdf8] mt-1">{DAILY_ARTICLES_SHEET.length} Staged</div>
              <div className="text-[11px] text-[#94a3b8] mt-0.5">With 3 Takeaway Bullets</div>
            </div>
            <div className="bg-[#0f172a]/60 border border-[#1e293b] rounded-xl p-4">
              <div className="text-xs text-[#94a3b8] uppercase tracking-wider font-mono">Verified Videos</div>
              <div className="text-2xl font-bold text-[#f43f5e] mt-1">{DAILY_VIDEOS_SHEET.length} Curated</div>
              <div className="text-[11px] text-[#94a3b8] mt-0.5">100% Real YouTube IDs</div>
            </div>
            <div className="bg-[#0f172a]/60 border border-[#1e293b] rounded-xl p-4">
              <div className="text-xs text-[#94a3b8] uppercase tracking-wider font-mono">Database Schema</div>
              <div className="text-2xl font-bold text-[#a78bfa] mt-1">Postgres / SQL</div>
              <div className="text-[11px] text-[#94a3b8] mt-0.5">RLS & Full Vector Index</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Navigation Tabs */}
        <div className="flex border-b border-[#1e293b] space-x-2 sm:space-x-4 overflow-x-auto pb-px">
          <button
            onClick={() => { setActiveTab("platforms"); setSearchQuery(""); }}
            className={`flex items-center gap-2 py-3 px-4 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "platforms"
                ? "border-[#00e599] text-[#00e599] bg-[#00e599]/5"
                : "border-transparent text-[#94a3b8] hover:text-white hover:border-[#475569]"
            }`}
          >
            <Layers className="w-4 h-4" />
            Top 100 Platforms Directory ({TOP_100_PLATFORMS.length})
          </button>
          <button
            onClick={() => { setActiveTab("articles"); setSearchQuery(""); }}
            className={`flex items-center gap-2 py-3 px-4 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "articles"
                ? "border-[#38bdf8] text-[#38bdf8] bg-[#38bdf8]/5"
                : "border-transparent text-[#94a3b8] hover:text-white hover:border-[#475569]"
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            Daily Article Ingestion Sheet ({DAILY_ARTICLES_SHEET.length})
          </button>
          <button
            onClick={() => { setActiveTab("videos"); setSearchQuery(""); }}
            className={`flex items-center gap-2 py-3 px-4 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "videos"
                ? "border-[#f43f5e] text-[#f43f5e] bg-[#f43f5e]/5"
                : "border-transparent text-[#94a3b8] hover:text-white hover:border-[#475569]"
            }`}
          >
            <Youtube className="w-4 h-4" />
            Daily YouTube Video Sheet ({DAILY_VIDEOS_SHEET.length})
          </button>
          <button
            onClick={() => setActiveTab("schema")}
            className={`flex items-center gap-2 py-3 px-4 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "schema"
                ? "border-[#a78bfa] text-[#a78bfa] bg-[#a78bfa]/5"
                : "border-transparent text-[#94a3b8] hover:text-white hover:border-[#475569]"
            }`}
          >
            <Database className="w-4 h-4" />
            SQL Schema & DDL
          </button>
        </div>

        {/* Search & Filter Bar (Shown for Table tabs) */}
        {activeTab !== "schema" && (
          <div className="bg-[#0f172a]/70 border border-[#1e293b] rounded-xl p-4 my-6 flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
              <input
                type="text"
                placeholder={
                  activeTab === "platforms"
                    ? "Search 100 platforms by name, pillar, or coverage..."
                    : activeTab === "articles"
                    ? "Search daily articles by title, platform, or topic..."
                    : "Search daily videos by title, channel, or query..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#07090e] border border-[#1e293b] rounded-lg text-xs sm:text-sm text-white placeholder-[#64748b] focus:outline-none focus:border-[#00e599] transition-colors"
              />
            </div>

            {/* Tab Specific Filter Dropdowns */}
            {activeTab === "platforms" && (
              <div className="flex flex-wrap items-center gap-2.5">
                <select
                  value={selectedPillar}
                  onChange={(e) => setSelectedPillar(e.target.value)}
                  className="bg-[#07090e] border border-[#1e293b] rounded-lg px-3 py-2 text-xs text-[#cbd5e1] focus:outline-none focus:border-[#00e599]"
                >
                  <option value="ALL">All 6 Pillars</option>
                  {pillars.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>

                <select
                  value={selectedTier}
                  onChange={(e) => setSelectedTier(e.target.value)}
                  className="bg-[#07090e] border border-[#1e293b] rounded-lg px-3 py-2 text-xs text-[#cbd5e1] focus:outline-none focus:border-[#00e599]"
                >
                  <option value="ALL">All Tiers</option>
                  <option value="tier1">Tier 1 (Authority)</option>
                  <option value="tier2">Tier 2 (Strategic)</option>
                  <option value="tier3">Tier 3 (Niche / Spec)</option>
                </select>
              </div>
            )}

            {activeTab === "videos" && (
              <div className="flex flex-wrap items-center gap-2.5">
                <select
                  value={selectedVideoQuery}
                  onChange={(e) => setSelectedVideoQuery(e.target.value)}
                  className="bg-[#07090e] border border-[#1e293b] rounded-lg px-3 py-2 text-xs text-[#cbd5e1] focus:outline-none focus:border-[#f43f5e]"
                >
                  <option value="ALL">All Search Queries</option>
                  <option value="music_business_news">Query: music business news</option>
                  <option value="music_industry_news">Query: music industry news</option>
                  <option value="music_podcasts">Query: music podcasts</option>
                  <option value="music_production_masterclasses">Query: music production masterclasses</option>
                </select>
              </div>
            )}
          </div>
        )}

        {/* ── TAB 1: TOP 100 PLATFORMS DIRECTORY ── */}
        {activeTab === "platforms" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-[#94a3b8]">
              <span>Showing <strong>{filteredPlatforms.length}</strong> of 100 platforms</span>
              <span className="font-mono text-[11px] text-[#64748b]">Ready for automated daily ingest & sync</span>
            </div>

            <div className="border border-[#1e293b] rounded-xl overflow-hidden bg-[#0c1017] shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0f172a] text-[#94a3b8] uppercase font-mono tracking-wider text-[11px] border-b border-[#1e293b]">
                    <tr>
                      <th className="py-3 px-3 w-12 text-center">Rank</th>
                      <th className="py-3 px-4">Platform Name</th>
                      <th className="py-3 px-3">Pillar</th>
                      <th className="py-3 px-3">Tier</th>
                      <th className="py-3 px-3">Format</th>
                      <th className="py-3 px-3">Daily Freq</th>
                      <th className="py-3 px-4">Description & Editorial Scope</th>
                      <th className="py-3 px-3 text-right">Endpoints</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1e293b]/60">
                    {filteredPlatforms.map((platform) => (
                      <tr key={platform.id} className="hover:bg-[#131b2c]/50 transition-colors">
                        <td className="py-3 px-3 text-center font-mono font-semibold text-[#00e599]">
                          #{platform.priorityRank}
                        </td>
                        <td className="py-3 px-4 font-medium text-white">
                          <div className="flex items-center gap-2">
                            <span>{platform.name}</span>
                            <span className="text-[10px] text-[#64748b] font-mono">({platform.slug})</span>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#1e293b] text-[#cbd5e1] border border-[#334155]">
                            {platform.pillar}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                            platform.tier === "tier1"
                              ? "bg-[#00e599]/15 text-[#00e599] border border-[#00e599]/30"
                              : platform.tier === "tier2"
                              ? "bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/30"
                              : "bg-[#94a3b8]/15 text-[#94a3b8] border border-[#94a3b8]/30"
                          }`}>
                            {platform.tier.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-[#94a3b8] font-mono text-[11px]">
                          {platform.contentType}
                        </td>
                        <td className="py-3 px-3 font-mono text-center text-[#e2e8f0]">
                          ~{platform.dailyPostFrequency}/day
                        </td>
                        <td className="py-3 px-4 text-[#94a3b8] max-w-xs sm:max-w-md">
                          <p className="line-clamp-2">{platform.description}</p>
                          {platform.editorialNotes && (
                            <p className="text-[11px] text-[#00e599]/80 mt-1 line-clamp-1">
                              <strong>Scope:</strong> {platform.editorialNotes}
                            </p>
                          )}
                        </td>
                        <td className="py-3 px-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {platform.rssFeedUrl && (
                              <a
                                href={platform.rssFeedUrl}
                                target="_blank"
                                rel="noreferrer"
                                title="Open RSS Feed XML"
                                className="p-1.5 rounded bg-[#1e293b] hover:bg-[#f97316]/20 text-[#f97316] hover:border-[#f97316]/40 border border-transparent transition-colors"
                              >
                                <Rss className="w-3.5 h-3.5" />
                              </a>
                            )}
                            {platform.youtubeChannelUrl && (
                              <a
                                href={platform.youtubeChannelUrl}
                                target="_blank"
                                rel="noreferrer"
                                title="Open YouTube Channel"
                                className="p-1.5 rounded bg-[#1e293b] hover:bg-[#f43f5e]/20 text-[#f43f5e] hover:border-[#f43f5e]/40 border border-transparent transition-colors"
                              >
                                <Youtube className="w-3.5 h-3.5" />
                              </a>
                            )}
                            <a
                              href={platform.websiteUrl}
                              target="_blank"
                              rel="noreferrer"
                              title="Visit Platform Website"
                              className="p-1.5 rounded bg-[#1e293b] hover:bg-[#38bdf8]/20 text-[#38bdf8] hover:border-[#38bdf8]/40 border border-transparent transition-colors"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 2: DAILY ARTICLE INGESTION SHEET ── */}
        {activeTab === "articles" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-[#94a3b8]">
              <span>Showing <strong>{filteredArticles.length}</strong> daily ingestion items for today</span>
              <a
                href="/exports/daily_articles_sheet.csv"
                download="daily_articles_sheet.csv"
                className="font-mono text-[11px] text-[#38bdf8] hover:underline flex items-center gap-1"
              >
                <Download className="w-3 h-3" /> Download Daily Ingest Sheet (.CSV)
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredArticles.map((article) => (
                <div
                  key={article.articleId}
                  className="bg-[#0c1017] border border-[#1e293b] rounded-xl p-5 hover:border-[#38bdf8]/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="px-2.5 py-0.5 rounded bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/20 font-mono text-[11px] font-semibold">
                        {article.platformName}
                      </span>
                      <span className="text-[11px] font-mono text-[#64748b]">
                        ID: {article.articleId}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white hover:text-[#38bdf8] transition-colors leading-snug">
                      <a href={article.originalUrl} target="_blank" rel="noreferrer">
                        {article.articleTitle}
                      </a>
                    </h3>

                    <p className="text-xs text-[#94a3b8] mt-2 leading-relaxed">
                      {article.summaryDek}
                    </p>

                    {/* 3 Structured Takeaway Bullets */}
                    <div className="mt-4 p-3.5 rounded-lg bg-[#07090e] border border-[#1e293b]/80 space-y-1.5">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-[#00e599] font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3" /> Actionable Takeaways (Daily Ingest Bullets)
                      </div>
                      <ul className="text-xs text-[#cbd5e1] space-y-1 pl-1 list-disc list-inside">
                        <li>{article.takeawayBullet1}</li>
                        <li>{article.takeawayBullet2}</li>
                        <li>{article.takeawayBullet3}</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#1e293b] flex items-center justify-between text-xs text-[#64748b]">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] text-[#94a3b8]">By {article.author}</span>
                      <span>•</span>
                      <span className="font-mono text-[11px]">{article.readTimeMinutes} min read</span>
                    </div>
                    <a
                      href={article.originalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[#38bdf8] hover:text-white font-medium transition-colors"
                    >
                      Original Source <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 3: DAILY YOUTUBE VIDEO INGESTION SHEET ── */}
        {activeTab === "videos" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs text-[#94a3b8]">
              <span>Showing <strong>{filteredVideos.length}</strong> verified YouTube intelligence videos</span>
              <a
                href="/exports/daily_videos_sheet.csv"
                download="daily_videos_sheet.csv"
                className="font-mono text-[11px] text-[#f43f5e] hover:underline flex items-center gap-1"
              >
                <Download className="w-3 h-3" /> Download Daily Video Sheet (.CSV)
              </a>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredVideos.map((video) => (
                <div
                  key={video.videoId}
                  className="bg-[#0c1017] border border-[#1e293b] rounded-xl overflow-hidden hover:border-[#f43f5e]/50 transition-all flex flex-col justify-between"
                >
                  {/* Verified Video Embed Player */}
                  <div className="aspect-video w-full bg-black relative">
                    <iframe
                      src={video.embedUrl}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded bg-[#f43f5e]/15 text-[#f43f5e] border border-[#f43f5e]/30 font-mono text-[11px] font-semibold">
                          {video.searchQueryCategory.replace(/_/g, " ").toUpperCase()}
                        </span>
                        <span className="text-[11px] font-mono text-[#64748b]">
                          YT ID: <strong className="text-white">{video.youtubeVideoId}</strong>
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white leading-snug">
                        {video.title}
                      </h3>

                      <div className="flex items-center gap-2 mt-2 text-xs text-[#94a3b8]">
                        <span className="font-semibold text-white">{video.channelName}</span>
                        <span>•</span>
                        <span className="font-mono">{video.duration}</span>
                        <span>•</span>
                        <span className="font-mono text-[#00e599]">{video.viewsEstimate}</span>
                      </div>

                      <div className="mt-3.5 p-3 rounded-lg bg-[#07090e] border border-[#1e293b]">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-[#38bdf8] font-semibold mb-1">
                          Key Intelligence Takeaway:
                        </div>
                        <p className="text-xs text-[#cbd5e1] leading-relaxed">
                          {video.keyTakeaway}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#1e293b] flex items-center justify-between text-xs">
                      <a
                        href={video.channelUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#94a3b8] hover:text-white transition-colors"
                      >
                        Visit {video.channelHandle}
                      </a>
                      <a
                        href={video.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f43f5e]/10 hover:bg-[#f43f5e] text-[#f43f5e] hover:text-white border border-[#f43f5e]/30 transition-all font-medium"
                      >
                        <Youtube className="w-3.5 h-3.5" /> Watch on YouTube
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 4: SQL SCHEMA & DDL ── */}
        {activeTab === "schema" && (
          <div className="space-y-6">
            <div className="bg-[#0c1017] border border-[#1e293b] rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    PostgreSQL / Supabase Table Schemas
                  </h3>
                  <p className="text-xs text-[#94a3b8] mt-1">
                    Execute in your Supabase SQL editor or Postgres shell to establish the resource directory and daily upload tables.
                  </p>
                </div>
                <button
                  onClick={handleCopySql}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#00e599] hover:bg-[#00c985] text-black font-semibold text-xs transition-all shadow"
                >
                  {copiedSql ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" /> Copied DDL!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy SQL DDL
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 bg-[#07090e] border border-[#1e293b] rounded-lg text-xs font-mono text-[#00e599] overflow-x-auto leading-relaxed">
{`-- ============================================================
-- TOP 100 PLATFORMS & RESOURCE DIRECTORY TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS adn_platforms (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  pillar TEXT NOT NULL CHECK (pillar IN (
    'Trade & Business Journalism',
    'Indie Strategy & D2C',
    'Streaming, Metadata & Rights',
    'Audio Engineering & Production',
    'Culture, Editorial & Discovery',
    'Podcasts & Video Channels'
  )),
  category TEXT NOT NULL CHECK (category IN (
    'financial', 'streaming', 'tech-ai', 'marketing', 'legal', 'podcasts', 'tutorials', 'opportunities', 'social'
  )),
  tier TEXT NOT NULL CHECK (tier IN ('tier1', 'tier2', 'tier3')),
  website_url TEXT NOT NULL,
  rss_feed_url TEXT,
  youtube_channel_url TEXT,
  youtube_channel_id TEXT,
  content_type TEXT NOT NULL CHECK (content_type IN ('Articles', 'Podcasts', 'Videos', 'Multi-Format', 'Research & Data')),
  daily_post_frequency INT DEFAULT 1,
  scrape_status TEXT DEFAULT 'active' CHECK (scrape_status IN ('active', 'manual', 'partner', 'paused')),
  priority_rank INT NOT NULL,
  description TEXT NOT NULL,
  editorial_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_adn_platforms_pillar ON adn_platforms(pillar);
CREATE INDEX IF NOT EXISTS idx_adn_platforms_priority ON adn_platforms(priority_rank);

-- ============================================================
-- DAILY ARTICLES INGESTION TABLE (READY FOR DAILY UPLOAD)
-- ============================================================
CREATE TABLE IF NOT EXISTS adn_daily_articles (
  id TEXT PRIMARY KEY,
  date_ingested DATE NOT NULL DEFAULT CURRENT_DATE,
  platform_id TEXT REFERENCES adn_platforms(id) ON DELETE SET NULL,
  platform_name TEXT NOT NULL,
  article_title TEXT NOT NULL,
  slug TEXT NOT NULL,
  original_url TEXT NOT NULL UNIQUE,
  author TEXT DEFAULT 'Staff Reporter',
  summary_dek TEXT NOT NULL,
  takeaway_bullets TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  read_time_minutes INT DEFAULT 3,
  status TEXT DEFAULT 'published' CHECK (status IN ('published', 'staged', 'draft', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_daily_articles_date ON adn_daily_articles(date_ingested);
CREATE INDEX IF NOT EXISTS idx_daily_articles_platform ON adn_daily_articles(platform_id);

-- ============================================================
-- DAILY YOUTUBE VIDEOS INGESTION TABLE (100% VERIFIED)
-- ============================================================
CREATE TABLE IF NOT EXISTS adn_daily_videos (
  id TEXT PRIMARY KEY,
  date_ingested DATE NOT NULL DEFAULT CURRENT_DATE,
  youtube_video_id TEXT NOT NULL UNIQUE, -- 11 char exact verified ID
  title TEXT NOT NULL,
  channel_name TEXT NOT NULL,
  channel_handle TEXT,
  channel_url TEXT NOT NULL,
  search_query_category TEXT NOT NULL CHECK (search_query_category IN (
    'music_business_news',
    'music_industry_news',
    'music_podcasts',
    'music_production_masterclasses',
    'artist_interviews',
    'streaming_analytics'
  )),
  duration TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  embed_url TEXT NOT NULL,
  video_url TEXT NOT NULL,
  published_date TIMESTAMPTZ NOT NULL,
  key_takeaway TEXT NOT NULL,
  views_estimate TEXT,
  status TEXT DEFAULT 'published' CHECK (status IN ('published', 'staged', 'draft')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_daily_videos_date ON adn_daily_videos(date_ingested);
CREATE INDEX IF NOT EXISTS idx_daily_videos_query ON adn_daily_videos(search_query_category);`}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
