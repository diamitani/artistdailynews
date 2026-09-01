import React from 'react';
import { getArticles } from '@/lib/adn-db';
import Link from 'next/link';
import { ArrowRight, Radio, Newspaper, TrendingUp } from 'lucide-react';

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function NewsHomePage() {
  const items = await getArticles(100);

  const businessItems = items.filter(item => item.pillar === 'business').slice(0, 4);
  const cultureItems = items.filter(item => item.pillar === 'culture').slice(0, 4);
  const ideasItems = items.filter(item => item.pillar === 'ideas').slice(0, 4);
  const latestItems = items.slice(0, 8);

  return (
    <div className="min-h-screen bg-[var(--bg-dark)] text-white">

      {/* Full-Screen Cinematic Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)] via-black to-black opacity-90"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 text-xs font-mono mb-8">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse"></span>
            <span className="font-black text-white uppercase tracking-wider">ADN LIVE</span>
          </div>

          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-8 leading-[0.95] tracking-tight">
            Artist Daily<br />News
          </h1>

          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-12 leading-relaxed">
            Music business intelligence for independent creators. Real-time industry dispatches, streaming analytics, and contract intelligence.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#the-wire"
              className="bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-white px-10 py-4 rounded-md font-bold text-lg transition-all inline-flex items-center gap-2 shadow-2xl"
            >
              Read Today&apos;s Briefing
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/pricing"
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/30 px-10 py-4 rounded-md font-bold text-lg transition-all inline-flex items-center gap-2"
            >
              Get VIP Access
            </Link>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 animate-bounce">
          <span className="text-xs font-mono uppercase tracking-widest">Scroll to explore</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Animated Ticker */}
      <section className="bg-[var(--accent-primary)] py-3 border-b border-white/20 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          <div className="flex items-center gap-8 font-mono text-sm font-bold text-white uppercase tracking-widest px-4">
            <span className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              50+ Live Feeds
            </span>
            <span className="text-white/50">•</span>
            <span className="flex items-center gap-2">
              <Radio className="w-4 h-4" />
              Daily Audio Intelligence
            </span>
            <span className="text-white/50">•</span>
            <span className="flex items-center gap-2">
              <Newspaper className="w-4 h-4" />
              Real-Time Industry Dispatches
            </span>
            <span className="text-white/50">•</span>
            <span className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              50+ Live Feeds
            </span>
            <span className="text-white/50">•</span>
            <span className="flex items-center gap-2">
              <Radio className="w-4 h-4" />
              Daily Audio Intelligence
            </span>
            <span className="text-white/50">•</span>
            <span className="flex items-center gap-2">
              <Newspaper className="w-4 h-4" />
              Real-Time Industry Dispatches
            </span>
          </div>
        </div>
      </section>

      {/* The Wire - Latest News Grid */}
      <section id="the-wire" className="bg-[var(--bg-primary)] text-[var(--text-primary)] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-12 bg-[var(--accent-primary)]"></div>
            <h2 className="font-serif text-5xl font-bold tracking-tight">The Wire</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestItems.map((item, idx) => (
              <article key={idx} className="group bg-white p-6 rounded-lg border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-all shadow-sm hover:shadow-xl">
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[var(--accent-primary)] mb-3 block">
                    {item.source_name || "Unknown"}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] leading-tight mb-3 transition-colors">
                    {item.title}
                  </h3>
                  {item.dek && (
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                      {item.dek}
                    </p>
                  )}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Three Pillars Section */}
      <section className="bg-white text-[var(--text-primary)] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-4xl font-bold text-center mb-16">Intelligence by Pillar</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Business Column */}
            <div className="border-t-4 border-[var(--accent-primary)] pt-8">
              <h3 className="font-bold text-3xl uppercase tracking-wider text-[var(--accent-primary)] mb-8">Business</h3>
              <div className="space-y-6">
                {businessItems.map((item, idx) => (
                  <article key={idx} className="group">
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      <h4 className="font-serif text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] leading-tight mb-2 transition-colors">
                        {item.title}
                      </h4>
                      <span className="text-xs font-mono text-[var(--text-muted)]">
                        {item.source_name} • {new Date(item.freshness).toLocaleDateString()}
                      </span>
                    </a>
                  </article>
                ))}
              </div>
            </div>

            {/* Culture Column */}
            <div className="border-t-4 border-[var(--accent-emerald)] pt-8">
              <h3 className="font-bold text-3xl uppercase tracking-wider text-[var(--accent-emerald)] mb-8">Culture</h3>
              <div className="space-y-6">
                {cultureItems.map((item, idx) => (
                  <article key={idx} className="group">
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      <h4 className="font-serif text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-emerald)] leading-tight mb-2 transition-colors">
                        {item.title}
                      </h4>
                      <span className="text-xs font-mono text-[var(--text-muted)]">
                        {item.source_name} • {new Date(item.freshness).toLocaleDateString()}
                      </span>
                    </a>
                  </article>
                ))}
              </div>
            </div>

            {/* Ideas Column */}
            <div className="border-t-4 border-[var(--accent-blue)] pt-8">
              <h3 className="font-bold text-3xl uppercase tracking-wider text-[var(--accent-blue)] mb-8">Ideas</h3>
              <div className="space-y-6">
                {ideasItems.map((item, idx) => (
                  <article key={idx} className="group">
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      <h4 className="font-serif text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-blue)] leading-tight mb-2 transition-colors">
                        {item.title}
                      </h4>
                      <span className="text-xs font-mono text-[var(--text-muted)]">
                        {item.source_name} • {new Date(item.freshness).toLocaleDateString()}
                      </span>
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-[var(--bg-dark)] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Get the Daily Briefing</h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Music business intelligence delivered to your inbox every morning at 6am EST. Join 10,000+ independent creators.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-6 py-4 rounded-md bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
            />
            <button
              type="submit"
              className="bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-white px-10 py-4 rounded-md font-bold text-lg transition-all whitespace-nowrap"
            >
              Subscribe Free
            </button>
          </form>
          <p className="text-xs text-white/50 mt-4">No spam. Unsubscribe anytime. Powered by Artispreneur.</p>
        </div>
      </section>

    </div>
  );
}
