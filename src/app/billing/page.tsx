"use client";

import { Header } from "@/components/Header";
import { BreakingTicker } from "@/components/BreakingTicker";
import { useAuth } from "@/components/AuthContext";
import { MOCK_ARTICLES } from "@/lib/mock-articles";
import { CreditCard, Download, ShieldCheck, CheckCircle2, ArrowRight, Zap, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function BillingPage() {
  const { user, upgradeTier } = useAuth();

  const tierNames = {
    free: "Free DIY Edition",
    pro_insider: "Pro Artist Insider ($19/mo)",
    enterprise: "Label & Roster Enterprise ($99/mo)",
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090A0F]">
      <Header />
      <BreakingTicker articles={MOCK_ARTICLES} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Subscription & Billing Portal
          </h1>
          <p className="text-xs text-slate-400 font-mono">
            Manage your payment method, plan tier, and past invoices
          </p>
        </div>

        {/* Current Plan Card */}
        <div className="bg-[#121420] border border-[#272B3F] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block">CURRENT ACTIVE PLAN</span>
              <div className="text-xl font-bold text-white mt-0.5 flex items-center space-x-2">
                <span>{tierNames[user?.tier || "free"]}</span>
                {user?.tier !== "free" && (
                  <span className="bg-[#D4FF00] text-black text-[10px] font-black uppercase px-2 py-0.5 rounded">
                    ACTIVE
                  </span>
                )}
              </div>
            </div>

            <Link
              href="/pricing"
              className="bg-[#D4FF00] hover:bg-[#bde600] text-black font-bold text-xs uppercase px-4 py-2.5 rounded-lg transition-transform active:scale-95 text-center shrink-0"
            >
              {user?.tier === "free" ? "Upgrade to Pro Insider" : "Change Plan"}
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-[#0A0B10] p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-500 font-mono block">BILLING EMAIL</span>
              <div className="text-white font-mono font-medium">{user?.email || "artist@adn.media"}</div>
            </div>

            <div className="bg-[#0A0B10] p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-500 font-mono block">PAYMENT METHOD</span>
              <div className="text-white font-mono flex items-center space-x-2">
                <CreditCard className="w-4 h-4 text-[#D4FF00]" />
                <span>•••• 4242 (Stripe Secure)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Invoice History */}
        <div className="bg-[#121420] border border-[#272B3F] rounded-2xl overflow-hidden shadow-xl">
          <div className="p-6 border-b border-slate-800 flex justify-between items-center text-xs font-mono">
            <span className="font-bold text-white uppercase">Invoice History</span>
            <span className="text-slate-500">Auto-Generated via Stripe</span>
          </div>

          <div className="divide-y divide-slate-800 text-xs">
            <div className="p-4 flex items-center justify-between hover:bg-slate-800/30">
              <div>
                <div className="font-bold text-white">Invoice #ADN-2026-08</div>
                <div className="text-slate-400 text-[11px] font-mono">Aug 27, 2026 &bull; {user?.tier === "enterprise" ? "$99.00" : user?.tier === "pro_insider" ? "$19.00" : "$0.00"}</div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-emerald-400 font-mono text-[11px] flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Paid
                </span>
                <button
                  onClick={() => alert("Simulated PDF receipt downloaded.")}
                  className="text-slate-400 hover:text-white p-1"
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
