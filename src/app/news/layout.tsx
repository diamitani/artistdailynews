import React from "react";
import Link from "next/link";

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  // Mock auth state for layout purposes
  const isAuthenticated = true;

  return (
    <div className="min-h-screen bg-[#F6F1E8] text-[#111111] font-sans">
      <header className="border-b-4 border-[#111111] py-6 px-4 md:px-8 bg-[#F6F1E8]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end">
          <div>
            <h1 className="font-sans font-black text-5xl tracking-tighter uppercase leading-none text-[#111111]">
              <Link href="/news">ADN</Link>
              <span className="font-serif font-normal text-3xl ml-3 tracking-normal hidden md:inline-block">Artist Daily News</span>
            </h1>
            <p className="font-sans text-sm font-medium mt-1 text-[#111111]/70 uppercase tracking-widest hidden md:block">
              An Artispreneur publication
            </p>
          </div>
          <div className="flex flex-col items-end">
            {/* Top auth bar */}
            <div className="flex space-x-4 mb-4 text-xs font-sans font-bold uppercase tracking-widest text-[#111111]/60">
              {isAuthenticated ? (
                <>
                  <Link href="/news/newsroom/settings" className="hover:text-[#111111]">Settings</Link>
                  <Link href="/news/desk" className="hover:text-[#C0272D]">Desk</Link>
                  <button className="hover:text-[#111111]">Sign Out</button>
                </>
              ) : (
                <button className="hover:text-[#111111]">Log In</button>
              )}
            </div>
            {/* Main nav */}
            <nav className="flex space-x-4 md:space-x-6 font-sans font-semibold text-sm uppercase">
              <Link href="/news" className="hover:text-[#C0272D]">Today</Link>
              <Link href="/news/articles?pillar=culture" className="hover:text-[#C0272D] hidden sm:block">Culture</Link>
              <Link href="/news/articles?pillar=business" className="hover:text-[#C0272D] hidden sm:block">Business</Link>
              <Link href="/news/articles?pillar=ideas" className="hover:text-[#C0272D] hidden sm:block">Ideas</Link>
              <Link href="/news/articles" className="hover:text-[#C0272D]">Articles</Link>
              <Link href="/news/newsroom" className="text-[#C0272D] hover:underline">My Newsroom</Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">

        {children}
      </main>
      <footer className="border-t border-[#D9D1C4] mt-12 py-8 text-center text-sm font-sans text-[#111111]/70">
        <p>&copy; {new Date().getFullYear()} Artispreneur. Art means business.</p>
        <div className="mt-2 space-x-4">
          <Link href="/news/about" className="hover:text-[#C0272D]">About</Link>
          <Link href="/news/archive" className="hover:text-[#C0272D]">Archive</Link>
        </div>
      </footer>
    </div>
  );
}
