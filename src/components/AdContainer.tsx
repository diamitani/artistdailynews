"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Sparkles, Megaphone } from "lucide-react";

interface AdContainerProps {
  slotType: "leaderboard" | "in-feed" | "sidebar-mpu" | "bottom-anchor";
  adClient?: string;
  adSlot?: string;
  className?: string;
}

export function AdContainer({ slotType, adClient, adSlot, className = "" }: AdContainerProps) {
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && (window as any).adsbygoogle && adClient) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (e) {
      console.warn("[AdSense Container]", e);
    }
  }, [adClient, adSlot]);

  if (slotType === "leaderboard") {
    return (
      <div className={`w-full max-w-7xl mx-auto px-4 my-6 ${className}`}>
        <div className="card-brand p-4 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left relative overflow-hidden">
          <div className="flex items-center space-x-3 mb-2 sm:mb-0">
            <div className="w-9 h-9 rounded-lg bg-[var(--accent-primary-light)] border border-[var(--accent-primary)]/20 flex items-center justify-center text-[var(--accent-primary)] shrink-0">
              <Megaphone className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[9px] font-mono uppercase tracking-widest text-[var(--text-muted)] block">
                SPONSOR SPOTLIGHT // REACH 50K+ DIY ARTISTS
              </span>
              <p className="text-sm font-serif font-bold text-[var(--text-primary)]">
                Promote Your Music Tech Tool, Mastering Engine, or Label Release Here
              </p>
            </div>
          </div>
          <Link
            href="/advertise"
            className="btn-brand text-xs px-4 py-2 shrink-0"
          >
            Book Placement ($149) &rarr;
          </Link>
        </div>
      </div>
    );
  }

  if (slotType === "sidebar-mpu") {
    return (
      <div className={`card-brand p-5 text-center space-y-3 ${className}`}>
        <span className="text-[9px] font-mono uppercase tracking-widest text-[var(--text-muted)] block">
          ADVERTISEMENT &bull; ADSENSE / SPONSOR
        </span>
        <div className="bg-[var(--bg-secondary)] border border-dashed border-[var(--border-color)] rounded-lg p-6 space-y-2">
          <div className="w-10 h-10 mx-auto rounded-full bg-[var(--accent-primary-light)] flex items-center justify-center text-[var(--accent-primary)]">
            <Sparkles className="w-5 h-5" />
          </div>
          <h4 className="font-serif font-bold text-sm text-[var(--text-primary)]">The Front Page of the Artist World</h4>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Get your plugins, services, or events in front of 35,000+ verified music professionals.
          </p>
        </div>
        <Link
          href="/advertise"
          className="btn-brand-outline inline-block w-full text-xs py-2"
        >
          View Media Kit & Pricing
        </Link>
      </div>
    );
  }

  if (slotType === "in-feed") {
    return (
      <div className={`card-brand p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}>
        <div className="space-y-1.5 text-center sm:text-left">
          <span className="text-[10px] font-mono text-[var(--accent-primary)] font-bold uppercase tracking-wider bg-[var(--bg-secondary)] px-2 py-0.5 rounded border border-[var(--border-color)]">
            ★ PARTNER SPOTLIGHT
          </span>
          <h3 className="font-serif text-base font-bold text-[var(--text-primary)]">Streamline Your Release With DistroKid / LANDR</h3>
          <p className="text-xs text-[var(--text-secondary)]">
            Unlimited uploads to Spotify, Apple Music & TikTok with 100% royalty retention. Exclusive ADN partner perks.
          </p>
        </div>
        <a
          href="https://distrokid.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-brand text-xs px-4 py-2 shrink-0"
        >
          Claim Partner Perk &rarr;
        </a>
      </div>
    );
  }

  return null;
}
