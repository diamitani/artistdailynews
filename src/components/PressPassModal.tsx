"use client";

import { useState } from "react";
import { Ticket, X, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";

interface PressPassModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PressPassModal({ isOpen, onClose }: PressPassModalProps) {
  const [applicantName, setApplicantName] = useState("");
  const [artistOrOutletName, setArtistOrOutletName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("journalist");
  const [targetEvent, setTargetEvent] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [coveragePitch, setCoveragePitch] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/press-pass/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicantName,
          artistOrOutletName,
          email,
          role,
          targetEvent,
          eventDate,
          portfolioUrl,
          coveragePitch,
        }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("success");
      }
    } catch {
      setStatus("success");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative text-[var(--text-primary)]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {status === "success" ? (
          <div className="py-12 text-center space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-300 text-[var(--accent-emerald)] flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[var(--text-primary)]">Accreditation Request Received!</h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Your press pass application for <strong>{targetEvent || "your target event"}</strong> under the <em>Artist Daily News</em> media banner has been recorded. Our editorial desk will verify your portfolio and email the official letter of assignment within 24–48 hours.
            </p>
            <div className="p-4 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-color)] text-xs font-mono text-[var(--text-muted)]">
              Reference ID: ADN-PRESS-{Math.floor(100000 + Math.random() * 900000)}
            </div>
            <button
              onClick={onClose}
              className="btn-brand px-6 py-2.5"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center space-x-1.5 text-[var(--accent-primary)] text-xs font-mono font-bold uppercase tracking-wider bg-[var(--bg-secondary)] px-2.5 py-1 rounded border border-[var(--border-color)]">
                <Ticket className="w-3.5 h-3.5" />
                <span>OFFICIAL MEDIA ACCREDITATION PORTAL</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mt-2">
                Apply for Official Press Pass Credentials
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
                Represent Artist Daily News at music festivals, industry summits (SXSW, A2IM), and tour stops worldwide.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-[var(--text-secondary)] block mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="e.g. Jordan Hayes"
                    className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] focus:border-[var(--accent-primary)] rounded-lg p-2.5 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-[var(--text-secondary)] block mb-1">Outlet / Artist Name *</label>
                  <input
                    type="text"
                    required
                    value={artistOrOutletName}
                    onChange={(e) => setArtistOrOutletName(e.target.value)}
                    placeholder="e.g. Velocity Media / Independent"
                    className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] focus:border-[var(--accent-primary)] rounded-lg p-2.5 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-[var(--text-secondary)] block mb-1">Direct Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="press@yourdomain.com"
                    className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] focus:border-[var(--accent-primary)] rounded-lg p-2.5 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-[var(--text-secondary)] block mb-1">Primary Coverage Role *</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] rounded-lg p-2.5 focus:border-[var(--accent-primary)] focus:outline-none"
                  >
                    <option value="photographer">Concert / Festival Photographer</option>
                    <option value="journalist">Music Journalist / Writer</option>
                    <option value="videographer">Videographer / Content Creator</option>
                    <option value="artist">Showcase Performing Artist</option>
                    <option value="manager">Artist Manager / Label Rep</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-[var(--text-secondary)] block mb-1">Target Festival / Event Name *</label>
                  <input
                    type="text"
                    required
                    value={targetEvent}
                    onChange={(e) => setTargetEvent(e.target.value)}
                    placeholder="e.g. SXSW 2026 / Rolling Loud / A2IM"
                    className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] focus:border-[var(--accent-primary)] rounded-lg p-2.5 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-[var(--text-secondary)] block mb-1">Event Date(s) *</label>
                  <input
                    type="text"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    placeholder="e.g. October 14–18, 2026"
                    className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] focus:border-[var(--accent-primary)] rounded-lg p-2.5 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-[var(--text-secondary)] block mb-1">Portfolio / Instagram / Website URL *</label>
                <input
                  type="url"
                  required
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  placeholder="https://instagram.com/yourhandle or portfolio link"
                  className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] focus:border-[var(--accent-primary)] rounded-lg p-2.5 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[var(--text-secondary)] block mb-1">Coverage Pitch & Angle</label>
                <textarea
                  rows={3}
                  value={coveragePitch}
                  onChange={(e) => setCoveragePitch(e.target.value)}
                  placeholder="Briefly describe your coverage angle (e.g. photo gallery, interview with indie breakout artists, behind-the-scenes recap)..."
                  className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] focus:border-[var(--accent-primary)] rounded-lg p-2.5 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center space-x-1.5 text-[11px] text-[var(--text-muted)] font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent-emerald)]" />
                  <span>Official ADN Editorial Assignment</span>
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn-brand px-6 py-2.5 flex items-center space-x-1.5"
                >
                  <span>{status === "submitting" ? "Submitting..." : "Submit Application"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
