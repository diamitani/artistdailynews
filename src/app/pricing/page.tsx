"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { BreakingTicker } from "@/components/BreakingTicker";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { useAuth } from "@/components/AuthContext";
import { MOCK_ARTICLES } from "@/lib/mock-articles";
import { Sparkles, CheckCircle2, ShieldCheck, Zap, ArrowRight, Star } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const { user, upgradeTier } = useAuth();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [loadingTier, setLoadingTier] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubscribe = async (tier: "free" | "pro_insider" | "enterprise") => {
    setLoadingTier(tier);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageId: tier === "pro_insider" ? "pro-insider" : "enterprise-roster",
          sponsorEmail: user?.email || "artist@adn.media",
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        upgradeTier(tier);
        setSuccessMsg(`Upgraded successfully to ${tier === "pro_insider" ? "Pro Artist Insider" : "Enterprise"}!`);
      }
    } catch {
      upgradeTier(tier);
      setSuccessMsg(`Upgraded successfully in test mode!`);
    } finally {
      setLoadingTier(null);
    }
  };

  const plans = [
    {
      id: "free" as const,
      name: "Free DIY Edition",
      priceMonthly: "$0",
      priceAnnual: "$0",
      description: "Essential music business news and daily headline briefings for self-releasing artists.",
      features: [
        "Real-time 50+ source aggregated news feed",
        "30-Second AI Executive Summary drawers",
        "Basic Spotify & Apple Streaming Royalty Calculator",
        "Daily morning newsletter digest",
        "Community press pass application queue",
      ],
      highlight: false,
      cta: "Current Plan",
    },
    {
      id: "pro_insider" as const,
      name: "Pro Artist Insider",
      priceMonthly: "$19",
      priceAnnual: "$15",
      period: "/month",
      description: "For active career artists seeking actionable edge, valuation data, and priority access.",
      features: [
        "100% Ad-Free reading experience across all devices",
        "Wall Street Net Publisher's Share (NPS) Catalogue Multiplier Database",
        "Early 48-hour grant & festival showcase alert alerts",
        "ADN AI Music Business Chat Copilot (unlimited queries)",
        "Priority VIP Festival Press Pass review & Letter of Assignment",
        "Exportable 6-Week Release Blueprint JSON schemas",
      ],
      highlight: true,
      cta: "Upgrade to Pro Insider",
    },
    {
      id: "enterprise" as const,
      name: "Label & Roster Enterprise",
      priceMonthly: "$99",
      priceAnnual: "$79",
      period: "/month",
      description: "For indie record labels, managers, attorneys, and distributor teams managing multiple artists.",
      features: [
        "Everything in Pro Insider for up to 10 team seats",
        "Automated White-Label Daily PDF Briefing for your roster",
        "Dedicated Press Accreditation Concierge liaison",
        "Direct API Feed Access for internal CRM & Slack feeds",
        "Quarterly 1-on-1 Music Catalogue Valuation Audit",
        "Featured Artist Spotlight discount (50% off)",
      ],
      highlight: false,
      cta: "Activate Enterprise Roster",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#090A0F]">
      <Header />
      <BreakingTicker articles={MOCK_ARTICLES} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* Masthead */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-[#D4FF00]/10 border border-[#D4FF00]/30 text-[#D4FF00] px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>VIP Creator & Label Memberships</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            Invest in the Data That Protects Your Music Equity.
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Gain full access to catalogue valuation datasets, priority festival credentials, ad-free reading, and the ADN AI Copilot.
          </p>

          {/* Billing Cycle Switcher */}
          <div className="inline-flex items-center bg-[#121420] p-1.5 rounded-xl border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-1.5 rounded-lg font-bold transition-colors ${
                billingCycle === "monthly" ? "bg-[#D4FF00] text-black shadow" : "text-slate-400 hover:text-white"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-4 py-1.5 rounded-lg font-bold transition-colors flex items-center space-x-1.5 ${
                billingCycle === "annual" ? "bg-[#D4FF00] text-black shadow" : "text-slate-400 hover:text-white"
              }`}
            >
              <span>Annual (Save 20%)</span>
              <span className="text-[9px] bg-emerald-500 text-black px-1.5 py-0.2 rounded font-black">2 MOS FREE</span>
            </button>
          </div>
        </div>

        {successMsg && (
          <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-4 text-center text-xs text-emerald-300 max-w-xl mx-auto">
            ✓ {successMsg}
          </div>
        )}

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const isCurrent = user?.tier === plan.id;
            const price = billingCycle === "monthly" ? plan.priceMonthly : plan.priceAnnual;

            return (
              <div
                key={plan.id}
                className={`bg-[#121420] border rounded-3xl p-8 flex flex-col justify-between space-y-6 relative transition-all duration-200 ${
                  plan.highlight
                    ? "border-[#D4FF00] shadow-2xl shadow-[#D4FF00]/10 ring-1 ring-[#D4FF00]/30"
                    : "border-[#272B3F] hover:border-slate-700"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#D4FF00] text-black font-black text-[10px] uppercase tracking-wider px-3.5 py-1 rounded-full shadow flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-current" />
                    <span>RECOMMENDED FOR WORKING ARTISTS</span>
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{plan.description}</p>
                  </div>

                  <div className="flex items-baseline space-x-1">
                    <span className="text-4xl font-black text-white">{price}</span>
                    {plan.period && (
                      <span className="text-xs text-slate-400 font-mono">
                        {plan.period} {billingCycle === "annual" && "(billed annually)"}
                      </span>
                    )}
                  </div>

                  <div className="space-y-3 pt-4 border-t border-slate-800 text-xs text-slate-300">
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start space-x-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#D4FF00] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={loadingTier === plan.id || isCurrent}
                  className={`w-full font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-transform active:scale-98 flex items-center justify-center space-x-2 ${
                    isCurrent
                      ? "bg-slate-800 text-slate-400 cursor-default"
                      : plan.highlight
                      ? "bg-[#D4FF00] hover:bg-[#bde600] text-black shadow-lg shadow-[#D4FF00]/15"
                      : "bg-white hover:bg-slate-200 text-black"
                  }`}
                >
                  <span>{isCurrent ? "Active Tier" : loadingTier === plan.id ? "Processing..." : plan.cta}</span>
                  {!isCurrent && <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            );
          })}
        </div>

        {/* Enterprise Guarantee */}
        <div className="bg-[#121420] border border-[#272B3F] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[10px] font-mono text-[#D4FF00] font-bold uppercase tracking-wider">
              100% Satisfaction Guarantee
            </span>
            <h3 className="text-base font-bold text-white">Cancel or Pause Anytime with 1-Click</h3>
            <p className="text-xs text-slate-400">
              Manage your subscription, change credit cards, or download VAT invoices anytime via Stripe Customer Portal.
            </p>
          </div>
          <Link
            href="/billing"
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase px-5 py-2.5 rounded-lg border border-slate-700 shrink-0 transition-colors"
          >
            Manage Billing & Invoices
          </Link>
        </div>

      </main>

      <NewsletterSignup />
    </div>
  );
}
