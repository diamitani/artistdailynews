import React from 'react';
import Link from 'next/link';

export default function DailyPostHomepage() {
  const currentDate = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase();
  
  return (
    <div className="border-t-2 border-[#111111] pt-4">
      {/* Issue Header */}
      <div className="flex justify-between font-sans text-xs font-bold text-[#111111] uppercase tracking-widest border-b-2 border-[#111111] pb-4 mb-8">
        <span>{currentDate} · ISSUE 001 · CHICAGO / GLOBAL</span>
      </div>

      {/* Hero Essay Section */}
      <section className="mb-12 max-w-3xl mx-auto">
        <div className="bg-[#111111] text-[#F6F1E8] inline-block px-3 py-1 font-sans font-bold text-xs uppercase tracking-widest mb-4">
          Kicker: CULTURE
        </div>
        <h2 className="font-serif text-5xl leading-tight font-bold text-[#111111] mb-4">
          The sound that ate Friday
        </h2>
        <p className="font-sans text-lg font-medium text-[#C1121F] mb-6 border-l-4 border-[#C1121F] pl-4">
          One sentence, what happened + why an independent should care.
        </p>
        
        <div className="font-serif text-lg leading-relaxed text-[#111111]/90 space-y-5">
          <p>
            The first paragraph contains the fact. We do not open with atmosphere. We state the news clearly, avoiding consultant-speak and generic hype.
          </p>
          <p>
            The second and third paragraphs delve into the zeitgeist or the money. This is where we break down the economics of the platform change, or the cultural rupture that is happening in real time. We use concrete examples.
          </p>
          <p>
            Every claim needs a source URL. If we cannot source it, we drop it. The music industry changes, but we focus on what exactly happened today.
          </p>
          <p className="font-bold">
            Action: Check your ASCAP / BMI registration and ensure your splits are documented.
          </p>
          <p className="italic border-t border-[#D9D1C4] pt-4 mt-8">
            "Art means business. Protect your catalog before the weekend hits."
          </p>
        </div>

        <div className="mt-8 flex space-x-4">
          <button className="bg-[#111111] text-[#F6F1E8] px-6 py-2 font-sans font-bold uppercase text-sm hover:bg-[#C1121F] transition-colors">
            Read Full
          </button>
          <button className="border border-[#111111] text-[#111111] px-6 py-2 font-sans font-bold uppercase text-sm hover:bg-[#D9D1C4] transition-colors">
            Listen 4:00
          </button>
        </div>
      </section>

      {/* Rails */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t-4 border-[#111111] pt-8">
        {/* Culture Rail */}
        <div>
          <h3 className="font-sans font-black text-xl uppercase border-b border-[#D9D1C4] pb-2 mb-4 text-[#111111]">
            Culture
          </h3>
          <div className="space-y-4">
            <RailItem title="TikTok's new algorithm favors micro-genres" platform="TikTok" time="2 hours ago" />
            <RailItem title="Pitchfork names new EIC" platform="Web" time="5 hours ago" />
            <RailItem title="Chicago's Radius announces fall lineup" platform="Web" time="12 hours ago" />
          </div>
        </div>

        {/* Business Rail */}
        <div>
          <h3 className="font-sans font-black text-xl uppercase border-b border-[#D9D1C4] pb-2 mb-4 text-[#111111]">
            Business
          </h3>
          <div className="space-y-4">
            <RailItem title="Spotify adjusts mechanical royalty rates" platform="Web" time="1 hour ago" />
            <RailItem title="Universal Music Q2 earnings breakdown" platform="Email" time="4 hours ago" />
            <RailItem title="Live Nation faces new regulatory scrutiny" platform="Web" time="8 hours ago" />
          </div>
        </div>

        {/* Ideas Rail */}
        <div>
          <h3 className="font-sans font-black text-xl uppercase border-b border-[#D9D1C4] pb-2 mb-4 text-[#111111]">
            Ideas
          </h3>
          <div className="space-y-4">
            <RailItem title="Questlove on the anatomy of a groove" platform="Podcast" time="Yesterday" />
            <RailItem title="How to build an email list from scratch" platform="YouTube" time="2 days ago" />
          </div>
        </div>
      </section>

      {/* Newsroom CTA */}
      <section className="mt-16 bg-[#111111] p-8 text-center text-[#F6F1E8]">
        <h2 className="font-serif text-3xl font-bold mb-4">Make this about your catalog</h2>
        <p className="font-sans text-lg mb-6 max-w-xl mx-auto opacity-80">
          Get a personalized digest filtered by your genre and city. Never miss an opportunity in your scene.
        </p>
        <Link href="/news/newsroom" className="inline-block bg-[#C1121F] text-[#F6F1E8] px-8 py-3 font-sans font-bold uppercase tracking-wide hover:bg-red-700 transition-colors">
          Go to Newsroom
        </Link>
      </section>
    </div>
  );
}

function RailItem({ title, platform, time }: { title: string, platform: string, time: string }) {
  return (
    <Link href="#" className="block group">
      <div className="flex justify-between items-center text-[10px] font-sans font-bold text-[#111111]/60 uppercase tracking-wider mb-1">
        <span>{platform}</span>
        <span>{time}</span>
      </div>
      <h4 className="font-serif text-md font-semibold leading-tight group-hover:text-[#C1121F] transition-colors">
        {title}
      </h4>
    </Link>
  );
}
