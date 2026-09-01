import Link from "next/link";
import { Radio, Rss, ShieldCheck, Mail, ExternalLink, Gift, Bot, BarChart3, TrendingUp, Mic2, Star, Sparkles } from "lucide-react";

const SECTIONS = [
  { href: "/topics/financial", label: "Business", icon: TrendingUp, color: "#047857" },
  { href: "/topics/streaming", label: "Culture", icon: Mic2, color: "#C0272D" },
  { href: "/topics/features", label: "Features", icon: Star, color: "#8B5CF6" },
];

const ECOSYSTEM_LINKS = [
  { href: "/network", label: "Partner Deals", icon: Gift, highlight: true, gold: true },
  { href: "/tools", label: "Financial Lab", icon: BarChart3 },
  { href: "/chat", label: "AI Copilot", icon: Bot },
  { href: "/podcasts", label: "Podcasts", icon: Radio },
  { href: "/newsletters", label: "Newsletter", icon: Mail },
  { href: "/press-pass", label: "Press Credentials", icon: ShieldCheck },
];

const BUSINESS_LINKS = [
  { href: "/pricing", label: "VIP Pro Membership" },
  { href: "/advertise", label: "Advertise With Us" },
  { href: "/advertise#sponsor-packages", label: "Sponsor Newsletter" },
  { href: "/api/news/feed?format=rss", label: "RSS Feed", external: true, icon: Rss },
];

export function Footer() {
  return (
    <footer className="bg-[var(--bg-primary)] border-t border-[var(--border-color)] text-[var(--text-secondary)]">
      {/* Newsletter CTA */}
      <div className="border-b border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="font-serif text-xl font-bold text-[var(--text-primary)] mb-1">
                Stay informed on the music business
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Daily intelligence delivered at 6am. Join 35,000+ music professionals.
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3 sm:w-auto w-full">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 sm:w-64 px-4 py-2.5 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] text-sm"
              />
              <button className="btn-brand px-6 py-2.5 text-sm whitespace-nowrap">
                Subscribe Free
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative flex items-center">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-primary)] flex flex-col items-center justify-center text-white font-black shadow-sm group-hover:scale-105 transition-all">
                  <span className="text-[13px] tracking-wider leading-none font-mono font-black">ADN</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] p-0.5 shadow-sm overflow-hidden flex items-center justify-center">
                  <img src="/artispreneur-logo.png" alt="Artispreneur" className="w-full h-full object-contain" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg text-[var(--text-primary)] tracking-tight">
                  ARTIST DAILY <span className="text-[var(--accent-primary)]">NEWS</span>
                </span>
                <span className="text-[9px] font-mono tracking-widest text-[var(--text-muted)] uppercase">
                  Powered by <strong className="text-[var(--accent-primary)]">Artispreneur</strong>
                </span>
              </div>
            </Link>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-sm">
              The premier intelligence platform for independent musicians, managers, and indie labels.
              Aggregating 50+ music industry feeds with AI-powered synthesis.
            </p>

            <div className="p-4 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-color)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-white p-1 border border-[var(--border-color)] flex items-center justify-center shrink-0">
                    <img src="/artispreneur-logo.png" alt="Artispreneur" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[var(--text-primary)]">Part of Artispreneur</div>
                    <div className="text-[10px] font-mono text-[var(--text-muted)]">Music Business Operating System</div>
                  </div>
                </div>
                <a
                  href="https://artispreneur.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent-primary)] hover:underline font-mono text-[10px] font-bold flex items-center"
                >
                  <span>Visit</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-[11px] font-mono text-[var(--text-muted)]">
              <span className="flex items-center">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-[var(--accent-emerald)]" />
                Verified Press Entity
              </span>
              <span>·</span>
              <span>ISSN Registered</span>
            </div>
          </div>

          {/* Sections Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[var(--text-primary)] font-bold">
              Sections
            </h4>
            <ul className="space-y-3">
              {SECTIONS.map((section) => (
                <li key={section.href}>
                  <Link
                    href={section.href}
                    className="flex items-center space-x-2 text-sm hover:text-[var(--text-primary)] transition-colors"
                    style={{ color: section.color }}
                  >
                    <section.icon className="w-4 h-4" />
                    <span className="font-medium">{section.label}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/news" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  Today's Briefing
                </Link>
              </li>
            </ul>
          </div>

          {/* Ecosystem Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[var(--text-primary)] font-bold">
              Creator Ecosystem
            </h4>
            <ul className="space-y-3">
              {ECOSYSTEM_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex items-center space-x-2 text-sm transition-colors ${
                      link.gold
                        ? 'text-[var(--color-gold)] font-medium hover:text-[var(--color-gold-hover)]'
                        : link.highlight
                        ? 'text-[var(--accent-primary)] font-medium hover:text-[var(--accent-primary-hover)]'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <link.icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[var(--text-primary)] font-bold">
              For Business
            </h4>
            <ul className="space-y-3">
              {BUSINESS_LINKS.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    >
                      {link.icon && <link.icon className="w-4 h-4 text-orange-500" />}
                      <span>{link.label}</span>
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {/* VIP CTA — Gold for Premium Upgrade */}
            <div className="pt-4">
              <Link
                href="/pricing"
                className="btn-brand-gold px-4 py-2 text-sm"
              >
                <Sparkles className="w-4 h-4" />
                Get VIP Pro
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[var(--border-color)] py-5 text-[var(--text-muted)] text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} Artist Daily News · Powered by{" "}
            <a
              href="https://artispreneur.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent-primary)] hover:underline font-semibold"
            >
              Artispreneur
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[var(--text-muted)]">
            <Link href="/" className="hover:text-[var(--text-secondary)] transition-colors">Home</Link>
            <Link href="/news" className="hover:text-[var(--text-secondary)] transition-colors">Today</Link>
            <Link href="/podcasts" className="hover:text-[var(--text-secondary)] transition-colors">Podcasts</Link>
            <Link href="/press-pass" className="hover:text-[var(--text-secondary)] transition-colors">Press Pass</Link>
            <Link href="/advertise" className="hover:text-[var(--text-secondary)] transition-colors">Advertise</Link>
            <span className="font-mono text-[10px] text-[var(--border-highlight)]">v3.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
