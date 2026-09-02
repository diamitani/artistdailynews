"use client";

import { useState } from "react";
import { BreakingTicker } from "@/components/BreakingTicker";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { useAuth, MembershipTier } from "@/components/AuthContext";
import { MOCK_ARTICLES } from "@/lib/mock-articles";
import { Sparkles, CheckCircle2, ArrowRight, Star } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const { user, upgradeTier } = useAuth();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [loadingTier, setLoadingTier] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubscribe = async (tier: MembershipTier) => {
    setLoadingTier(tier);
    try {
      if (tier === "free") {
        if (upgradeTier) upgradeTier("free");
        setSuccessMsg("Switched to Free DIY tier.");
        return;
      }

      // Live Stripe Checkout Routing
      const amount = tier === "pro_insider" 
        ? (billingCycle === "annual" ? 18000 : 1900) 
        : (billingCycle === "annual" ? 79000 : 9900);

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: tier,
          planName: tier === "pro_insider" ? `Pro Insider (${billingCycle})` : `Enterprise Roster (${billingCycle})`,
          amount,
          interval: billingCycle === "annual" ? "year" : "month",
          userEmail: user?.email || "subscriber@artispreneur.com",
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        if (upgradeTier) upgradeTier(tier);
        setSuccessMsg(`Upgraded successfully to ${tier === "pro_insider" ? "Pro Artist Insider" : "Enterprise"}!`);
      }
    } catch {
      if (upgradeTier) upgradeTier(tier);
      setSuccessMsg("Upgraded successfully in test mode!");
    } finally {
      setLoadingTier(null);
    }
  };

  const plans: {
    id: MembershipTier;
    name: string;
    priceMonthly: string;
    priceAnnual: string;
    period?: string;
    description: string;
    features: string[];
    highlight: boolean;
    cta: string;
  }[] = [
    {
      id: "free",
      name: "Free DIY Edition",
      priceMonthly: "$0",
      priceAnnual: "$0",
      description: "Essential music business news and daily headline briefings for self-releasing artists.",
      features: [
        "Real-time 50+ source aggregated news feed",
        "30-Second AI Executive Summary drawers",
        "Weekly curated video essays & DAW masterclasses",
        "Daily morning newsletter digest",
        "Community press pass application queue",
      ],
      highlight: false,
      cta: "Current Plan",
    },
    {
      id: "pro_insider",
      name: "Pro Artist Insider",
      priceMonthly: "$19",
      priceAnnual: "$15",
      period: "/month",
      description: "For active career artists seeking actionable edge, industry access, and priority media tools.",
      features: [
        "100% Ad-Free reading experience across all devices",
        "Comprehensive YouTube Video Masterclass & Essay Library",
        "Early 48-hour grant & festival showcase alerts",
        "ADN AI Music News & Copilot Assistant (unlimited queries)",
        "Priority VIP Festival Press Pass review & Letter of Assignment",
        "Exportable 6-Week Release Campaign Blueprints",
      ],
      highlight: true,
      cta: "Upgrade to Pro Insider",
    },
    {
      id: "enterprise",
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
        "Quarterly 1-on-1 Artist Career & Strategy Consultation",
        "Featured Artist Spotlight discount (50% off)",
      ],
      highlight: false,
      cta: "Activate Enterprise Roster",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] justify-between">
      <BreakingTicker articles={MOCK_ARTICLES} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 w-full">
        
        {/* Masthead */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--accent-primary)] px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>VIP Creator & Label Memberships</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] leading-tight">
            Invest in the Data That Protects Your Music Equity
          </h1>

          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
            Gain full access to catalogue valuation datasets, priority festival credentials, ad-free reading, and the ADN AI Copilot.
          </p>

          {/* Billing Cycle Switcher */}
          <div className="inline-flex items-center bg-[var(--bg-secondary)] p-1.5 rounded-xl border border-[var(--border-color)] text-xs font-mono">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-1.5 rounded-lg font-bold transition-colors ${
                billingCycle === "monthly" ? "bg-[var(--accent-primary)] text-white shadow-sm" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-4 py-1.5 rounded-lg font-bold transition-colors flex items-center space-x-1.5 ${
                billingCycle === "annual" ? "bg-[var(--accent-primary)] text-white shadow-sm" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <span>Annual (Save 20%)</span>
              <span className="text-[9px] bg-[var(--accent-emerald)] text-white px-1.5 py-0.5 rounded font-black">2 MOS FREE</span>
            </button>
          </div>
        </div>

        {successMsg && (
          <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 text-center text-xs text-emerald-800 max-w-xl mx-auto font-medium">
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
                className={`card-brand p-8 flex flex-col justify-between space-y-6 relative transition-all duration-200 ${
                  plan.highlight
                    ? "!border-[var(--accent-primary)] shadow-lg ring-2 ring-[var(--accent-primary)]/20"
                    : ""
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[var(--accent-primary)] text-white font-black text-[10px] uppercase tracking-wider px-3.5 py-1 rounded-full shadow flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-current" />
                    <span>RECOMMENDED FOR WORKING ARTISTS</span>
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[var(--text-primary)]">{plan.name}</h3>
                    <p className="text-xs text-[var(--text-secondary)] mt-1.5 leading-relaxed">{plan.description}</p>
                  </div>

                  <div className="flex items-baseline space-x-1">
                    <span className="text-4xl font-black text-[var(--text-primary)]">{price}</span>
                    {plan.period && (
                      <span className="text-xs text-[var(--text-muted)] font-mono">
                        {plan.period} {billingCycle === "annual" && "(billed annually)"}
                      </span>
                    )}
                  </div>

                  <div className="space-y-3 pt-4 border-t border-[var(--border-color)] text-xs text-[var(--text-secondary)]">
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start space-x-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[var(--accent-primary)] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={loadingTier === plan.id || isCurrent}
                  className={`w-full font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all flex items-center justify-center space-x-2 ${
                    isCurrent
                      ? "bg-[var(--bg-secondary)] text-[var(--text-muted)] cursor-default border border-[var(--border-color)]"
                      : plan.highlight
                      ? "btn-brand w-full"
                      : "btn-brand-outline w-full"
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
        <div className="card-brand p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[10px] font-mono text-[var(--accent-primary)] font-bold uppercase tracking-wider">
              100% Satisfaction Guarantee
            </span>
            <h3 className="font-serif text-lg font-bold text-[var(--text-primary)]">Cancel or Pause Anytime with 1-Click</h3>
            <p className="text-xs text-[var(--text-secondary)]">
              Manage your subscription, change credit cards, or download VAT invoices anytime via Stripe Customer Portal.
            </p>
          </div>
          <Link
            href="/billing"
            className="btn-brand-outline text-xs px-5 py-2.5 shrink-0"
          >
            Manage Billing & Invoices
          </Link>
        </div>

      </main>

      <NewsletterSignup />
    </div>
  );
}
