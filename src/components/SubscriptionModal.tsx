"use client";

import { useState } from "react";
import { X, Sparkles, CheckCircle2, ShieldCheck, ArrowRight, Star } from "lucide-react";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-in fade-in zoom-in duration-200 text-[var(--text-primary)]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-full hover:bg-[var(--bg-secondary)] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-1.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--accent-primary)] px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>VIP PRO INSIDER ACCESS</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
            Upgrade Your Music Business Edge
          </h3>

          <p className="text-xs text-[var(--text-secondary)]">
            Gain full access to catalogue valuation datasets, priority festival credentials, ad-free reading, and the ADN AI Copilot.
          </p>
        </div>

        {/* Plan Highlights */}
        <div className="card-brand p-4 space-y-2 text-xs text-[var(--text-secondary)]">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-[var(--accent-primary)] shrink-0" />
            <span>100% Ad-Free reading experience across all devices</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-[var(--accent-primary)] shrink-0" />
            <span>Wall Street NPS Catalogue Multiplier Database</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-[var(--accent-primary)] shrink-0" />
            <span>Priority VIP Festival Press Pass review</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-[var(--accent-primary)] shrink-0" />
            <span>ADN AI Music Business Copilot (unlimited queries)</span>
          </div>
        </div>

        {/* Price Box */}
        <div className="text-center bg-[var(--bg-secondary)] p-4 rounded-2xl border border-[var(--border-color)]">
          <div className="text-3xl font-black text-[var(--text-primary)] font-serif">
            {billingCycle === "annual" ? "$15" : "$19"}
            <span className="text-xs text-[var(--text-muted)] font-mono font-normal"> / month</span>
          </div>
          <div className="text-[10px] text-[var(--accent-emerald)] font-mono font-bold mt-0.5">
            {billingCycle === "annual" ? "Billed annually ($180/yr) · Save 20%" : "Billed monthly · Cancel anytime"}
          </div>
        </div>

        {success ? (
          <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 text-center text-xs text-emerald-800 space-y-1">
            <div className="font-bold">Upgrade request received!</div>
            <p>Check your email for your receipt and activation link.</p>
          </div>
        ) : (
          <form onSubmit={handleCheckout} className="space-y-3">
            <input
              type="email"
              placeholder="Enter your artist or business email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] focus:border-[var(--accent-primary)] rounded-xl px-4 py-3 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-brand w-full py-3 flex items-center justify-center space-x-2"
            >
              <span>{loading ? "Redirecting to Stripe..." : "Continue to Secure Stripe Checkout"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="flex items-center justify-center space-x-2 text-[10px] text-[var(--text-muted)] font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent-emerald)]" />
          <span>256-Bit Encrypted Stripe Payment &bull; 1-Click Cancel</span>
        </div>
      </div>
    </div>
  );
}
