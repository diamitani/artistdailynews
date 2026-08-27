"use client";

import Link from "next/link";
import { Zap } from "lucide-react";
import { Article } from "@/lib/types";

interface BreakingTickerProps {
  articles: Article[];
}

export function BreakingTicker({ articles }: BreakingTickerProps) {
  const breakingList = articles.filter((a) => a.isBreaking || a.isFeatured).slice(0, 6);
  const items = breakingList.length > 0 ? breakingList : articles.slice(0, 6);

  // Duplicate list to achieve continuous infinite marquee loop
  const displayItems = [...items, ...items];

  return (
    <div className="bg-[#12131A] border-b border-[#272A38] overflow-hidden py-2 text-xs flex items-center relative select-none">
      {/* Fixed Left Badge */}
      <div className="z-10 bg-[#FF3366] text-white font-black px-3 py-1 ml-2 rounded text-[10px] tracking-widest uppercase flex items-center space-x-1 shrink-0 shadow-md shadow-[#FF3366]/20">
        <Zap className="w-3 h-3 fill-current" />
        <span>BREAKING</span>
      </div>

      {/* Marquee Track */}
      <div className="flex overflow-hidden relative w-full mask-gradient">
        <div className="animate-ticker flex items-center space-x-8 pl-4">
          {displayItems.map((art, idx) => (
            <Link
              key={`${art.id}-${idx}`}
              href={`/news/${art.slug}`}
              className="inline-flex items-center space-x-2 text-slate-300 hover:text-[#D4FF00] transition-colors whitespace-nowrap group"
            >
              <span className="font-mono text-[10px] text-[#D4FF00] font-bold">[{art.category.toUpperCase()}]</span>
              <span className="font-medium group-hover:underline">{art.title}</span>
              <span className="text-slate-600 font-mono text-[10px]">&bull; {art.sourceName}</span>
              <span className="text-slate-700 mx-2">//</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
