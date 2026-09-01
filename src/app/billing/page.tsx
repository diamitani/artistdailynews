"use client";

import { BreakingTicker } from "@/components/BreakingTicker";
import { useAuth } from "@/components/AuthContext";
import { MOCK_ARTICLES } from "@/lib/mock-articles";
import { CreditCard, Download, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function BillingPage() {
  const { user } = useAuth();

  const tierNames = {
    free: "Free DIY Edition",
    pro_insider: "Pro Artist Insider ($19/mo)",
    enterprise: "Label & Roster Enterprise ($99/mo)",
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] justify-between">
      <BreakingTicker articles={MOCK_ARTICLES} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 w-full">
        <div className="space-y-1">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
            Subscription & Billing Portal
          </h1>
          <p className="text-xs text-[var(--text-muted)] font-mono">
            Manage your payment method, plan tier, and past invoices
          </p>
        </div>

        {/* Current Plan Card */}
        <div className="card-brand p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-5">
            <div>
              <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] block">CURRENT ACTIVE PLAN</span>
              <div className="text-xl font-serif font-bold text-[var(--text-primary)] mt-0.5 flex items-center space-x-2">
                <span>{tierNames[user?.tier || "free"]}</span>
                {user?.tier !== "free" && (
                  <span className="bg-[var(--accent-primary)] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-sm">
                    ACTIVE
                  </span>
                )}
              </div>
            </div>

            <Link
              href="/pricing"
              className="btn-brand text-xs px-4 py-2.5 shrink-0"
            >
              {user?.tier === "free" ? "Upgrade to Pro Insider" : "Change Plan"}
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-[var(--bg-secondary)] p-4 rounded-xl border border-[var(--border-color)] space-y-1">
              <span className="text-[var(--text-muted)] font-mono block">BILLING EMAIL</span>
              <div className="text-[var(--text-primary)] font-mono font-medium">{user?.email || "artist@adn.media"}</div>
            </div>

            <div className="bg-[var(--bg-secondary)] p-4 rounded-xl border border-[var(--border-color)] space-y-1">
              <span className="text-[var(--text-muted)] font-mono block">PAYMENT METHOD</span>
              <div className="text-[var(--text-primary)] font-mono flex items-center space-x-2">
                <CreditCard className="w-4 h-4 text-[var(--accent-primary)]" />
                <span>•••• 4242 (Stripe Secure)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Invoice History */}
        <div className="card-brand overflow-hidden">
          <div className="p-6 border-b border-[var(--border-color)] flex justify-between items-center text-xs font-mono">
            <span className="font-bold text-[var(--text-primary)] uppercase">Invoice History</span>
            <span className="text-[var(--text-muted)]">Auto-Generated via Stripe</span>
          </div>

          <div className="divide-y divide-[var(--border-color)] text-xs">
            <div className="p-4 flex items-center justify-between hover:bg-[var(--bg-secondary)] transition-colors">
              <div>
                <div className="font-bold text-[var(--text-primary)]">Invoice #ADN-2026-08</div>
                <div className="text-[var(--text-muted)] text-[11px] font-mono">Aug 27, 2026 &bull; {user?.tier === "enterprise" ? "$99.00" : user?.tier === "pro_insider" ? "$19.00" : "$0.00"}</div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-[var(--accent-emerald)] font-mono text-[11px] flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Paid
                </span>
                <button
                  onClick={() => alert("Simulated PDF receipt downloaded.")}
                  className="text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1"
                  title="Download Receipt"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
