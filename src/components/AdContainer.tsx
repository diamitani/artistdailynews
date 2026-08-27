"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Sparkles, Megaphone } from "lucide-react";

interface AdContainerProps {
  slotType: "leaderboard" | "in-feed" | "sidebar-mpu" | "bottom-anchor";
  adClient?: string; // e.g. ca-pub-XXXXXXXXXXXXXXXX
  adSlot?: string;
  className?: string;
}

export function AdContainer({ slotType, adClient, adSlot, className = "" }: AdContainerProps) {
  useEffect(() => {
    // If running in production with active Google AdSense
    try {
      if (typeof window !== "undefined" && (window as any).adsbygoogle && adClient) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (e) {
      console.warn("[AdSense Container]", e);
    }
  }, [adClient, adSlot]);

  // Dimension & Style Specs
  if (slotType === "leaderboard") {
    return (
      <div className={`w-full max-w-7xl mx-auto px-4 my-6 ${className}`}>
        <div className="bg-[#12131C] border border-[#272A38] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left relative overflow-hidden group">
          <div className="flex items-center space-x-3 mb-2 sm:mb-0">
            <div className="w-9 h-9 rounded-lg bg-[#D4FF00]/10 border border-[#D4FF00]/30 flex items-center justify-center text-[#D4FF00] shrink-0">
              <Megaphone className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 block">
                SPONSOR SPOTLIGHT // REACH 50K+ DIY ARTISTS
              </span>
              <p className="text-sm font-bold text-white">
                Promote Your Music Tech Tool, Mastering Engine, or Label Release Here
              </p>
            </div>
          </div>
          <Link
            href="/advertise"
            className="bg-[#D4FF00] hover:bg-[#bde600] text-black font-bold text-xs uppercase px-4 py-2 rounded transition-transform active:scale-95 shrink-0"
          >
            Book Placement ($149) &rarr;
          </Link>
        </div>
      </div>
    );
  }

  if (slotType === "sidebar-mpu") {
    return (
      <div className={`bg-[#12131C] border border-[#272A38] rounded-xl p-5 text-center space-y-3 ${className}`}>
        <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500 block">
          ADVERTISEMENT &bull; ADSENSE / SPONSOR
        </span>
        <div className="bg-[#181A26] border border-dashed border-slate-700/60 rounded-lg p-6 space-y-2">
          <div className="w-10 h-10 mx-auto rounded-full bg-[#D4FF00]/10 flex items-center justify-center text-[#D4FF00]">
            <Sparkles className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-white">The Front Page of the Artist World</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Get your plugins, services, or events in front of 35,000+ verified music professionals.
          </p>
        </div>
        <Link
          href="/advertise"
          className="inline-block w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs py-2 rounded transition-colors"
        >
          View Media Kit & Pricing
        </Link>
      </div>
    );
  }

  if (slotType === "in-feed") {
    return (
      <div className={`bg-gradient-to-r from-[#171924] to-[#12131C] border border-[#2A2E40] rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}>
        <div className="space-y-1.5 text-center sm:text-left">
          <span className="text-[10px] font-mono text-[#D4FF00] font-bold uppercase tracking-wider bg-[#D4FF00]/10 px-2 py-0.5 rounded border border-[#D4FF00]/20">
            ★ PARTNER SPOTLIGHT
          </span>
          <h3 className="text-base font-bold text-white">Streamline Your Release With DistroKid / LANDR</h3>
          <p className="text-xs text-slate-300">
            Unlimited uploads to Spotify, Apple Music & TikTok with 100% royalty retention. Exclusive ADN partner perks.
          </p>
        </div>
        <a
          href="https://distrokid.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white hover:bg-slate-200 text-black font-bold text-xs uppercase tracking-wider px-4 py-2 rounded shrink-0 transition-transform active:scale-95"
        >
          Claim Partner Perk &rarr;
        </a>
      </div>
    );
  }

  return null;
}
