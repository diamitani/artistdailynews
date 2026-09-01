import React from 'react';
import { getArticles, getLatestIssue } from '@/lib/adn-db';
import Link from 'next/link';
import { BreakingTicker } from '@/components/BreakingTicker';
import {
  ArrowRight,
  Sparkles,
  Clock,
  TrendingUp,
  Mic2,
  Star,
  ChevronRight,
  Mail,
  Play,
  ExternalLink
} from 'lucide-react';

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function PremiumMediaHomepage() {
  const [articles, issue] = await Promise.all([
    getArticles(100),
    getLatestIssue()
  ]);

  // Organize content by pillar
  const businessArticles = articles.filter(a => a.pillar === 'business');
  const cultureArticles = articles.filter(a => a.pillar === 'culture');
  const socialArticles = articles.filter(a => a.pillar === 'social');

  // Featured story (lead from issue or first business article)
  const featuredStory = issue?.lead_item || businessArticles[0];

  // Top stories for hero sidebar
  const topStories = articles.slice(0, 11);

  // Section content
  const businessSection = businessArticles.slice(0, 6);
  const cultureSection = cultureArticles.slice(0, 6);
  const socialSection = socialArticles.slice(0, 4);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Breaking News Ticker */}
      <BreakingTicker articles={articles.slice(0, 10)} />

      {/* Edition Masthead */}
      <div className="border-b border-[var(--border-color)] bg-[var(--bg-card)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">
                {currentDate}
              </p>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                The Daily Briefing
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/newsletters"
                className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Get the Newsletter</span>
              </Link>
              <Link
                href="/podcasts"
                className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
              >
                <Play className="w-4 h-4" />
                <span>Listen</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Hero Section: Featured + Top Stories */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">

          {/* Featured Story - 2 columns */}
          <div className="lg:col-span-2">
            <article className="group">
              {featuredStory?.image_url && (
                <div className="aspect-[16/9] rounded-xl overflow-hidden mb-6 bg-[var(--bg-secondary)]">
                  <img
                    src={featuredStory.image_url}
                    alt={featuredStory.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="flex items-center gap-3 mb-3">
                <span className="px-2.5 py-1 bg-[var(--accent-primary)] text-white text-[10px] font-bold uppercase tracking-wider rounded">
                  {featuredStory?.pillar || 'Featured'}
                </span>
                <span className="text-xs font-mono text-[var(--text-muted)]">
                  {featuredStory?.source_name}
                </span>
              </div>
              <a
                href={featuredStory?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] leading-tight mb-4 group-hover:text-[var(--accent-primary)] transition-colors">
                  {featuredStory?.title}
                </h2>
              </a>
              {featuredStory?.dek && (
                <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-4 max-w-2xl">
                  {featuredStory.dek}
                </p>
              )}
              <div className="flex items-center gap-4 text-sm text-[var(--text-muted)]">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {formatTimeAgo(featuredStory?.freshness)}
                </span>
                <a
                  href={featuredStory?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[var(--accent-primary)] font-medium hover:underline"
                >
                  Read Full Story
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>
          </div>

          {/* Top Stories Sidebar - 1 column */}
          <div className="lg:border-l lg:border-[var(--border-color)] lg:pl-8">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[var(--accent-primary)]" />
              Top Stories
            </h3>
            <div className="space-y-5">
              {topStories.slice(1, 11).map((article, idx) => (
                <article key={article.id || idx} className="group">
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-2xl font-bold text-[var(--border-highlight)] group-hover:text-[var(--accent-primary)] transition-colors">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <h4 className="font-serif text-base font-semibold text-[var(--text-primary)] leading-snug group-hover:text-[var(--accent-primary)] transition-colors mb-1">
                          {article.title}
                        </h4>
                      </a>
                      <p className="text-xs text-[var(--text-muted)] font-mono">
                        {article.source_name} · {formatTimeAgo(article.freshness)}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA Banner */}
        <section className="bg-[var(--bg-dark)] rounded-2xl p-8 sm:p-10 mb-12">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full text-xs font-mono text-white/80 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
              Join 35,000+ music professionals
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3">
              Get smarter about the music business
            </h2>
            <p className="text-white/70 mb-6 max-w-xl mx-auto">
              Daily intelligence on streaming royalties, catalog valuations, and industry shifts — delivered at 6am.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-[var(--accent-primary)]"
              />
              <button className="btn-brand px-6 py-3 whitespace-nowrap">
                Subscribe Free
              </button>
            </form>
          </div>
        </section>

        {/* Three-Column Editorial Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">

          {/* Business Column */}
          <div>
            <SectionHeader
              title="Business"
              href="/topics/financial"
              color="#047857"
              icon={<TrendingUp className="w-4 h-4" />}
            />
            <div className="space-y-6">
              {businessSection.map((article, idx) => (
                <ArticleCard key={article.id || idx} article={article} featured={idx === 0} />
              ))}
            </div>
          </div>

          {/* Culture Column */}
          <div>
            <SectionHeader
              title="Culture"
              href="/topics/streaming"
              color="#C0272D"
              icon={<Mic2 className="w-4 h-4" />}
            />
            <div className="space-y-6">
              {cultureSection.map((article, idx) => (
                <ArticleCard key={article.id || idx} article={article} featured={idx === 0} />
              ))}
            </div>
          </div>

          {/* Features Column */}
          <div>
            <SectionHeader
              title="Features"
              href="/topics/features"
              color="#8B5CF6"
              icon={<Star className="w-4 h-4" />}
            />
            <div className="space-y-6">
              {socialSection.map((article, idx) => (
                <ArticleCard key={article.id || idx} article={article} featured={idx === 0} />
              ))}
            </div>

            {/* Podcast Promo in Social Column */}
            <div className="mt-8 p-5 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-color)]">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[var(--accent-primary)] flex items-center justify-center">
                  <Play className="w-4 h-4 text-white" />
                </div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  Podcast
                </span>
              </div>
              <h4 className="font-serif text-lg font-bold text-[var(--text-primary)] mb-2">
                The Artispreneur Show
              </h4>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                Weekly conversations with indie artists, managers, and label executives.
              </p>
              <Link
                href="/podcasts"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent-primary)] hover:underline"
              >
                Listen Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Premium Membership CTA */}
        <section className="border-t border-[var(--border-color)] pt-12 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-[var(--accent-primary-light)] text-[var(--accent-primary)] text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                VIP Pro Access
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">
                Run your music career like a business
              </h2>
              <p className="text-lg text-[var(--text-secondary)] mb-6">
                Unlock AI copilot, royalty calculators, press credentials, and exclusive partner deals.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'AI Business Copilot for contract analysis',
                  'Streaming royalty calculator & benchmarks',
                  'Verified Press Pass credentials',
                  'Exclusive partner discounts (DistroKid, Splice, etc.)'
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-[var(--text-secondary)]">
                    <div className="w-5 h-5 rounded-full bg-[var(--accent-emerald)]/10 flex items-center justify-center">
                      <ChevronRight className="w-3 h-3 text-[var(--accent-emerald)]" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4">
                <Link href="/pricing" className="btn-brand">
                  <Sparkles className="w-4 h-4" />
                  Get VIP Pro Access
                </Link>
                <Link href="/tools" className="btn-brand-outline">
                  Try Free Tools
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-[var(--bg-secondary)] rounded-2xl p-8 border border-[var(--border-color)]">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[var(--bg-card)] rounded-xl">
                    <span className="text-sm font-medium text-[var(--text-secondary)]">Spotify Per-Stream Rate</span>
                    <span className="font-mono text-lg font-bold text-[var(--accent-emerald)]">$0.0035</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[var(--bg-card)] rounded-xl">
                    <span className="text-sm font-medium text-[var(--text-secondary)]">Apple Music Rate</span>
                    <span className="font-mono text-lg font-bold text-[var(--accent-emerald)]">$0.0078</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[var(--bg-card)] rounded-xl">
                    <span className="text-sm font-medium text-[var(--text-secondary)]">Your Catalog Est. Value</span>
                    <span className="font-mono text-lg font-bold text-[var(--accent-primary)]">$12,450</span>
                  </div>
                </div>
                <p className="text-xs text-[var(--text-muted)] text-center mt-4">
                  Sample data from VIP Pro dashboard
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Source Attribution */}
        <section className="border-t border-[var(--border-color)] pt-8">
          <div className="text-center">
            <p className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider mb-4">
              Aggregating intelligence from 50+ trusted sources
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-[var(--text-muted)]">
              {['Billboard', 'Music Business Worldwide', 'Digital Music News', 'Pitchfork', 'Rolling Stone', 'The FADER', 'Bandcamp Daily'].map((source) => (
                <span key={source} className="hover:text-[var(--text-secondary)] transition-colors">
                  {source}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// Section Header Component
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
    <div className="flex items-center justify-between mb-6 pb-3 border-b-2" style={{ borderColor: color }}>
      <div className="flex items-center gap-2">
        <span style={{ color }}>{icon}</span>
        <h3 className="font-bold text-lg uppercase tracking-wider" style={{ color }}>
          {title}
        </h3>
      </div>
      <Link
        href={href}
        className="text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1"
      >
        View All
        <ChevronRight className="w-3 h-3" />
      </Link>
    </div>
  );
}

// Article Card Component
function ArticleCard({
  article,
  featured = false
}: {
  article: any;
  featured?: boolean;
}) {
  return (
    <article className="group">
      {featured && article.image_url && (
        <div className="aspect-[16/10] rounded-lg overflow-hidden mb-3 bg-[var(--bg-secondary)]">
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h4 className={`font-serif font-semibold text-[var(--text-primary)] leading-snug group-hover:text-[var(--accent-primary)] transition-colors mb-2 ${featured ? 'text-xl' : 'text-base'}`}>
          {article.title}
        </h4>
      </a>
      {featured && article.dek && (
        <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-2">
          {article.dek}
        </p>
      )}
      <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] font-mono">
        <span className="font-medium text-[var(--text-secondary)]">{article.source_name}</span>
        <span>·</span>
        <span>{formatTimeAgo(article.freshness)}</span>
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

  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
