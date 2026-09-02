import React from 'react';
import { getArticles, getLatestIssue } from '@/lib/adn-db';
import { MOCK_PODCASTS, MOCK_VIDEOS } from '@/lib/mock-articles';
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
  ArrowUpRight
} from 'lucide-react';

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function PremiumMediaHomepage() {
  const [rawArticles, issue] = await Promise.all([
    getArticles(100),
    getLatestIssue()
  ]);

  // Normalize articles to Article type
  const articles: Article[] = rawArticles.map((item, idx) => ({
    id: item.id || `art-${idx}`,
    title: item.title,
    slug: item.slug || item.id || `article-${idx}`,
    summary: item.dek || item.summary || "",
    bullets: item.bullets || [],
    takeaway: item.takeaway || item.why_it_matters || "",
    content: item.content || item.why_it_matters || item.dek || "",
    category: (item.category as CategoryType) || "financial",
    sourceName: item.source_name || item.platform || "Industry Wire",
    sourceUrl: item.url || "#",
    originalUrl: item.url || "#",
    imageUrl: item.image_url || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
    publishedAt: item.freshness || item.published_at || new Date().toISOString(),
    readTimeMinutes: item.read_time_minutes || 4,
    isBreaking: item.is_breaking || idx === 0,
    tags: item.tags || [item.pillar || "Music"],
  }));

  // Organize content by pillar
  const businessArticles = articles.filter(a => (a as any).pillar === 'business' || a.category === 'financial' || a.category === 'legal');
  const cultureArticles = articles.filter(a => (a as any).pillar === 'culture' || a.category === 'streaming' || a.category === 'marketing');
  const socialArticles = articles.filter(a => (a as any).pillar === 'social' || a.category === 'social' || a.category === 'tutorials' || a.category === 'tech-ai');

  // Featured lead story
  const featuredStory = issue?.lead_item || articles[0];

  // Top stories for hero sidebar wire
  const wireStories = articles.slice(1, 7);

  // Section content
  const businessSection = businessArticles.length > 0 ? businessArticles.slice(0, 4) : articles.slice(0, 4);
  const cultureSection = cultureArticles.length > 0 ? cultureArticles.slice(0, 4) : articles.slice(4, 8);
  const socialSection = socialArticles.length > 0 ? socialArticles.slice(0, 4) : articles.slice(8, 12);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="min-h-[100dvh] bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Texture Overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Breaking News Ticker */}
      <BreakingTicker articles={articles.slice(0, 10)} />

      {/* Edition Masthead */}
      <div className="border-b border-[var(--border-color)] bg-[var(--bg-card)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] live-pulse" />
                <span className="font-mono text-[10px] font-bold text-[var(--accent-primary)] uppercase tracking-wider">
                  Global Music Trade Dispatch &bull; Continuous Feed
                </span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
                Artist Daily News
              </h1>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/#news-by-platform"
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-highlight)] transition-colors"
              >
                <Layers className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                <span>By Platform</span>
              </Link>
              <Link
                href="/podcasts"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <Tv className="w-3.5 h-3.5 text-purple-500" />
                <span>Audio & Video</span>
              </Link>
              <Link
                href="/pricing"
                className="btn-brand text-xs px-3.5 py-1.5 rounded-lg font-bold"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>VIP Pro</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">

        {/* Hero Section: Featured Story + Real-Time Wire Sidebar */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Featured Lead Story - 8 cols */}
          <div className="lg:col-span-8">
            <article className="group card-brand p-5 sm:p-8 flex flex-col justify-between h-full hover:border-[var(--border-highlight)] transition-all">
              <div className="space-y-4">
                {/* Lead Image */}
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-[var(--bg-secondary)]">
                  <img
                    src={featuredStory?.image_url || featuredStory?.imageUrl || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80"}
                    alt={featuredStory?.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3.5 left-3.5 flex items-center space-x-2">
                    <span className="bg-[var(--accent-primary)] text-white text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow">
                      {featuredStory?.pillar || featuredStory?.category || 'Cover Story'}
                    </span>
                    <span className="bg-black/70 backdrop-blur-sm text-white text-[10px] font-mono px-2 py-1 rounded">
                      {featuredStory?.source_name || featuredStory?.sourceName || "Lead Dispatch"}
                    </span>
                  </div>

                  <div className="absolute bottom-3.5 right-3.5 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded text-xs font-mono text-white flex items-center space-x-1">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{formatTimeAgo(featuredStory?.freshness || featuredStory?.publishedAt)}</span>
                  </div>
                </div>

                {/* Lead Title */}
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] leading-tight group-hover:text-[var(--accent-primary)] transition-colors">
                  <a href={featuredStory?.url || featuredStory?.sourceUrl || "#"} target="_blank" rel="noopener noreferrer">
                    {featuredStory?.title}
                  </a>
                </h2>

                {/* Dek / Summary */}
                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                  {featuredStory?.dek || featuredStory?.summary || "Key music industry intelligence breakdown for independent artists and rights holders."}
                </p>
              </div>

              {/* Lead Footer */}
              <div className="pt-6 mt-6 border-t border-[var(--border-color)] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-2 text-xs font-mono text-[var(--text-muted)]">
                  <span>Source: <strong className="text-[var(--text-primary)]">{featuredStory?.source_name || featuredStory?.sourceName}</strong></span>
                </div>

                <a
                  href={featuredStory?.url || featuredStory?.sourceUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-brand text-xs px-4 py-2"
                >
                  <span>Read Full Dispatch</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>
          </div>

          {/* Top Stories Wire - 4 cols */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="card-brand p-5 sm:p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent-emerald)] live-pulse" />
                    <h3 className="font-serif font-bold text-base uppercase tracking-wider text-[var(--text-primary)]">
                      The Wire
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">
                    Hourly Index
                  </span>
                </div>

                <div className="space-y-4 divide-y divide-[var(--border-color)]">
                  {wireStories.map((item, idx) => (
                    <article key={item.id || idx} className={`group ${idx > 0 ? 'pt-4' : ''}`}>
                      <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)] mb-1">
                        <span className="text-[var(--accent-primary)] font-bold uppercase">{item.sourceName}</span>
                        <span>{formatTimeAgo(item.publishedAt)}</span>
                      </div>
                      <h4 className="font-serif font-bold text-sm text-[var(--text-primary)] leading-snug group-hover:text-[var(--accent-primary)] transition-colors line-clamp-2">
                        <a href={item.originalUrl} target="_blank" rel="noopener noreferrer">
                          {item.title}
                        </a>
                      </h4>
                    </article>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[var(--border-color)] text-center">
                <Link
                  href="/news"
                  className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-[var(--accent-primary)] hover:underline"
                >
                  <span>Open Full Wire Feed</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

        </section>

        {/* Section: News by Platform / Source (Key User Requirement) */}
        <div id="news-by-platform">
          <NewsByPlatformSection articles={articles} />
        </div>

        {/* Section: Asymmetric 3-Column Editorial Desk Grid */}
        <section className="py-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[var(--border-color)] pb-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-[var(--accent-primary)] uppercase tracking-wider mb-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Editorial Desk Channels</span>
              </div>
              <h2 className="font-serif text-3xl font-bold text-[var(--text-primary)]">
                Core Editorial Channels
              </h2>
            </div>
            <p className="text-xs text-[var(--text-muted)] font-mono">
              Business &bull; Culture &bull; Community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Column 1: Business */}
            <div className="space-y-6">
              <SectionHeader
                title="Business & Royalties"
                href="/topics/financial"
                color="#047857"
                icon={<TrendingUp className="w-4 h-4" />}
              />
              <div className="space-y-4">
                {businessSection.map((article, idx) => (
                  <EditorialCard key={article.id || idx} article={article} featured={idx === 0} />
                ))}
              </div>
            </div>

            {/* Column 2: Culture */}
            <div className="space-y-6">
              <SectionHeader
                title="Culture & Releases"
                href="/topics/streaming"
                color="#C0272D"
                icon={<Mic2 className="w-4 h-4" />}
              />
              <div className="space-y-4">
                {cultureSection.map((article, idx) => (
                  <EditorialCard key={article.id || idx} article={article} featured={idx === 0} />
                ))}
              </div>
            </div>

            {/* Column 3: Community & Ideas */}
            <div className="space-y-6">
              <SectionHeader
                title="Community & Growth"
                href="/topics/social"
                color="#7C3AED"
                icon={<Sparkles className="w-4 h-4" />}
              />
              <div className="space-y-4">
                {socialSection.map((article, idx) => (
                  <EditorialCard key={article.id || idx} article={article} featured={idx === 0} />
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Section: Curated YouTube Video Gallery (Key User Requirement) */}
        <div id="video-gallery">
          <VideoGallerySection videos={MOCK_VIDEOS} />
        </div>

        {/* Section: Podcast & Audio Hub (Key User Requirement) */}
        <div id="podcasts-section" className="py-6 border-t border-[var(--border-color)]">
          <div className="mb-6 space-y-1">
            <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-[var(--accent-primary)] uppercase tracking-wider">
              <Radio className="w-3.5 h-3.5" />
              <span>Audio Intelligence Network</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-[var(--text-primary)]">
              Daily Music Business Podcasts
            </h2>
          </div>
          <PodcastPlayer episodes={MOCK_PODCASTS} />
        </div>

        {/* Section: VIP Pro & Credentials Lab */}
        <section className="p-8 sm:p-12 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-color)] shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/20 text-xs font-mono font-bold uppercase tracking-wider rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Independent Press Entity</span>
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--text-primary)] leading-tight">
                Run Your Independent Catalog Like a High-Yield Hedge Fund
              </h2>

              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-xl">
                Upgrade to ADN VIP Pro to unlock AI contract scanners, live DSP royalty payout benchmarks, and official Press Pass credentials for festival coverage.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link href="/pricing" className="btn-brand">
                  <Sparkles className="w-4 h-4" />
                  <span>Get VIP Pro Pass</span>
                </Link>
                <Link href="/tools" className="btn-brand-outline">
                  <span>Explore Financial Lab</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-3">
              <div className="bg-[var(--bg-card)] p-4 rounded-xl border border-[var(--border-color)] flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-[var(--text-muted)] block">Apple Music Spatial Payout</span>
                  <span className="font-mono text-lg font-bold text-[var(--accent-emerald)]">$0.0078 / stream</span>
                </div>
                <span className="text-[10px] font-mono text-[var(--accent-emerald)] bg-[var(--accent-emerald)]/10 px-2 py-1 rounded">
                  ▲ +10% Spatial Lift
                </span>
              </div>

              <div className="bg-[var(--bg-card)] p-4 rounded-xl border border-[var(--border-color)] flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-[var(--text-muted)] block">Spotify Standard Mechanical</span>
                  <span className="font-mono text-lg font-bold text-[var(--text-primary)]">$0.0035 / stream</span>
                </div>
                <span className="text-[10px] font-mono text-[var(--text-muted)] bg-[var(--bg-secondary)] px-2 py-1 rounded">
                  1,000 Stream Cap
                </span>
              </div>

              <div className="bg-[var(--bg-card)] p-4 rounded-xl border border-[var(--border-color)] flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-[var(--text-muted)] block">Verified Media Accreditation</span>
                  <span className="font-mono text-lg font-bold text-[var(--color-gold)]">Press Pass 2026</span>
                </div>
                <Link href="/press-pass" className="text-[10px] font-mono font-bold text-[var(--accent-primary)] hover:underline">
                  Apply Now &rarr;
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
    <div className="flex items-center justify-between pb-3 border-b-2" style={{ borderColor: color }}>
      <div className="flex items-center gap-2">
        <span style={{ color }}>{icon}</span>
        <h3 className="font-bold text-base uppercase tracking-wider" style={{ color }}>
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

// Editorial Card Helper for Homepage Pillars
function EditorialCard({
  article,
  featured = false
}: {
  article: Article;
  featured?: boolean;
}) {
  return (
    <article className="group card-brand p-4 flex flex-col justify-between hover:border-[var(--border-highlight)] transition-all">
      <div className="space-y-2.5">
        {featured && article.imageUrl && (
          <div className="aspect-[16/10] rounded-lg overflow-hidden bg-[var(--bg-secondary)] relative mb-2">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
        )}

        <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)]">
          <span className="text-[var(--accent-primary)] font-bold uppercase">{article.sourceName}</span>
          <span>{formatTimeAgo(article.publishedAt)}</span>
        </div>

        <h4 className={`font-serif font-bold text-[var(--text-primary)] leading-snug group-hover:text-[var(--accent-primary)] transition-colors ${featured ? 'text-lg' : 'text-sm'}`}>
          <a href={article.originalUrl} target="_blank" rel="noopener noreferrer">
            {article.title}
          </a>
        </h4>

        {featured && article.summary && (
          <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
            {article.summary}
          </p>
        )}
      </div>

      <div className="pt-3 mt-3 border-t border-[var(--border-color)] flex items-center justify-between text-xs font-mono">
        <Link
          href={`/news/${article.slug}`}
          className="text-[11px] text-[var(--text-muted)] hover:text-[var(--text-primary)] flex items-center space-x-1"
        >
          <span>Quick Story</span>
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
