import React from 'react';
import { getArticles } from '@/lib/adn-db';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Sparkles, ArrowRight, TrendingUp, Radio, Bot, Newspaper } from 'lucide-react';

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function HomePage() {
  const items = await getArticles(100);

  const cultureItems = items.filter(item => item.pillar === 'culture').slice(0, 6);
  const businessItems = items.filter(item => item.pillar === 'business').slice(0, 6);
  const ideasItems = items.filter(item => item.pillar === 'ideas').slice(0, 6);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] font-medium tracking-[0.16em] uppercase mb-6 text-[var(--text-muted)]">
            <span className="live-pulse w-2 h-2 rounded-full bg-[var(--accent-primary)]"></span>
            Live from the Newsdesk
          </div>
          
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-[var(--text-primary)] tracking-tight leading-[1.1] mb-6">
            The Intelligence Platform for Independent Music Professionals
          </h1>
          
          <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-8 leading-relaxed">
            Daily music business intelligence, streaming royalty calculators, catalogue valuation data, 
            and AI-powered insights for independent artists, managers, and labels.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/pricing" className="btn-brand text-base px-8 py-4">
              <Sparkles className="w-5 h-5" />
              Get Full Access
            </Link>
            <Link href="/news" className="btn-brand-outline text-base px-8 py-4">
              Read Today&apos;s Briefing
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section className="border-y border-[var(--border-color)] bg-[var(--bg-secondary)] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm font-mono text-[var(--text-muted)]">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[var(--accent-emerald)]" />
              <span><strong className="text-[var(--text-primary)]">50+</strong> Industry Sources</span>
            </div>
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-[var(--accent-primary)]" />
              <span><strong className="text-[var(--text-primary)]">Weekly</strong> Podcasts</span>
            </div>
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-[var(--accent-blue)]" />
              <span><strong className="text-[var(--text-primary)]">AI</strong> Business Copilot</span>
            </div>
            <div className="flex items-center gap-2">
              <Newspaper className="w-4 h-4 text-[var(--accent-amber)]" />
              <span><strong className="text-[var(--text-primary)]">Daily</strong> Briefing</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <PillarColumn title="Culture" items={cultureItems} accentColor="#C1121F" />
            <PillarColumn title="Business" items={businessItems} accentColor="#047857" />
            <PillarColumn title="Ideas" items={ideasItems} accentColor="#1D4ED8" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--bg-dark)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--text-inverse)] mb-4">
            Make this about your catalog
          </h2>
          <p className="text-[var(--text-inverse)]/80 mb-8 max-w-xl mx-auto">
            Get a personalized newsroom filtered by your genre and city. Never miss an opportunity in your scene.
          </p>
          <Link href="/news/newsroom" className="btn-brand text-base px-8 py-4 inline-flex">
            Go to My Newsroom
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function PillarColumn({ title, items, accentColor }: { title: string; items: any[]; accentColor: string }) {
  return (
    <div className="flex flex-col">
      <div className="mb-6 pb-4 border-b-2" style={{ borderColor: accentColor }}>
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
