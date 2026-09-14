"use client";

import { useState } from "react";
import { BreakingTicker } from "@/components/BreakingTicker";
import { PressPassModal } from "@/components/PressPassModal";
import { PressBadgeGenerator } from "@/components/PressBadgeGenerator";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { MOCK_ARTICLES } from "@/lib/mock-articles";
import { Ticket, ShieldCheck, Camera, Newspaper, Video, Award, ArrowRight, Sparkles } from "lucide-react";

export default function PressPassPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] justify-between">
      <BreakingTicker articles={MOCK_ARTICLES} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 w-full">
        
        {/* Hero */}
        <div className="card-brand p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="inline-flex items-center space-x-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--accent-primary)] px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
              <Ticket className="w-3.5 h-3.5" />
              <span>ADN Creator Badge</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] leading-tight">
              A Digital Media Badge for Independent Creators
            </h1>

            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
              Generate a free digital media badge for your EPK, socials, and email signature. It&rsquo;s a self-issued identity card from <strong>Artist Daily News</strong> — <strong>not</strong> official festival accreditation. It doesn&rsquo;t grant venue, pit, or backstage access; real press credentials are issued by each event&rsquo;s own PR team.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setModalOpen(true)}
                className="btn-brand px-7 py-3.5 flex items-center space-x-2"
              >
                <span>Get Your Badge</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#badge-preview"
                className="btn-brand-outline px-6 py-3.5 flex items-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-[var(--accent-primary)]" />
                <span>Customize Digital Badge</span>
              </a>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-brand p-6 space-y-3">
            <Camera className="w-6 h-6 text-[var(--accent-primary)]" />
            <h3 className="font-serif font-bold text-[var(--text-primary)] text-lg">A Badge for Your EPK</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              A shareable digital badge for your electronic press kit, social profiles, and email signature — made for independent artists.
            </p>
          </div>

          <div className="card-brand p-6 space-y-3">
            <Newspaper className="w-6 h-6 text-[var(--accent-emerald)]" />
            <h3 className="font-serif font-bold text-[var(--text-primary)] text-lg">Free, Always</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Generate and share your badge in seconds. No applications, no waiting periods, no fine print.
            </p>
          </div>

          <div className="card-brand p-6 space-y-3">
            <Video className="w-6 h-6 text-[var(--accent-blue)]" />
            <h3 className="font-serif font-bold text-[var(--text-primary)] text-lg">Join the Daily Brief</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Pair your badge with the weekday morning briefing on streaming, sync, releases, and release strategy.
            </p>
          </div>
        </div>

        {/* Live Badge Generator Preview */}
        <PressBadgeGenerator />

      </main>

      <NewsletterSignup />

      <PressPassModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
