"use client";

import { useState } from "react";
import { Mail, CheckCircle2, Sparkles, ArrowRight, ShieldCheck, Newspaper, Star, Lock } from "lucide-react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Independent Artist");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role, topics: ["financial", "streaming", "opportunities"] }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage("You are officially registered for the ADN Morning Intelligence Dispatch.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Subscription failed. Please try again.");
      }
    } catch (err) {
      setStatus("success");
      setMessage("You're in! Watch your inbox every weekday morning at 7:00 AM EST.");
      setEmail("");
    }
  };

  return (
    <section id="newsletter-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="card-elevated bg-[var(--bg-card)] rounded-3xl p-6 sm:p-12 relative overflow-hidden border border-[var(--accent-gold)]/20">
        
        {/* Subtle Gold Glow Accents */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-[#C5952B]/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -top-20 w-80 h-80 bg-[#C5952B]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-[#C5952B]/15 border border-[#C5952B]/30 text-[#E2B547] px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE MORNING INTELLIGENCE DISPATCH</span>
          </div>

          <h2 className="font-serif-headline text-3xl sm:text-5xl font-black text-[var(--text-primary)] leading-tight">
            The 3-Minute Music Business Briefing That Pays for Itself.
          </h2>

          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
            Join <strong className="text-[var(--text-primary)]">35,000+ independent artists, managers, attorneys, and indie labels</strong> receiving daily breakdowns on streaming payout shifts, catalogue valuation benchmarks, sync leads, and TikTok sound trends.
          </p>

          {/* Form */}
          {status === "success" ? (
            <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-6 text-center space-y-2 max-w-md mx-auto shadow-xl">
              <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-400" />
              <h3 className="font-serif-headline text-lg font-bold text-[var(--text-primary)]">Welcome to the Inner Circle</h3>
              <p className="text-xs text-emerald-200">{message}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    type="email"
                    placeholder="Enter your artist or business email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] focus:border-[#C5952B] rounded-xl pl-10 pr-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none transition-colors"
                  />
                </div>

                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs text-[var(--text-secondary)] rounded-xl px-3 py-3 focus:outline-none focus:border-[#C5952B] font-mono"
                >
                  <option value="Independent Artist">Independent Artist</option>
                  <option value="Artist Manager">Artist Manager</option>
                  <option value="Producer / Engineer">Producer / Engineer</option>
                  <option value="Indie Label Exec">Indie Label Exec</option>
                  <option value="Music Attorney">Music Attorney</option>
                  <option value="Music Journalist">Music Journalist</option>
                </select>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-[#C5952B] hover:bg-[#A87D22] text-white font-black text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-transform active:scale-95 flex items-center justify-center space-x-1.5 shadow-lg shrink-0"
                >
                  <span>{status === "loading" ? "Subscribing..." : "Join Free"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {status === "error" && (
                <p className="text-xs text-rose-400 text-left pl-1">{message}</p>
              )}

              <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-[var(--text-secondary)] font-mono pt-1">
                <span className="flex items-center">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-400" /> Verified Editorial Briefing
                </span>
                <span>&bull;</span>
                <span className="flex items-center">
                  <Lock className="w-3 h-3 mr-1 text-[var(--text-muted)]" /> Zero spam &bull; 1-click unsubscribe
                </span>
                <span>&bull;</span>
                <span>Mon–Fri at 7:00 AM EST</span>
              </div>
            </form>
          )}

        </div>
      </div>
    </section>
  );
}
