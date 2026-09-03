import React from 'react';
import { getArticles, getLatestIssue } from '@/lib/adn-db';
import { MOCK_PODCASTS, MOCK_VIDEOS } from '@/lib/mock-articles';
import { CURATED_MEDIA_CHANNELS } from '@/lib/media-channels';
import { Article, CategoryType } from '@/lib/types';
import Link from 'next/link';
import { BreakingTicker } from '@/components/BreakingTicker';
import { NewsByPlatformSection } from '@/components/NewsByPlatformSection';
import { VideoGallerySection } from '@/components/VideoGallerySection';
import { PodcastPlayer } from '@/components/PodcastPlayer';
import {
  ArrowRight,
  Sparkles,
  Clock,
  TrendingUp,
  Mic2,
  ChevronRight,
  Mail,
  Play,
  ExternalLink,
  ShieldCheck,
  Layers,
  Radio,
  Tv,
  ArrowUpRight,
  Flame,
  Globe,
  Newspaper,
  Compass,
  Award,
  Zap,
  CheckCircle2,
  Sliders,
  Bookmark,
  FileText
} from 'lucide-react';

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function ExecutiveTextAggregatorHomepage() {
  const [rawArticles, issue] = await Promise.all([
    getArticles(150),
    getLatestIssue()
  ]);

  // Normalize articles to Article type
  const articles: Article[] = rawArticles.map((item, idx) => ({
    id: item.id || `art-${idx}`,
    title: item.title,
    slug: item.slug || item.id || `article-${idx}`,
    summary: item.dek || item.summary || item.why_it_matters || "",
    bullets: item.bullets || [
      "Key strategic takeaway for self-releasing artists and catalogue owners.",
      "Direct verification of metadata, distributor timing, and audience momentum.",
      "Actionable release checklist to maintain independent leverage."
    ],
    takeaway: item.takeaway || item.why_it_matters || "Review distribution splits and verify direct-to-fan delivery schedules.",
    content: item.content || item.why_it_matters || item.dek || "",
    category: (item.category as CategoryType) || (item.pillar === 'business' ? 'financial' : item.pillar === 'culture' ? 'streaming' : 'tech-ai'),
    sourceName: item.source_name || item.platform || "Industry Wire",
    sourceUrl: item.url || "#",
    originalUrl: item.url || "#",
    imageUrl: item.image_url || "",
    publishedAt: item.freshness || item.published_at || new Date().toISOString(),
    readTimeMinutes: item.read_time_minutes || 3,
    isBreaking: item.is_breaking || idx < 3,
    tags: item.tags || [item.pillar || "Music"],
  }));

  // Organize content by pillar / topic
  const businessArticles = articles.filter(a => (a as any).pillar === 'business' || a.category === 'financial' || a.category === 'legal');
  const cultureArticles = articles.filter(a => (a as any).pillar === 'culture' || a.category === 'streaming' || a.category === 'marketing');
  const techAndCommunityArticles = articles.filter(a => (a as any).pillar === 'social' || a.category === 'social' || a.category === 'tutorials' || a.category === 'tech-ai');

  // Hero section dispatches
  const featuredStory = issue?.lead_item || articles[0];
  const secondaryLeadStories = articles.slice(1, 4);
  const fastWireStories = articles.slice(4, 18); // 14 fast wire stories

  // Core Editorial Desk articles (10 each = 30 articles)
  const businessDesk = businessArticles.length >= 10 ? businessArticles.slice(0, 10) : articles.slice(18, 28);
  const cultureDesk = cultureArticles.length >= 10 ? cultureArticles.slice(0, 10) : articles.slice(28, 38);
  const techDesk = techAndCommunityArticles.length >= 10 ? techAndCommunityArticles.slice(0, 10) : articles.slice(38, 48);

  // Latest continuous wire stream (24 additional articles)
  const continuousStream = articles.slice(48, 72);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="min-h-[100dvh] bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[var(--accent-primary)] selection:text-white">
      {/* Texture Overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Breaking News Marquee */}
      <BreakingTicker articles={articles.slice(0, 15)} />

      {/* ── EXECUTIVE BROADSHEET MASTHEAD ── */}
      <div className="border-b-2 border-[var(--text-primary)] bg-[var(--bg-card)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          
          {/* Top Dateline & Telemetry */}
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[var(--border-color)] pb-3 gap-2 font-mono text-[11px] text-[var(--text-muted)]">
            <div className="flex items-center space-x-3">
              <span className="font-bold text-[var(--text-primary)] uppercase tracking-wider">
                {currentDate}
              </span>
              <span>&bull;</span>
              <span>GLOBAL EDITION &bull; CONTINUOUS WIRE</span>
              <span>&bull;</span>
              <span className="text-[var(--accent-primary)] font-bold flex items-center">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] live-pulse mr-1.5" />
                50+ OUTLETS SYNCED
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <span>NYC <strong className="text-[var(--text-primary)]">09:15</strong></span>
              <span>LDN <strong className="text-[var(--text-primary)]">14:15</strong></span>
              <span>LA <strong className="text-[var(--text-primary)]">06:15</strong></span>
              <span>TYO <strong className="text-[var(--text-primary)]">22:15</strong></span>
            </div>
          </div>

          {/* Large Broadsheet Title Lockup */}
          <div className="py-6 text-center space-y-2">
            <div className="inline-flex items-center justify-center space-x-2 text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-[var(--accent-primary)] mb-1">
              <span>Independent Music Trade Press</span>
              <span>&bull;</span>
              <span>Powered by Artispreneur</span>
            </div>
            
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[var(--text-primary)] uppercase">
              The Artist Daily News
            </h1>

            <p className="font-serif italic text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto">
              Real-time music industry trade news, critical journalism, video masterclasses, and audio intelligence for independent music creators.
            </p>
          </div>

          {/* Sub-Masthead Navigation Bar (Clean & Focused) */}
          <div className="border-t border-[var(--border-color)] pt-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono font-bold">
            <div className="flex items-center gap-4 sm:gap-6 flex-wrap text-[var(--text-secondary)]">
              <Link href="/topics/financial" className="hover:text-[var(--accent-primary)] transition-colors flex items-center space-x-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                <span>Industry & Business</span>
              </Link>
              <Link href="/topics/streaming" className="hover:text-[var(--accent-primary)] transition-colors flex items-center space-x-1.5">
                <Mic2 className="w-3.5 h-3.5 text-rose-600" />
                <span>Culture & Releases</span>
              </Link>
              <Link href="/topics/social" className="hover:text-[var(--accent-primary)] transition-colors flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                <span>Tech & Studio</span>
              </Link>
              <Link href="/#news-by-platform" className="hover:text-[var(--accent-primary)] transition-colors flex items-center space-x-1.5">
                <Layers className="w-3.5 h-3.5 text-blue-600" />
                <span>News by Platform</span>
              </Link>
              <Link href="/library" className="hover:text-[var(--accent-primary)] transition-colors flex items-center space-x-1.5">
                <Tv className="w-3.5 h-3.5 text-indigo-600" />
                <span>27+ Channel Library</span>
              </Link>
              <Link href="/news" className="hover:text-[var(--accent-primary)] transition-colors flex items-center space-x-1.5">
                <Newspaper className="w-3.5 h-3.5 text-emerald-600" />
                <span>Full Chronological Wire</span>
              </Link>
            </div>

            <div className="flex items-center space-x-3">
              <Link
                href="/press-pass"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition-colors text-[11px]"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent-emerald)]" />
                <span>Press Pass Accreditation</span>
              </Link>
              <Link
                href="/newsletters"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-primary-hover)] transition-colors text-[11px]"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Daily Newsletter</span>
              </Link>
            </div>
          </div>

        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">

        {/* ── 1. EXECUTIVE LEAD COVER DISPATCH & FAST WIRE (Text-Led Broadsheet) ── */}
        <section className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

            {/* Left 8 Cols: Typographic Lead Story Hero */}
            <div className="lg:col-span-8 flex flex-col">
              <article className="card-brand p-6 sm:p-10 flex flex-col justify-between h-full border-2 border-[var(--text-primary)] relative bg-[var(--bg-card)]">
                
                <div className="space-y-5">
                  {/* Top Meta */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-color)] pb-3 font-mono text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-0.5 rounded bg-[var(--accent-primary)] text-white font-bold text-[10px] uppercase tracking-wider">
                        Top Story
                      </span>
                      <span className="font-bold text-[var(--text-primary)] uppercase">
                        {featuredStory?.source_name || featuredStory?.sourceName}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 text-[var(--text-muted)]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{formatTimeAgo(featuredStory?.freshness || featuredStory?.publishedAt)}</span>
                    </div>
                  </div>

                  {/* Headline */}
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] leading-[1.12] tracking-tight hover:text-[var(--accent-primary)] transition-colors">
                    <a href={featuredStory?.url || featuredStory?.sourceUrl || "#"} target="_blank" rel="noopener noreferrer">
                      {featuredStory?.title}
                    </a>
                  </h2>

                  {/* Dek / Summary */}
                  <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed font-serif italic border-l-2 border-[var(--accent-primary)] pl-4">
                    {featuredStory?.dek || featuredStory?.summary || "Comprehensive breakdown on the strategic shifts impacting independent distribution, licensing, and streaming momentum."}
                  </p>

                  {/* Executive 3-Point Briefing Box */}
                  <div className="p-5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] space-y-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--accent-primary)] block">
                      Executive Summary &bull; Key Points
                    </span>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-[var(--text-primary)] font-medium">
                      {featuredStory?.bullets && featuredStory.bullets.length > 0 ? (
                        featuredStory.bullets.slice(0, 3).map((b: string, idx: number) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <span className="text-[var(--accent-primary)] font-bold shrink-0">&bull;</span>
                            <span>{b}</span>
                          </li>
                        ))
                      ) : (
                        <>
                          <li className="flex items-start space-x-2">
                            <span className="text-[var(--accent-primary)] font-bold shrink-0">&bull;</span>
                            <span>Direct implications for DIY artists navigating new platform qualification rules.</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-[var(--accent-primary)] font-bold shrink-0">&bull;</span>
                            <span>Metadata compliance and direct-to-fan campaigns yield highest conversion probability.</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-6 mt-6 border-t border-[var(--border-color)] flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
                  <span className="text-[var(--text-muted)]">
                    Reported by: <strong className="text-[var(--text-primary)]">{featuredStory?.source_name || featuredStory?.sourceName}</strong>
                  </span>

                  <div className="flex items-center space-x-3">
                    <Link
                      href={`/news/${featuredStory?.slug}`}
                      className="px-4 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent-primary)] font-bold transition-colors"
                    >
                      <span>30s Quick Read</span>
                    </Link>
                    <a
                      href={featuredStory?.url || featuredStory?.sourceUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-primary-hover)] font-bold transition-colors flex items-center space-x-1"
                    >
                      <span>Read Full Story</span>
                      <ExternalLink className="w-3.5 h-3.5 ml-1" />
                    </a>
                  </div>
                </div>

              </article>
            </div>

            {/* Right 4 Cols: The Fast Wire (14 Real-Time Stories) */}
            <div className="lg:col-span-4 flex flex-col">
              <div className="card-brand p-5 sm:p-6 flex-1 flex flex-col justify-between border-2 border-[var(--border-color)] bg-[var(--bg-card)]">
                
                <div>
                  {/* Wire Header */}
                  <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3 mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-emerald)] live-pulse" />
                      <h3 className="font-serif font-bold text-base uppercase tracking-wider text-[var(--text-primary)]">
                        The Fast Wire
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">
                      Live Hourly Index
                    </span>
                  </div>

                  {/* Dense Text Links Wire */}
                  <div className="space-y-3 divide-y divide-[var(--border-color)] max-h-[720px] overflow-y-auto pr-1 scrollbar-none">
                    {fastWireStories.map((item, idx) => (
                      <article key={item.id || idx} className={`group ${idx > 0 ? 'pt-3' : ''}`}>
                        <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)] mb-1">
                          <span className="text-[var(--accent-primary)] font-bold uppercase">{item.sourceName}</span>
                          <span>{formatTimeAgo(item.publishedAt)}</span>
                        </div>
                        <h4 className="font-serif font-bold text-xs sm:text-sm text-[var(--text-primary)] leading-snug group-hover:text-[var(--accent-primary)] transition-colors line-clamp-2">
                          <a href={item.originalUrl} target="_blank" rel="noopener noreferrer">
                            {item.title}
                          </a>
                        </h4>
                      </article>
                    ))}
                  </div>
                </div>

                {/* Wire Bottom Action */}
                <div className="pt-4 mt-4 border-t border-[var(--border-color)] text-center">
                  <Link
                    href="/news"
                    className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[var(--accent-primary)] hover:underline"
                  >
                    <span>Open All 2,000+ Ingested Articles</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            </div>

          </div>

          {/* Secondary Text-Led Editorial Triad (3 Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {secondaryLeadStories.map((story, idx) => (
              <article key={story.id || idx} className="group card-brand p-5 flex flex-col justify-between hover:border-[var(--border-highlight)] transition-all bg-[var(--bg-card)]">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)] border-b border-[var(--border-color)] pb-1.5">
                    <span className="text-[var(--accent-primary)] font-bold uppercase">{story.sourceName}</span>
                    <span>{formatTimeAgo(story.publishedAt)}</span>
                  </div>
                  <h3 className="font-serif font-bold text-base text-[var(--text-primary)] leading-snug group-hover:text-[var(--accent-primary)] transition-colors line-clamp-2">
                    <a href={story.originalUrl} target="_blank" rel="noopener noreferrer">
                      {story.title}
                    </a>
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] line-clamp-3 leading-relaxed">
                    {story.summary}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-[var(--border-color)] flex items-center justify-between text-xs font-mono">
                  <Link href={`/news/${story.slug}`} className="text-[11px] text-[var(--accent-primary)] font-bold hover:underline flex items-center">
                    <span>30s Briefing</span>
                    <ArrowUpRight className="w-3 h-3 ml-0.5" />
                  </Link>
                  <span className="text-[10px] text-[var(--text-muted)]">{story.readTimeMinutes} min read</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── 2. NEWS BY PLATFORM / PUBLISHER DIRECTORY (Pure Text-Based Cards) ── */}
        <div id="news-by-platform">
          <NewsByPlatformSection articles={articles} />
        </div>

        {/* ── 3. 3-COLUMN EXECUTIVE BROADSHEET DESKS (30 Text-Led Stories) ── */}
        <section className="py-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b-2 border-[var(--text-primary)] pb-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-[var(--accent-primary)] uppercase tracking-wider mb-1">
                <Newspaper className="w-3.5 h-3.5" />
                <span>Specialized Editorial Desks</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
                Core Editorial Desks
              </h2>
            </div>
            <p className="text-xs text-[var(--text-muted)] font-mono">
              30 In-Depth Dispatches across Industry &bull; Culture &bull; Studio Tech
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Column 1: Industry & Business Desk (10 articles) */}
            <div className="space-y-4">
              <SectionHeader
                title="Industry & Business"
                href="/topics/financial"
                color="#047857"
                icon={<TrendingUp className="w-4 h-4" />}
              />
              <div className="space-y-3">
                {businessDesk.map((article, idx) => (
                  <EditorialTextCard key={article.id || idx} article={article} />
                ))}
              </div>
            </div>

            {/* Column 2: Culture & Critical Wire (10 articles) */}
            <div className="space-y-4">
              <SectionHeader
                title="Culture & Critical Wire"
                href="/topics/streaming"
                color="#C0272D"
                icon={<Mic2 className="w-4 h-4" />}
              />
              <div className="space-y-3">
                {cultureDesk.map((article, idx) => (
                  <EditorialTextCard key={article.id || idx} article={article} />
                ))}
              </div>
            </div>

            {/* Column 3: Studio, AI & Engineering (10 articles) */}
            <div className="space-y-4">
              <SectionHeader
                title="Studio & Engineering"
                href="/topics/social"
                color="#7C3AED"
                icon={<Sparkles className="w-4 h-4" />}
              />
              <div className="space-y-3">
                {techDesk.map((article, idx) => (
                  <EditorialTextCard key={article.id || idx} article={article} />
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ── 4. 27+ YOUTUBE VIDEO INTELLIGENCE THEATER & MASTERCLASSES ── */}
        <div id="video-gallery">
          <VideoGallerySection videos={MOCK_VIDEOS} />
        </div>

        {/* ── 5. AUDIO INTELLIGENCE & PODCAST NETWORK ── */}
        <div id="podcasts-section" className="py-6 border-t border-[var(--border-color)]">
          <div className="mb-6 space-y-1">
            <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-[var(--accent-primary)] uppercase tracking-wider">
              <Radio className="w-3.5 h-3.5" />
              <span>Audio Intelligence Network</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-[var(--text-primary)]">
              Executive Music Business & Producer Podcasts
            </h2>
          </div>
          <PodcastPlayer episodes={MOCK_PODCASTS} />
        </div>

        {/* ── 6. CONTINUOUS GLOBAL FEED STREAM (24 Text-Led Articles) ── */}
        <section className="py-8 border-t border-[var(--border-color)] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-[var(--accent-primary)] uppercase tracking-wider mb-1">
                <Compass className="w-3.5 h-3.5" />
                <span>Continuous Feed Index</span>
              </div>
              <h2 className="font-serif text-3xl font-bold text-[var(--text-primary)]">
                Latest Global Wire Dispatches
              </h2>
            </div>
            <span className="text-xs font-mono text-[var(--text-muted)]">
              Continuous Ingestion &bull; 50+ Verified Outlets
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {continuousStream.map((article, idx) => (
              <article
                key={article.id || idx}
                className="group card-brand p-4 sm:p-5 flex flex-col justify-between hover:border-[var(--border-highlight)] hover:shadow-sm transition-all bg-[var(--bg-card)]"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)] border-b border-[var(--border-color)] pb-1.5">
                    <span className="text-[var(--accent-primary)] font-bold uppercase">{article.sourceName}</span>
                    <span>{formatTimeAgo(article.publishedAt)}</span>
                  </div>

                  <h3 className="font-serif font-bold text-sm sm:text-base text-[var(--text-primary)] leading-snug group-hover:text-[var(--accent-primary)] transition-colors line-clamp-2">
                    <a href={article.originalUrl} target="_blank" rel="noopener noreferrer">
                      {article.title}
                    </a>
                  </h3>

                  {article.summary && (
                    <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                      {article.summary}
                    </p>
                  )}
                </div>

                <div className="pt-3 mt-3 border-t border-[var(--border-color)] flex items-center justify-between text-xs font-mono">
                  <Link
                    href={`/news/${article.slug}`}
                    className="text-[11px] text-[var(--accent-primary)] hover:underline flex items-center space-x-1 font-bold"
                  >
                    <span>Read Briefing</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                  <a
                    href={article.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-[var(--text-muted)] hover:text-[var(--text-primary)] flex items-center space-x-1"
                  >
                    <span>Source</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="pt-6 text-center">
            <Link
              href="/news"
              className="px-8 py-3.5 rounded-lg bg-[var(--bg-secondary)] border-2 border-[var(--text-primary)] text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-white font-mono text-xs font-bold transition-all inline-flex items-center space-x-2"
            >
              <span>Explore All 2,000+ Articles in Chronological Wire</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* ── 7. EXECUTIVE PRESS ACCREDITATION & NEWSLETTER SUITE ── */}
        <section className="p-8 sm:p-12 rounded-2xl bg-[var(--bg-secondary)] border-2 border-[var(--border-color)] shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center space-x-2 px-3 py-1 bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/20 text-xs font-mono font-bold uppercase tracking-wider rounded-md">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Independent Press Network</span>
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--text-primary)] leading-tight">
                Authoritative Music Journalism & Press Credentials
              </h2>

              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-xl">
                Daily executive intelligence delivered directly to your inbox. Apply for official festival Press Pass credentials and access curated partner discounts for independent artists and producers.
              </p>

              <div className="flex flex-wrap gap-3 pt-2 font-mono text-xs">
                <Link href="/press-pass" className="px-5 py-2.5 rounded-lg bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-primary-hover)] font-bold transition-colors flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Apply for Press Pass</span>
                </Link>
                <Link href="/newsletters" className="px-5 py-2.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent-primary)] font-bold transition-colors flex items-center space-x-1.5">
                  <Mail className="w-4 h-4" />
                  <span>Get Morning Dispatch</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-3">
              <div className="bg-[var(--bg-card)] p-4 rounded-xl border border-[var(--border-color)] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase block">Daily Morning Briefing</span>
                  <span className="font-serif text-sm font-bold text-[var(--text-primary)]">The 30-Second Executive Digest</span>
                </div>
                <Link href="/newsletters" className="text-xs font-mono font-bold text-[var(--accent-primary)] hover:underline">
                  Subscribe &rarr;
                </Link>
              </div>

              <div className="bg-[var(--bg-card)] p-4 rounded-xl border border-[var(--border-color)] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase block">Official Media Badge</span>
                  <span className="font-serif text-sm font-bold text-[var(--color-gold)]">Festival Press Pass 2026</span>
                </div>
                <Link href="/press-pass" className="text-xs font-mono font-bold text-[var(--color-gold)] hover:underline">
                  Apply &rarr;
                </Link>
              </div>

              <div className="bg-[var(--bg-card)] p-4 rounded-xl border border-[var(--border-color)] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase block">Verified Partner Deals</span>
                  <span className="font-serif text-sm font-bold text-[var(--accent-emerald)]">DistroKid, LANDR, Splice</span>
                </div>
                <Link href="/network" className="text-xs font-mono font-bold text-[var(--accent-emerald)] hover:underline">
                  View Deals &rarr;
                </Link>
              </div>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}

// Section Header Helper
function SectionHeader({
  title,
  href,
  color,
  icon
}: {
  title: string;
  href: string;
  color: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between pb-2 border-b-2" style={{ borderColor: color }}>
      <div className="flex items-center gap-2">
        <span style={{ color }}>{icon}</span>
        <h3 className="font-bold text-sm uppercase tracking-wider" style={{ color }}>
          {title}
        </h3>
      </div>
      <Link
        href={href}
        className="text-xs font-mono font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1"
      >
        <span>Desk Wire</span>
        <ChevronRight className="w-3 h-3" />
      </Link>
    </div>
  );
}

// Pure Text-Led Editorial Card for Homepage Pillars
function EditorialTextCard({
  article,
}: {
  article: Article;
}) {
  return (
    <article className="group card-brand p-3.5 flex flex-col justify-between hover:border-[var(--border-highlight)] transition-all bg-[var(--bg-card)]">
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)]">
          <span className="text-[var(--accent-primary)] font-bold uppercase">{article.sourceName}</span>
          <span>{formatTimeAgo(article.publishedAt)}</span>
        </div>

        <h4 className="font-serif font-bold text-xs sm:text-sm text-[var(--text-primary)] leading-snug group-hover:text-[var(--accent-primary)] transition-colors line-clamp-2">
          <a href={article.originalUrl} target="_blank" rel="noopener noreferrer">
            {article.title}
          </a>
        </h4>

        {article.summary && (
          <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
            {article.summary}
          </p>
        )}
      </div>

      <div className="pt-2 mt-2 border-t border-[var(--border-color)] flex items-center justify-between text-xs font-mono">
        <Link
          href={`/news/${article.slug}`}
          className="text-[10px] text-[var(--accent-primary)] hover:underline flex items-center space-x-1 font-bold"
        >
          <span>30s Story</span>
          <ArrowUpRight className="w-3 h-3" />
        </Link>
        <span className="text-[10px] text-[var(--text-muted)]">{article.readTimeMinutes || 3} min</span>
      </div>
    </article>
  );
}

// Time formatting helper
function formatTimeAgo(dateString?: string): string {
  if (!dateString) return 'Today';

  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (isNaN(diffHours) || diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
