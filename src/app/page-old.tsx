import React from 'react';
import { adnDb } from '@/lib/adn-db';
import Link from 'next/link';

export const dynamic = "force-dynamic";
export const revalidate = 60; // Revalidate every minute

export default async function HomePage() {
  // Fetch latest items from Supabase
  const { data: rawItems, error } = await adnDb
    .from('adn_items')
    .select('*')
    .order('freshness', { ascending: false })
    .limit(50);

  const items = rawItems || [];

  // Group by pillar
  const cultureItems = items.filter(item => item.pillar === 'culture').slice(0, 5);
  const businessItems = items.filter(item => item.pillar === 'business').slice(0, 5);
  const ideasItems = items.filter(item => item.pillar === 'ideas').slice(0, 5);

  const PillarSection = ({ title, items, color }: { title: string, items: any[], color: string }) => (
    <div className="flex flex-col space-y-6">
      <h2 className="font-sans font-black text-3xl uppercase tracking-wider" style={{ color }}>
        {title}
      </h2>
      <div className="h-1 w-full bg-[#D9D1C4] mb-4"></div>
      
      {items.length === 0 ? (
        <p className="text-[#6B7280] font-mono text-sm">No dispatches currently available.</p>
      ) : (
        <div className="space-y-8">
          {items.map((item, idx) => (
            <article key={idx} className="group">
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="block space-y-2">
                <h3 className="font-serif text-2xl font-bold text-[#111111] group-hover:text-[#C0272D] leading-tight transition-colors">
                  {item.title}
                </h3>
                {item.dek && (
                  <p className="font-sans text-sm text-[#3D3D3D] leading-relaxed line-clamp-2">
                    {item.dek}
                  </p>
                )}
                <div className="flex items-center space-x-3 pt-2">
                  <span className="text-[10px] uppercase tracking-widest font-black text-[#111111] bg-[#EBE5D9] px-2 py-1">
                    {item.source_name || "Unknown"}
                  </span>
                  <span className="text-xs font-mono text-[#6B7280]">
                    {new Date(item.freshness).toLocaleDateString()}
                  </span>
                </div>
              </a>
            </article>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F6F1E8] text-[#111111] font-sans">
      
      {/* Clean Minimal Header */}
      <header className="border-b-2 border-[#111111] py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="font-sans font-black text-5xl uppercase tracking-tighter text-[#111111]">
            Artis<span className="text-[#C0272D]">preneur</span>
          </h1>
          <p className="font-serif text-xl italic text-[#3D3D3D] mt-2">
            Intelligence for independent artists.
          </p>
        </div>
        
        <div className="flex space-x-6 font-mono text-sm uppercase tracking-wider font-bold">
          <Link href="/news/desk" className="hover:text-[#C0272D] transition-colors">Operator Desk</Link>
          <Link href="/news/newsroom" className="hover:text-[#C0272D] transition-colors">My Newsroom</Link>
        </div>
      </header>

      {/* Main 3-Column Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          <PillarSection title="Business" items={businessItems} color="#111111" />
          <PillarSection title="Culture" items={cultureItems} color="#C0272D" />
          <PillarSection title="Ideas" items={ideasItems} color="#111111" />
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-[#D9D1C4] mt-24 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <p className="font-mono text-xs text-[#6B7280] uppercase tracking-widest">
          Art Means Business. © {new Date().getFullYear()} Artispreneur.
        </p>
      </footer>
    </div>
  );
}
