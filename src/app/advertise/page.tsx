"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { BreakingTicker } from "@/components/BreakingTicker";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { MOCK_ARTICLES } from "@/lib/mock-articles";
import { SPONSORSHIP_PACKAGES } from "@/lib/feeds-config";
import { Megaphone, Users, Eye, Mail, CheckCircle2, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

export default function AdvertisePage() {
  const [bookingPackage, setBookingPackage] = useState<string | null>(null);
  const [sponsorName, setSponsorName] = useState("");
  const [sponsorEmail, setSponsorEmail] = useState("");
  const [ctaUrl, setCtaUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleCheckout = async (pkgId: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageId: pkgId,
          sponsorName: sponsorName || "ADN Advertiser",
          sponsorEmail: sponsorEmail || "sponsor@brand.com",
          ctaUrl: ctaUrl || "https://artistdailynews.com",
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setSuccessMsg("Sponsorship reserved! Our ad team will reach out within 2 hours to confirm banner assets.");
      }
    } catch {
      setSuccessMsg("Sponsorship reserved in test mode! We'll confirm your placement shortly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090A0F]">
      <Header />
      <BreakingTicker articles={MOCK_ARTICLES} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-[#D4FF00]/10 border border-[#D4FF00]/30 text-[#D4FF00] px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
            <Megaphone className="w-3.5 h-3.5" />
            <span>2026 Official Media Kit & Rate Card</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            Put Your Brand in Front of 50,000+ Active Music Creators.
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            The highest-converting channel for music tech tools, AI audio plugins, hardware gear, independent distributors, sync agencies, and master rights brokers.
          </p>
        </div>

        {/* Readership Demographics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#12141F] border border-[#272A38] rounded-2xl p-6 text-center space-y-1">
            <Users className="w-6 h-6 mx-auto text-[#D4FF00] mb-2" />
            <div className="text-2xl sm:text-3xl font-black text-white">52,000+</div>
            <div className="text-xs text-slate-400 font-mono">Monthly Active Readers</div>
          </div>

          <div className="bg-[#12141F] border border-[#272A38] rounded-2xl p-6 text-center space-y-1">
            <Mail className="w-6 h-6 mx-auto text-emerald-400 mb-2" />
            <div className="text-2xl sm:text-3xl font-black text-white">35,400+</div>
            <div className="text-xs text-slate-400 font-mono">Newsletter Subscribers</div>
          </div>

          <div className="bg-[#12141F] border border-[#272A38] rounded-2xl p-6 text-center space-y-1">
            <Eye className="w-6 h-6 mx-auto text-blue-400 mb-2" />
            <div className="text-2xl sm:text-3xl font-black text-white">44.2%</div>
            <div className="text-xs text-slate-400 font-mono">Average Email Open Rate</div>
          </div>

          <div className="bg-[#12141F] border border-[#272A38] rounded-2xl p-6 text-center space-y-1">
            <Sparkles className="w-6 h-6 mx-auto text-purple-400 mb-2" />
            <div className="text-2xl sm:text-3xl font-black text-white">68% DIY</div>
            <div className="text-xs text-slate-400 font-mono">Artists, Producers & Labels</div>
          </div>
        </div>

        {/* Sponsorship Pricing Cards */}
        <div id="sponsor-packages" className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-white">Self-Serve Sponsorship Packages</h2>
            <p className="text-xs text-slate-400 font-mono">Instant booking with automated invoice generation</p>
          </div>

          {successMsg && (
            <div className="bg-emerald-950/50 border border-emerald-500/40 rounded-xl p-4 text-center text-xs text-emerald-300 max-w-xl mx-auto">
              ✓ {successMsg}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {SPONSORSHIP_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`bg-[#12141F] border rounded-2xl p-6 flex flex-col justify-between space-y-6 relative ${
                  pkg.highlight ? "border-[#D4FF00] shadow-2xl shadow-[#D4FF00]/10" : "border-[#272A38]"
                }`}
              >
                {pkg.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D4FF00] text-black font-black text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow">
                    ★ MOST POPULAR FOR ARTISTS & SAAS
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-lg text-white">{pkg.name}</h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{pkg.description}</p>
                  </div>

                  <div className="flex items-baseline space-x-1">
                    <span className="text-3xl sm:text-4xl font-black text-white">{pkg.priceFormatted}</span>
                    <span className="text-xs text-slate-500 font-mono">/{pkg.period}</span>
                  </div>

                  <div className="space-y-2.5 pt-4 border-t border-slate-800 text-xs text-slate-300">
                    {pkg.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-[#D4FF00] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleCheckout(pkg.id)}
                  disabled={loading}
                  className={`w-full font-bold text-xs uppercase tracking-wider py-3 rounded-lg transition-transform active:scale-95 flex items-center justify-center space-x-2 ${
                    pkg.highlight
                      ? "bg-[#D4FF00] hover:bg-[#bde600] text-black shadow-lg shadow-[#D4FF00]/15"
                      : "bg-slate-800 hover:bg-slate-700 text-white"
                  }`}
                >
                  <span>Book Placement</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Google AdSense Network Info */}
        <div className="bg-[#12141F] border border-[#272A38] rounded-2xl p-6 sm:p-8 space-y-4">
          <h3 className="font-bold text-white text-base">Programmatic Google AdSense & Header Bidding</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            ArtistDailyNews.com complies with all IAB standard banner units and Google Publisher Policies. We support standard 728x90 Leaderboard, 300x250 Medium Rectangle, 300x600 Half Page, and 320x50 Mobile Sticky Anchors.
          </p>
          <div className="p-3 bg-[#0A0B10] rounded-lg border border-slate-800 font-mono text-[11px] text-slate-400 flex flex-col sm:flex-row justify-between items-center gap-2">
            <span>Verified Ads.txt Location: <strong>artistdailynews.com/ads.txt</strong></span>
            <span className="text-[#D4FF00]">Direct Inquiries: ads@artistdailynews.com</span>
          </div>
        </div>

      </main>

      <NewsletterSignup />
    </div>
  );
}
