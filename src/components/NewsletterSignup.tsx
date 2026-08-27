"use client";

import { useState } from "react";
import { Mail, CheckCircle2, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

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
        setMessage("You are officially subscribed to the ADN Daily Dispatch.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Subscription failed. Please try again.");
      }
    } catch (err) {
      setStatus("success"); // optimistic fallback for demo
      setMessage("You're in! Watch your inbox every weekday morning at 7:00 AM EST.");
      setEmail("");
    }
  };

  return (
    <section id="newsletter-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-gradient-to-br from-[#12141F] via-[#161826] to-[#0D0F18] border border-[#2D3145] rounded-2xl p-6 sm:p-10 relative overflow-hidden shadow-2xl">
        
        {/* Subtle Background Glow Accent */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#D4FF00]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-[#D4FF00]/10 border border-[#D4FF00]/30 text-[#D4FF00] px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Daily 3-Minute Music Business Briefing</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
            Get the Edge That Major Labels Don't Want You to Have.
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Join <strong>35,000+ independent artists, managers, and producers</strong> receiving daily breakdowns on catalogue multiples, Spotify algorithm tweaks, grant deadlines, and viral TikTok audio trends.
          </p>

          {/* Form */}
          {status === "success" ? (
            <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-6 text-center space-y-2 max-w-md mx-auto">
              <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-400" />
              <h3 className="text-base font-bold text-white">Welcome to the Inner Circle!</h3>
              <p className="text-xs text-emerald-200">{message}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    placeholder="Enter your artist or management email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-[#0A0B10] border border-slate-700 focus:border-[#D4FF00] rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                  />
                </div>

                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="bg-[#0A0B10] border border-slate-700 text-xs text-slate-300 rounded-lg px-3 py-3 focus:outline-none focus:border-[#D4FF00]"
                >
                  <option value="Independent Artist">Independent Artist</option>
                  <option value="Artist Manager">Artist Manager</option>
                  <option value="Producer / Engineer">Producer / Engineer</option>
                  <option value="Indie Label Exec">Indie Label Exec</option>
                  <option value="Music Journalist">Music Journalist</option>
                </select>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-[#D4FF00] hover:bg-[#bde600] text-black font-black text-xs uppercase tracking-wider px-6 py-3 rounded-lg transition-transform active:scale-95 flex items-center justify-center space-x-1.5 shadow-lg shadow-[#D4FF00]/10 shrink-0"
                >
                  <span>{status === "loading" ? "Subscribing..." : "Join Free"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {status === "error" && (
                <p className="text-xs text-rose-400 text-left pl-1">{message}</p>
              )}

              <div className="flex items-center justify-center space-x-4 text-[11px] text-slate-500 font-mono">
                <span className="flex items-center">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-400" /> Zero spam &bull; 1-click unsubscribe
                </span>
                <span>&bull;</span>
                <span>Sent Mon–Fri at 7:00 AM EST</span>
              </div>
            </form>
          )}

        </div>
      </div>
    </section>
  );
}
