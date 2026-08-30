import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BreakingTicker } from "@/components/BreakingTicker";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { ArtispreneurLogo } from "@/components/ArtispreneurLogo";
import { MOCK_ARTICLES } from "@/lib/mock-articles";
import { Sparkles, ExternalLink, ShieldCheck, Tag, Zap, Gift, Globe, Layers, ArrowRight, Award, DollarSign, Disc } from "lucide-react";

export const metadata: Metadata = {
  title: "Artispreneur Network & Creator Partner Perks | Artispreneur.com",
  description: "ArtistDailyNews.com is powered by Artispreneur.com — The premier global ecosystem for independent musician entrepreneurship, distribution discounts, AI mastering, and publishing administration.",
};

export default function NetworkPage() {
  const affiliatePerks = [
    {
      name: "DistroKid Indie Distribution",
      category: "Distribution & DSPs",
      badge: "0% COMMISSION",
      deal: "20% Exclusive Discount",
      code: "ARTISPRENEUR20",
      description: "Upload unlimited albums & singles to Spotify, Apple Music, TikTok, and 150+ stores. Keep 100% of your royalties.",
      url: "https://distrokid.com?vip=artispreneur",
      icon: Disc,
      highlight: true,
    },
    {
      name: "LANDR Studio Pro AI Mastering",
      category: "Audio & Production",
      badge: "EXCLUSIVE PARTNER",
      deal: "30% Off Annual Plan",
      code: "ADNPRO30",
      description: "Professional AI mastering engine engineered with Grammy-winning acoustic curves + 2M royalty-free samples.",
      url: "https://landr.com?utm_source=artispreneur",
      icon: Zap,
      highlight: true,
    },
    {
      name: "Songtrust Global Publishing Admin",
      category: "Royalties & Copyright",
      badge: "WORLDWIDE RIGHTS",
      deal: "20% Off Registration",
      code: "ARTISPRENEURPUB",
      description: "Collect mechanical and performance publishing royalties worldwide from 60+ global PROs and YouTube Content ID.",
      url: "https://songtrust.com",
      icon: DollarSign,
      highlight: false,
    },
    {
      name: "Soundcharts Market Intelligence",
      category: "Analytics & Playlists",
      badge: "DATA PARTNER",
      deal: "14-Day Free Pro Trial",
      code: "ARTISDATA",
      description: "Track global airplay, playlist additions, TikTok velocity, and charting metrics across 5M+ artists.",
      url: "https://soundcharts.com",
      icon: Layers,
      highlight: false,
    },
    {
      name: "Bandzoogle Custom Artist Websites",
      category: "Direct-to-Fan",
      badge: "CREATOR TOOL",
      deal: "15% Off + 30-Day Trial",
      code: "ARTISPRENEURWEB",
      description: "Sell merch, digital music, and crowdfunding subscriptions directly with 0% commission on sales.",
      url: "https://bandzoogle.com",
      icon: Globe,
      highlight: false,
    },
    {
      name: "Feature.fm Smart Links & Ads",
      category: "Music Marketing",
      badge: "GROWTH ENGINE",
      deal: "Free Starter Account",
      code: "ADNFREE",
      description: "High-converting bio links, Spotify pre-save campaigns, and automated artist advertising suites.",
      url: "https://feature.fm",
      icon: Sparkles,
      highlight: false,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] justify-between">
      <Header />
      <BreakingTicker articles={MOCK_ARTICLES} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 w-full">
        
        {/* Umbrella Masthead */}
        <div className="card-brand p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="flex items-center space-x-3">
              <ArtispreneurLogo size="lg" />
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] leading-tight">
              Artist Daily News is Powered by <span className="text-[var(--accent-primary)]">Artispreneur</span>
            </h1>

            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
              <strong>Artispreneur.com</strong> is the parent global intelligence and creator entrepreneurship network. We combine autonomous daily music industry journalism with institutional publishing tools, distribution discounts, and verified press pass credentials for the DIY artist class.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="https://artispreneur.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brand px-6 py-3.5 flex items-center space-x-2"
              >
                <span>Visit Artispreneur.com</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href="#partner-perks"
                className="btn-brand-outline px-6 py-3.5 flex items-center space-x-2"
              >
                <Tag className="w-4 h-4 text-[var(--accent-primary)]" />
                <span>Browse Creator Deals & Vouchers</span>
              </a>
            </div>
          </div>
        </div>

        {/* The Synergy Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-brand p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent-primary-light)] border border-[var(--accent-primary)]/20 flex items-center justify-center text-[var(--accent-primary)]">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-[var(--text-primary)] text-lg">Media & Credential Authority</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Artist Daily News serves as the flagship editorial and accredited press arm of Artispreneur, issuing Letters of Assignment for festivals and summits.
            </p>
          </div>

          <div className="card-brand p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[var(--accent-emerald)]">
              <DollarSign className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-[var(--text-primary)] text-lg">Freemium & Creator Equity</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Empowering artists with transparent streaming calculators, Wall Street catalogue multiplier indices, and 100% royalty retention models.
            </p>
          </div>

          <div className="card-brand p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[var(--accent-amber)]">
              <Gift className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-[var(--text-primary)] text-lg">Exclusive Partner Perks</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Negotiated bulk partner discounts across distribution, AI mastering, web hosting, and smart links saving artists over $1,200 annually.
            </p>
          </div>
        </div>

        {/* Affiliate / Perks Directory */}
        <div id="partner-perks" className="space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center space-x-2 text-[var(--accent-primary)] font-mono text-xs font-bold uppercase tracking-wider bg-[var(--bg-secondary)] px-3 py-1 rounded-full border border-[var(--border-color)]">
              <Tag className="w-3.5 h-3.5" />
              <span>OFFICIAL ARTISPRENEUR PERKS & VOUCHERS</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
              Curated Software, Mastering & Distribution Deals
            </h2>
            <p className="text-xs text-[var(--text-muted)] font-mono">
              Exclusive discounts negotiated for verified Artist Daily News & Artispreneur members
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {affiliatePerks.map((perk) => {
              const Icon = perk.icon;
              return (
                <div
                  key={perk.name}
                  className={`card-brand p-6 flex flex-col justify-between space-y-5 relative transition-all duration-200 ${
                    perk.highlight
                      ? "!border-[var(--accent-primary)] shadow-md ring-1 ring-[var(--accent-primary)]/20"
                      : ""
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-color)]">
                        {perk.badge}
                      </span>
                      <span className="text-xs font-bold text-[var(--accent-primary)] font-mono">{perk.deal}</span>
                    </div>

                    <div className="flex items-start space-x-3 pt-1">
                      <div className="w-10 h-10 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-center text-[var(--accent-primary)] shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-[var(--text-primary)] text-lg leading-snug">{perk.name}</h3>
                        <span className="text-[11px] text-[var(--text-muted)] font-mono">{perk.category}</span>
                      </div>
                    </div>

                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      {perk.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[var(--border-color)] space-y-2.5">
                    <div className="flex items-center justify-between bg-[var(--bg-secondary)] p-2.5 rounded-lg border border-[var(--border-color)] text-xs font-mono">
                      <span className="text-[var(--text-muted)]">Promo Code:</span>
                      <strong className="text-[var(--accent-primary)] font-black">{perk.code}</strong>
                    </div>

                    <a
                      href={perk.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-brand w-full py-2.5 flex items-center justify-center space-x-1.5"
                    >
                      <span>Claim Exclusive Deal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </main>

      <NewsletterSignup />
      <Footer />
    </div>
  );
}
