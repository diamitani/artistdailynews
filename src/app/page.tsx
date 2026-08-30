import React from 'react';
import { getArticles } from '@/lib/adn-db';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Sparkles, ArrowRight, TrendingUp, Radio, Bot, Newspaper, ShieldCheck } from 'lucide-react';

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function HomePage() {
  const items = await getArticles(100);

  const cultureItems = items.filter(item => item.pillar === 'culture').slice(0, 8);
  const businessItems = items.filter(item => item.pillar === 'business').slice(0, 8);
  const ideasItems = items.filter(item => item.pillar === 'ideas').slice(0, 8);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col justify-between">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-16 pb-14 px-4 sm:px-6 lg:px-8 border-b border-[var(--border-color)]">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Brand Lockup Tag */}
          <div className="inline-flex items-center gap-2 bg-[var(--bg-secondary)] px-4 py-1.5 rounded-full border border-[var(--border-color)] text-xs font-mono mb-8 shadow-sm">
            <span className="live-pulse w-2 h-2 rounded-full bg-[var(--accent-primary)]"></span>
            <span className="font-black text-[var(--accent-primary)] uppercase tracking-wider">ADN</span>
            <span className="text-[var(--text-muted)]">|</span>
            <span className="font-bold text-[var(--text-primary)]">Artist Daily News</span>
            <span className="text-[var(--text-muted)]">·</span>
            <span className="text-[var(--text-secondary)] font-medium">Powered by <strong className="text-[var(--accent-primary)] font-bold">Artispreneur</strong></span>
          </div>
          
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-[var(--text-primary)] tracking-tight leading-[1.08] mb-6">
            Music Business Intelligence for Independent Artists
          </h1>
          
          <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-8 leading-relaxed">
            Real-time industry dispatches, mechanical royalty benchmarks, streaming algorithm analysis, 
            and creator contract intelligence — aggregated daily from 50+ global music sources.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/pricing" className="btn-brand text-base px-8 py-3.5">
              <Sparkles className="w-5 h-5" />
              Get VIP Pro Access
            </Link>
            <Link href="/news" className="btn-brand-outline text-base px-8 py-3.5">
              Read Today&apos;s Briefing
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section className="border-b border-[var(--border-color)] bg-[var(--bg-secondary)] py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 text-xs sm:text-sm font-mono text-[var(--text-muted)]">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[var(--accent-emerald)]" />
              <span><strong className="text-[var(--text-primary)]">50+</strong> Live Feeds</span>
            </div>
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-[var(--accent-primary)]" />
              <span><strong className="text-[var(--text-primary)]">Weekly</strong> Audio Intelligence</span>
            </div>
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-[var(--accent-blue)]" />
              <span><strong className="text-[var(--text-primary)]">AI</strong> Business Copilot</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[var(--accent-amber)]" />
              <span><strong className="text-[var(--text-primary)]">Verified</strong> Press Pass Network</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <PillarColumn title="Business" items={businessItems} accentColor="#C1121F" />
            <PillarColumn title="Culture" items={cultureItems} accentColor="#047857" />
            <PillarColumn title="Ideas" items={ideasItems} accentColor="#1D4ED8" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--bg-dark)] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[var(--accent-primary)] uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]"></span>
            Artispreneur Ecosystem
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--text-inverse)] mb-4">
            Run Your Music Career Like a Business
          </h2>
          <p className="text-[var(--text-inverse)]/80 mb-8 max-w-xl mx-auto leading-relaxed">
            Get an accredited artist newsroom, legal split contracts, and direct-to-creator partner discounts powered by the Artispreneur network.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/news/newsroom" className="btn-brand text-base px-8 py-3.5 inline-flex">
              Go to My Newsroom
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/network" className="btn-brand-outline !text-white !border-white hover:!bg-white hover:!text-black text-base px-8 py-3.5 inline-flex">
              View Partner Perks
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function PillarColumn({ title, items, accentColor }: { title: string; items: any[]; accentColor: string }) {
  return (
    <div className="flex flex-col">
      <div className="mb-6 pb-3 border-b-2" style={{ borderColor: accentColor }}>
        <h3 className="font-bold text-2xl uppercase tracking-wider" style={{ color: accentColor }}>
          {title}
        </h3>
      </div>

      {items.length === 0 ? (
        <p className="text-[var(--text-muted)] font-mono text-sm">No items available</p>
      ) : (
        <div className="space-y-6">
          {items.map((item, idx) => (
            <article key={idx} className="group">
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="block">
                <h4 className="font-serif text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] leading-tight mb-2 transition-colors">
                  {item.title}
                </h4>
                {item.dek && (
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2 mb-3">
                    {item.dek}
                  </p>
                )}
                <div className="flex items-center gap-3">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[var(--text-primary)] bg-[var(--bg-secondary)] px-2 py-1 rounded">
                    {item.source_name || "Unknown"}
                  </span>
                  <span className="text-xs font-mono text-[var(--text-muted)]">
                    {new Date(item.freshness).toLocaleDateString()}
                  </span>
                </div>
              </a>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
