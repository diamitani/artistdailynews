import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
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
      name: "Bandzoogle Artist Web & EPK Builder",
      category: "Web & Merch Store",
      badge: "0% MERCH COMMISSION",
      deal: "3 Months Free + 15% Off",
      code: "ARTISPRENEURSITE",
      description: "Build a stunning mobile EPK, direct-to-fan merch store, and custom domain with zero commission on sales.",
      url: "https://bandzoogle.com",
      icon: Globe,
      highlight: false,
    },
    {
      name: "Feature.fm Smart Pre-Save Funnels",
      category: "Marketing & Conversion",
      badge: "CONVERSION PIXEL",
      deal: "30% Off Creator Tier",
      code: "ARTISPRENEURFMT",
      description: "Create high-converting multi-DSP smart links, Spotify pre-save landing pages, and automated retargeting pixels.",
      url: "https://feature.fm",
      icon: Sparkles,
      highlight: false,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#090A0F]">
      <Header />
      <BreakingTicker articles={MOCK_ARTICLES} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        {/* Umbrella Masthead */}
        <div className="bg-gradient-to-br from-[#1A1810] via-[#12131D] to-[#0A0B10] border-2 border-amber-500/30 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="flex items-center space-x-3">
              <ArtispreneurLogo size="lg" />
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              Artist Daily News is Powered by <span className="text-[#D4FF00]">Artispreneur</span>.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              <strong>Artispreneur.com</strong> is the parent global intelligence and creator entrepreneurship network. We combine autonomous daily music industry journalism with institutional publishing tools, distribution discounts, and verified press pass credentials for the DIY artist class.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="https://artispreneur.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#D4FF00] hover:bg-[#bde600] text-black font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-transform active:scale-95 flex items-center space-x-2 shadow-xl shadow-[#D4FF00]/15"
              >
                <span>Visit Artispreneur.com</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href="#partner-perks"
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl border border-slate-700 transition-colors flex items-center space-x-2"
              >
                <Tag className="w-4 h-4 text-[#D4FF00]" />
                <span>Browse Creator Deals & Vouchers</span>
              </a>
            </div>
          </div>
        </div>

        {/* The Synergy Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#121420] border border-[#272B3F] rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Media & Credential Authority</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Artist Daily News serves as the flagship editorial and accredited press arm of Artispreneur, issuing Letters of Assignment for festivals and summits.
            </p>
          </div>

          <div className="bg-[#121420] border border-[#272B3F] rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <DollarSign className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Freemium & Creator Equity</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering artists with transparent streaming calculators, Wall Street catalogue multiplier indices, and 100% royalty retention models.
            </p>
          </div>

          <div className="bg-[#121420] border border-[#272B3F] rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4FF00]/10 border border-[#D4FF00]/30 flex items-center justify-center text-[#D4FF00]">
              <Gift className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Exclusive Partner Perks</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Negotiated bulk partner discounts across distribution, AI mastering, web hosting, and smart links saving artists over $1,200 annually.
            </p>
          </div>
        </div>

        {/* Affiliate / Perks Directory */}
        <div id="partner-perks" className="space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center space-x-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              <Tag className="w-3.5 h-3.5" />
              <span>OFFICIAL ARTISPRENEUR PERKS & VOUCHERS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Curated Software, Mastering & Distribution Deals
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Exclusive discounts negotiated for verified Artist Daily News & Artispreneur members
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {affiliatePerks.map((perk) => {
              const Icon = perk.icon;
              return (
                <div
                  key={perk.name}
                  className={`bg-[#121420] border rounded-2xl p-6 flex flex-col justify-between space-y-5 relative transition-all duration-200 ${
                    perk.highlight
                      ? "border-amber-500/60 shadow-xl shadow-amber-500/5 ring-1 ring-amber-500/20"
                      : "border-[#272B3F] hover:border-slate-700"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                        {perk.badge}
                      </span>
                      <span className="text-xs font-bold text-[#D4FF00] font-mono">{perk.deal}</span>
                    </div>

                    <div className="flex items-start space-x-3 pt-1">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-white shrink-0">
                        <Icon className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base leading-snug">{perk.name}</h3>
                        <span className="text-[11px] text-slate-400 font-mono">{perk.category}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {perk.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 space-y-2.5">
                    <div className="flex items-center justify-between bg-[#0A0B10] p-2.5 rounded-lg border border-slate-800 text-xs font-mono">
                      <span className="text-slate-400">Promo Code:</span>
                      <strong className="text-[#D4FF00] font-black">{perk.code}</strong>
                    </div>

                    <a
                      href={perk.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#D4FF00] hover:bg-[#bde600] text-black font-black text-xs uppercase py-2.5 rounded-lg flex items-center justify-center space-x-1.5 transition-transform active:scale-98"
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
    </div>
  );
}
