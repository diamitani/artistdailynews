import React from 'react';
import { adnDb } from '@/lib/adn-db';
import Link from 'next/link';

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function HomePage() {
  // Fetch latest items from Supabase
  const { data: rawItems, error } = await adnDb
    .from('adn_items')
    .select('*')
    .order('freshness', { ascending: false })
    .limit(50);

  const items = rawItems || [];

  // Group by pillar
  const cultureItems = items.filter(item => item.pillar === 'culture').slice(0, 6);
  const businessItems = items.filter(item => item.pillar === 'business').slice(0, 6);
  const ideasItems = items.filter(item => item.pillar === 'ideas').slice(0, 6);

  return (
    <div className="min-h-screen bg-[#F2F0E9] text-[#14130F] overflow-x-hidden">
      {/* Floating Navigation */}
      <nav className="fixed top-[18px] left-1/2 -translate-x-1/2 z-[100] px-[10px] py-[8px] pl-[22px] bg-transparent border border-transparent rounded-full flex items-center gap-[28px] transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] backdrop-blur-none hover:bg-[rgba(242,240,233,0.72)] hover:border-[rgba(20,19,15,0.10)] hover:backdrop-blur-[20px]">
        <Link href="/" className="flex items-center gap-[9px] font-bold text-[14px] tracking-tight text-[#14130F] no-underline">
          <span className="text-[#14130F]">Artis</span><span className="text-[#CC0000]">preneur</span>
        </Link>
        <div className="flex gap-[6px] items-center">
          <Link href="/news/desk" className="px-[14px] py-[7px] text-[13px] font-medium text-[#14130F] no-underline opacity-70 hover:opacity-100 rounded-full hover:bg-[rgba(20,19,15,0.06)] transition-all duration-[250ms]">
            Desk
          </Link>
          <Link href="/news/newsroom" className="px-[14px] py-[7px] text-[13px] font-medium text-[#14130F] no-underline opacity-70 hover:opacity-100 rounded-full hover:bg-[rgba(20,19,15,0.06)] transition-all duration-[250ms]">
            Newsroom
          </Link>
          <Link href="/tools" className="px-[14px] py-[7px] text-[13px] font-medium text-[#14130F] no-underline opacity-70 hover:opacity-100 rounded-full hover:bg-[rgba(20,19,15,0.06)] transition-all duration-[250ms]">
            Tools
          </Link>
          <Link href="/pricing" className="inline-flex items-center gap-[10px] px-[24px] py-[13px] text-[14px] font-semibold tracking-[-0.005em] rounded-full bg-[#CC0000] text-white shadow-[0_1px_2px_rgba(204,0,0,0.15),0_8px_24px_rgba(204,0,0,0.18)] hover:scale-[1.03] hover:translate-y-[-1px] transition-all duration-[350ms]">
            Subscribe
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-[6vw] py-[12vh] overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(20,19,15,0.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(20,19,15,0.04) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px',
              maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 80%)'
            }}
          />
        </div>

        <div className="relative z-10 max-w-[1280px] w-full text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-[8px] font-mono text-[11px] font-medium tracking-[0.16em] uppercase mb-6 opacity-60">
            <span className="inline-block w-[18px] h-[1px] bg-current opacity-60"></span>
            Daily Intelligence
          </div>

          {/* Headline */}
          <h1 className="font-bold text-[clamp(48px,8.4vw,112px)] leading-[0.96] tracking-[-0.035em] mb-6">
            Music Business News
            <em className="block font-serif italic font-medium text-[clamp(60px,11vw,160px)] leading-[0.92] tracking-[-0.045em] text-[#FED001] not-italic">
              Built for Creators
            </em>
          </h1>

          {/* Subheadline */}
          <p className="max-w-[620px] mx-auto text-[clamp(15px,1.5vw,18px)] leading-[1.7] text-[#3F3D37] mb-10">
            Stay ahead with daily news, podcasts, and on-the-ground reporting from BET Awards, Lollapalooza, and beyond—curated specifically for independent artists.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-[10px] px-[32px] py-[16px] text-[16px] font-semibold tracking-[-0.005em] rounded-full bg-[#CC0000] text-white shadow-[0_1px_2px_rgba(204,0,0,0.15),0_8px_24px_rgba(204,0,0,0.18)] hover:scale-[1.03] hover:translate-y-[-1px] transition-all duration-[350ms]"
            >
              Get Started Free
            </Link>
            <Link
              href="#news"
              className="inline-flex items-center gap-[10px] px-[32px] py-[16px] text-[16px] font-semibold tracking-[-0.005em] rounded-full bg-transparent text-[#14130F] border border-current opacity-85 hover:opacity-100 hover:scale-[1.03] hover:translate-y-[-1px] transition-all duration-[350ms]"
            >
              Explore Content
            </Link>
          </div>

          {/* Trust Line */}
          <div className="flex gap-8 justify-center flex-wrap mt-12 font-mono text-[11px] tracking-[0.08em] text-[rgba(20,19,15,0.4)] uppercase">
            <span className="inline-flex items-center gap-2">
              <span className="inline-block w-[5px] h-[5px] rounded-full bg-[#CC0000]"></span>
              35,000+ Artists
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="inline-block w-[5px] h-[5px] rounded-full bg-[#CC0000]"></span>
              Daily Briefings
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="inline-block w-[5px] h-[5px] rounded-full bg-[#CC0000]"></span>
              Trusted Since 2024
            </span>
          </div>
        </div>
      </section>

      {/* Main News Section */}
      <section id="news" className="relative px-[6vw] py-[clamp(80px,12vw,120px)]">
        <div className="max-w-[1280px] mx-auto">
          {/* Section Header */}
          <div className="max-w-[780px] mb-[clamp(48px,6vw,80px)]">
            <div className="inline-flex items-center gap-[8px] font-mono text-[11px] font-medium tracking-[0.16em] uppercase mb-4 opacity-60">
              <span className="inline-block w-[18px] h-[1px] bg-current opacity-60"></span>
              Today's Briefing
            </div>
            <h2 className="font-bold text-[clamp(34px,5vw,56px)] leading-[1.0] tracking-[-0.03em]">
              What <em className="font-serif italic font-medium text-[#CC0000] not-italic">You Need</em> to Know
            </h2>
          </div>

          {/* Three-Column News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px]">
            <PillarColumn title="Business" items={businessItems} accentColor="#14130F" />
            <PillarColumn title="Culture" items={cultureItems} accentColor="#CC0000" />
            <PillarColumn title="Ideas" items={ideasItems} accentColor="#FED001" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-[6vw] py-[clamp(80px,12vw,120px)] bg-[#14130F] text-white">
        <div className="max-w-[880px] mx-auto text-center">
          <h2 className="font-bold text-[clamp(38px,5.5vw,64px)] leading-[1.0] tracking-[-0.03em] mb-6">
            Never Miss <em className="font-serif italic font-medium text-[#FED001] not-italic">a Beat</em>
          </h2>
          <p className="text-[clamp(15px,1.4vw,17px)] leading-[1.7] text-[rgba(255,255,255,0.6)] mb-10">
            Join 35,000+ independent artists getting the daily briefing in their inbox every morning at 6 AM EST.
          </p>
          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-[10px] px-[32px] py-[16px] text-[16px] font-semibold tracking-[-0.005em] rounded-full bg-[#FED001] text-[#14130F] hover:scale-[1.03] hover:translate-y-[-1px] transition-all duration-[350ms]"
          >
            Subscribe Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#14130F] text-white px-[6vw] py-[80px] pt-[60px]">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="font-bold text-[18px] mb-2">
                Artis<span className="text-[#CC0000]">preneur</span>
              </div>
              <p className="font-serif italic text-[16px] leading-[1.55] text-[rgba(255,255,255,0.55)] max-w-[320px]">
                Music business intelligence for independent artists, by artists.
              </p>
            </div>

            <div>
              <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-[rgba(255,255,255,0.4)] mb-5">Content</div>
              <Link href="/news" className="block py-[5px] text-[14px] text-[rgba(255,255,255,0.7)] hover:text-[#FED001] transition-colors">News</Link>
              <Link href="/podcasts" className="block py-[5px] text-[14px] text-[rgba(255,255,255,0.7)] hover:text-[#FED001] transition-colors">Podcasts</Link>
              <Link href="/tools" className="block py-[5px] text-[14px] text-[rgba(255,255,255,0.7)] hover:text-[#FED001] transition-colors">Tools</Link>
              <Link href="/press-pass" className="block py-[5px] text-[14px] text-[rgba(255,255,255,0.7)] hover:text-[#FED001] transition-colors">Press Pass</Link>
            </div>

            <div>
              <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-[rgba(255,255,255,0.4)] mb-5">Company</div>
              <Link href="/network" className="block py-[5px] text-[14px] text-[rgba(255,255,255,0.7)] hover:text-[#FED001] transition-colors">Network</Link>
              <Link href="/advertise" className="block py-[5px] text-[14px] text-[rgba(255,255,255,0.7)] hover:text-[#FED001] transition-colors">Advertise</Link>
              <Link href="/pricing" className="block py-[5px] text-[14px] text-[rgba(255,255,255,0.7)] hover:text-[#FED001] transition-colors">Pricing</Link>
            </div>

            <div>
              <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-[rgba(255,255,255,0.4)] mb-5">Legal</div>
              <Link href="/privacy" className="block py-[5px] text-[14px] text-[rgba(255,255,255,0.7)] hover:text-[#FED001] transition-colors">Privacy</Link>
              <Link href="/terms" className="block py-[5px] text-[14px] text-[rgba(255,255,255,0.7)] hover:text-[#FED001] transition-colors">Terms</Link>
            </div>
          </div>

          <div className="pt-7 border-t border-[rgba(255,255,255,0.08)] flex justify-between items-center flex-wrap gap-3 font-mono text-[11px] tracking-[0.06em] text-[rgba(255,255,255,0.4)]">
            <div>© {new Date().getFullYear()} Artispreneur. All rights reserved.</div>
            <div className="inline-flex items-center gap-2 uppercase tracking-[0.16em]">
              <span className="inline-block w-[7px] h-[7px] rounded-full bg-[#4ADE80] animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.6)]"></span>
              All Systems Operational
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Pillar Column Component
function PillarColumn({ title, items, accentColor }: { title: string; items: any[]; accentColor: string }) {
  return (
    <div className="flex flex-col">
      <div className="mb-6 pb-4 border-b-2" style={{ borderColor: accentColor }}>
        <h3 className="font-bold text-[24px] uppercase tracking-wider" style={{ color: accentColor }}>
          {title}
        </h3>
      </div>

      {items.length === 0 ? (
        <p className="text-[#827C75] font-mono text-[12px]">No items available</p>
      ) : (
        <div className="space-y-8">
          {items.map((item, idx) => (
            <article key={idx} className="group">
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="block">
                <h4 className="font-serif text-[20px] font-semibold text-[#14130F] group-hover:text-[#CC0000] leading-tight mb-2 transition-colors">
                  {item.title}
                </h4>
                {item.dek && (
                  <p className="text-[13px] text-[#3F3D37] leading-relaxed line-clamp-2 mb-3">
                    {item.dek}
                  </p>
                )}
                <div className="flex items-center gap-3">
                  <span className="text-[10px] uppercase tracking-[0.16em] font-black text-[#14130F] bg-[#EBE5D9] px-2 py-1 rounded">
                    {item.source_name || "Unknown"}
                  </span>
                  <span className="text-[11px] font-mono text-[#827C75]">
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
}
