"use client";

import { useState } from "react";
import { BreakingTicker } from "@/components/BreakingTicker";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { MOCK_ARTICLES } from "@/lib/mock-articles";
import { SPONSORSHIP_PACKAGES } from "@/lib/feeds-config";
import { Megaphone, Users, Eye, Mail, CheckCircle2, ArrowRight, Sparkles, ShieldCheck, Download, Palette, FileText, Check } from "lucide-react";

export default function AdvertisePage() {
  const [bookingPackage, setBookingPackage] = useState<string | null>(null);
  const [sponsorName, setSponsorName] = useState("");
  const [sponsorEmail, setSponsorEmail] = useState("");
  const [ctaUrl, setCtaUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleCheckout = async (pkgId: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageId: pkgId,
          sponsorName: sponsorName || "ADN Advertiser",
          sponsorEmail: sponsorEmail || "sponsor@brand.com",
          ctaUrl: ctaUrl || "https://artistdailynews.com",
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setSuccessMsg("Sponsorship reserved! Our ad team will reach out within 2 hours to confirm banner assets.");
      }
    } catch {
      setSuccessMsg("Sponsorship reserved in test mode! We'll confirm your placement shortly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] justify-between">
      <BreakingTicker articles={MOCK_ARTICLES} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 w-full">
        
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--accent-primary)] px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
            <Megaphone className="w-3.5 h-3.5" />
            <span>2026 Official Media Kit & Rate Card</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] leading-tight">
            Reach 35,000+ Verified Music Creators & Label Executives
          </h1>

          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
            Directly market your audio gear, distribution service, plug-in suite, law firm, or music tech software to independent rights holders who invest in their business.
          </p>
        </div>

        {/* Audience Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card-brand p-5 text-center space-y-1">
            <Users className="w-5 h-5 mx-auto text-[var(--accent-primary)]" />
            <div className="text-2xl font-black text-[var(--text-primary)] font-mono">35,400+</div>
            <div className="text-xs text-[var(--text-muted)] font-mono">Active Monthly Readers</div>
          </div>

          <div className="card-brand p-5 text-center space-y-1">
            <Eye className="w-5 h-5 mx-auto text-[var(--accent-emerald)]" />
            <div className="text-2xl font-black text-[var(--text-primary)] font-mono">180,000+</div>
            <div className="text-xs text-[var(--text-muted)] font-mono">Monthly Page Views</div>
          </div>

          <div className="card-brand p-5 text-center space-y-1">
            <Mail className="w-5 h-5 mx-auto text-[var(--accent-blue)]" />
            <div className="text-2xl font-black text-[var(--text-primary)] font-mono">46.8%</div>
            <div className="text-xs text-[var(--text-muted)] font-mono">Newsletter Open Rate</div>
          </div>

          <div className="card-brand p-5 text-center space-y-1">
            <ShieldCheck className="w-5 h-5 mx-auto text-[var(--accent-amber)]" />
            <div className="text-2xl font-black text-[var(--text-primary)] font-mono">82%</div>
            <div className="text-xs text-[var(--text-muted)] font-mono">Independent Rights Owners</div>
          </div>
        </div>

        {successMsg && (
          <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 text-center text-xs text-emerald-800 max-w-xl mx-auto font-medium">
            ✓ {successMsg}
          </div>
        )}

        {/* Sponsorship Packages Grid */}
        <div id="sponsor-packages" className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="font-serif text-3xl font-bold text-[var(--text-primary)]">
              Select Your Media Placement Package
            </h2>
            <p className="text-xs text-[var(--text-muted)] font-mono">
              Transparent, flat-rate institutional pricing. Instant Stripe checkout reservation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SPONSORSHIP_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`card-brand p-6 sm:p-8 flex flex-col justify-between space-y-6 relative ${
                  pkg.highlight ? "!border-[var(--accent-primary)] ring-2 ring-[var(--accent-primary)]/20 shadow-md" : ""
                }`}
              >
                {pkg.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--accent-primary)] text-white font-black text-[9px] uppercase px-3 py-1 rounded-full shadow">
                    MOST POPULAR CAMPAIGN
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="font-serif font-bold text-xl text-[var(--text-primary)]">{pkg.name}</h3>
                    <p className="text-xs text-[var(--text-secondary)] mt-1">{pkg.description}</p>
                  </div>

                  <div className="flex items-baseline space-x-1">
                    <span className="text-3xl font-black text-[var(--text-primary)] font-mono">{pkg.priceFormatted}</span>
                    <span className="text-xs text-[var(--text-muted)] font-mono">/ placement</span>
                  </div>

                  <div className="space-y-2.5 pt-4 border-t border-[var(--border-color)] text-xs text-[var(--text-secondary)]">
                    {pkg.features.map((d, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-[var(--accent-primary)] shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-[var(--border-color)]">
                  {bookingPackage === pkg.id ? (
                    <div className="space-y-2.5">
                      <input
                        type="text"
                        placeholder="Company / Brand Name"
                        value={sponsorName}
                        onChange={(e) => setSponsorName(e.target.value)}
                        className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-2 text-xs text-[var(--text-primary)]"
                      />
                      <input
                        type="email"
                        placeholder="Billing Email"
                        value={sponsorEmail}
                        onChange={(e) => setSponsorEmail(e.target.value)}
                        className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-2 text-xs text-[var(--text-primary)]"
                      />
                      <input
                        type="url"
                        placeholder="Target Destination URL (https://...)"
                        value={ctaUrl}
                        onChange={(e) => setCtaUrl(e.target.value)}
                        className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-2 text-xs text-[var(--text-primary)]"
                      />
                      <button
                        onClick={() => handleCheckout(pkg.id)}
                        disabled={loading}
                        className="btn-brand w-full py-2.5"
                      >
                        {loading ? "Redirecting to Stripe..." : "Reserve & Pay via Stripe"}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setBookingPackage(pkg.id)}
                      className={pkg.highlight ? "btn-brand w-full py-2.5" : "btn-brand-outline w-full py-2.5"}
                    >
                      <span>Book Placement &rarr;</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Official Brand Identity & Media Kit Asset Downloads */}
        <div className="card-brand p-8 sm:p-10 space-y-8 border-2 border-[var(--accent-primary)]/20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[var(--border-color)] pb-6">
            <div>
              <div className="inline-flex items-center space-x-2 text-[var(--accent-primary)] text-xs font-mono font-bold uppercase tracking-wider mb-2">
                <Palette className="w-4 h-4" />
                <span>Artispreneur Ecosystem Brand Kit</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                Official Brand Guidelines & Press Assets
              </h2>
              <p className="text-sm text-[var(--text-secondary)] mt-1">
                Approved high-resolution vectors, badge lockups, and color specifications for festival programs, sponsor banners, and accredited press releases.
              </p>
            </div>
            <a
              href="/artispreneur-logo.png"
              download="artispreneur-brand-assets.png"
              className="btn-brand text-xs px-6 py-3 shrink-0 flex items-center justify-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Full Brand Kit</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Color Palette Specification */}
            <div className="space-y-3 bg-[var(--bg-secondary)] p-5 rounded-xl border border-[var(--border-color)]">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                Brand Palette
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded bg-[var(--bg-card)] border border-[var(--border-color)]">
                  <div className="flex items-center space-x-2">
                    <span className="w-4 h-4 rounded-full bg-[#C0272D] border border-black/10"></span>
                    <span className="font-bold">Artispreneur Crimson</span>
                  </div>
                  <span className="font-mono text-[11px] text-[var(--text-muted)]">#C0272D</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-[var(--bg-card)] border border-[var(--border-color)]">
                  <div className="flex items-center space-x-2">
                    <span className="w-4 h-4 rounded-full bg-[#FED001] border border-black/10"></span>
                    <span className="font-bold">Champagne Gold</span>
                  </div>
                  <span className="font-mono text-[11px] text-[var(--text-muted)]">#FED001</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-[var(--bg-card)] border border-[var(--border-color)]">
                  <div className="flex items-center space-x-2">
                    <span className="w-4 h-4 rounded-full bg-[#0A0A0B] border border-black/10"></span>
                    <span className="font-bold">Obsidian Black</span>
                  </div>
                  <span className="font-mono text-[11px] text-[var(--text-muted)]">#0A0A0B</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-[var(--bg-card)] border border-[var(--border-color)]">
                  <div className="flex items-center space-x-2">
                    <span className="w-4 h-4 rounded-full bg-[#F6F1E8] border border-black/10"></span>
                    <span className="font-bold">Editorial Bone</span>
                  </div>
                  <span className="font-mono text-[11px] text-[var(--text-muted)]">#F6F1E8</span>
                </div>
              </div>
            </div>

            {/* Typography Tokens */}
            <div className="space-y-3 bg-[var(--bg-secondary)] p-5 rounded-xl border border-[var(--border-color)]">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                Typography System
              </h4>
              <div className="space-y-2 text-xs">
                <div className="p-2 rounded bg-[var(--bg-card)] border border-[var(--border-color)]">
                  <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase block">Headlines & Display</span>
                  <span className="font-serif text-base font-bold text-[var(--text-primary)]">Libre Baskerville / Newsreader</span>
                </div>
                <div className="p-2 rounded bg-[var(--bg-card)] border border-[var(--border-color)]">
                  <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase block">Interface & Body</span>
                  <span className="font-sans text-sm font-semibold text-[var(--text-primary)]">Inter / Plus Jakarta Sans</span>
                </div>
                <div className="p-2 rounded bg-[var(--bg-card)] border border-[var(--border-color)]">
                  <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase block">Metrics & Tickers</span>
                  <span className="font-mono text-xs font-bold text-[var(--accent-primary)]">JetBrains Mono (0123456789)</span>
                </div>
              </div>
            </div>

            {/* Official Logo Marks */}
            <div className="space-y-3 bg-[var(--bg-secondary)] p-5 rounded-xl border border-[var(--border-color)]">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                Approved Logo Marks
              </h4>
              <div className="space-y-2 text-xs">
                <a
                  href="/artispreneur-logo.png"
                  download="artispreneur-logo.png"
                  className="flex items-center justify-between p-2 rounded bg-[var(--bg-card)] hover:bg-[var(--bg-elevated)] border border-[var(--border-color)] transition-colors group"
                >
                  <div className="flex items-center space-x-2">
                    <img src="/artispreneur-logo.png" alt="Logo" className="w-5 h-5 object-contain" />
                    <span className="font-medium group-hover:text-[var(--accent-primary)]">Official Laurel Badge</span>
                  </div>
                  <Download className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--accent-primary)]" />
                </a>
                <a
                  href="/artispreneur-logo-knockout.png"
                  download="artispreneur-logo-knockout.png"
                  className="flex items-center justify-between p-2 rounded bg-[var(--bg-card)] hover:bg-[var(--bg-elevated)] border border-[var(--border-color)] transition-colors group"
                >
                  <div className="flex items-center space-x-2">
                    <img src="/artispreneur-logo-knockout.png" alt="Knockout" className="w-5 h-5 object-contain" />
                    <span className="font-medium group-hover:text-[var(--accent-primary)]">Transparent Knockout PNG</span>
                  </div>
                  <Download className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--accent-primary)]" />
                </a>
                <a
                  href="/ds-logo.png"
                  download="ds-logo.png"
                  className="flex items-center justify-between p-2 rounded bg-[var(--bg-card)] hover:bg-[var(--bg-elevated)] border border-[var(--border-color)] transition-colors group"
                >
                  <div className="flex items-center space-x-2">
                    <img src="/ds-logo.png" alt="DS Logo" className="w-5 h-5 object-contain" />
                    <span className="font-medium group-hover:text-[var(--accent-primary)]">Diamond Seal Vector</span>
                  </div>
                  <Download className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--accent-primary)]" />
                </a>
              </div>
            </div>
          </div>
        </div>

      </main>

      <NewsletterSignup />
    </div>
  );
}
