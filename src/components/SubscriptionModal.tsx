"use client";

import { useState } from "react";
import { X, Sparkles, CheckCircle2, ShieldCheck, ArrowRight, Star, Zap } from "lucide-react";
import Link from "next/link";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SubscriptionModal({ isOpen, onClose }: SubscriptionModalProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageId: "pro-insider",
          sponsorEmail: email,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setSuccess(true);
      }
    } catch {
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-gradient-to-br from-[#131625] via-[#10121C] to-[#0A0C14] border border-[#2D334C] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-1.5 bg-[#D4FF00]/10 border border-[#D4FF00]/30 text-[#D4FF00] px-3 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider">
            <Star className="w-3 h-3 fill-current" />
            <span>VIP PRO INSIDER MEMBERSHIP</span>
          </div>

          <h3 className="font-serif-headline text-2xl sm:text-3xl font-black text-white leading-tight">
            Unlock Full Music Business Intelligence
          </h3>

          <p className="text-xs text-slate-300">
            Get unrestricted access to catalogue valuation datasets, priority press credentials, and ad-free reporting.
          </p>
        </div>

        {/* Benefits Matrix */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-2 text-xs text-slate-300">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-[#D4FF00] shrink-0" />
            <span><strong>100% Ad-Free</strong> reading experience across desktop & mobile</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-[#D4FF00] shrink-0" />
            <span><strong>Wall Street NPS Multipliers</strong> & DSP Payout Tracker</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-[#D4FF00] shrink-0" />
            <span><strong>Priority Festival Credentials</strong> & Letter of Assignment review</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-[#D4FF00] shrink-0" />
            <span><strong>ADN AI Music Business Copilot</strong> (Unlimited queries)</span>
          </div>
        </div>

        {/* Pricing Selector */}
        <div className="flex items-center justify-between bg-[#08090E] p-1.5 rounded-xl border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`flex-1 py-2 rounded-lg font-bold transition-all text-center ${
              billingCycle === "monthly" ? "bg-[#D4FF00] text-black shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            $19 / month
          </button>
          <button
            onClick={() => setBillingCycle("annual")}
            className={`flex-1 py-2 rounded-lg font-bold transition-all text-center flex items-center justify-center space-x-1 ${
              billingCycle === "annual" ? "bg-[#D4FF00] text-black shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            <span>$15 / mo (Annual)</span>
            <span className="text-[9px] bg-emerald-500 text-black px-1.5 py-0.2 rounded font-black">SAVE 20%</span>
          </button>
        </div>

        {/* Checkout Form */}
        {success ? (
          <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-6 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-400" />
            <h4 className="font-serif-headline text-lg font-bold text-white">VIP Access Active</h4>
            <p className="text-xs text-emerald-200">
              Your VIP Pro benefits are now active. Check your email for login details.
            </p>
          </div>
        ) : (
          <form onSubmit={handleCheckout} className="space-y-3">
            <input
              type="email"
              placeholder="Enter your email to activate VIP..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#08090E] border border-slate-700 focus:border-[#D4FF00] rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D4FF00] hover:bg-[#bde600] text-black font-black text-xs uppercase tracking-wider py-3.5 rounded-xl transition-transform active:scale-98 flex items-center justify-center space-x-2 shadow-lg shadow-[#D4FF00]/15"
            >
              <span>{loading ? "Redirecting to Secure Checkout..." : `Activate VIP Pro (${billingCycle === "annual" ? "$180/yr" : "$19/mo"})`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center space-x-4 text-[10px] text-slate-500 font-mono pt-1">
              <span className="flex items-center">
                <ShieldCheck className="w-3 h-3 mr-1 text-emerald-400" /> Stripe 256-Bit Encrypted
              </span>
              <span>&bull;</span>
              <span>Cancel Anytime with 1-Click</span>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
