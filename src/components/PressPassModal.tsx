"use client";

import { useState } from "react";
import { Ticket, X, CheckCircle2, ArrowRight, AlertTriangle } from "lucide-react";

interface PressPassModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PressPassModal({ isOpen, onClose }: PressPassModalProps) {
  const [applicantName, setApplicantName] = useState("");
  const [artistOrOutletName, setArtistOrOutletName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Independent Artist");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setMessage("");

    try {
      const res = await fetch("/api/press-pass/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicantName,
          artistOrOutletName,
          email,
          role,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again in a moment.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong on our end. Please try again in a moment.");
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
            <h3 className="font-serif text-2xl font-bold text-[var(--text-primary)]">Badge Request Received!</h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Thanks, <strong>{applicantName || "friend"}</strong>. We&rsquo;ll email your free digital creator badge to <strong>{email}</strong>. Remember: it&rsquo;s a self-issued badge from Artist Daily News — not official festival accreditation, and it doesn&rsquo;t grant venue access.
            </p>
            <div className="p-4 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-color)] text-xs font-mono text-[var(--text-muted)]">
              Reference ID: ADN-BADGE-{Math.floor(100000 + Math.random() * 900000)}
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
                <span>ADN Digital Creator Badge</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mt-2">
                Request Your Creator Badge
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
                Tell us who you are and we&rsquo;ll email you a free digital media badge for your EPK and socials. This badge is self-issued by Artist Daily News — it is <strong>not</strong> official festival accreditation and grants no venue access.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-[var(--text-secondary)] block mb-1">Full Name *</label>
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
                  <label className="text-xs font-mono text-[var(--text-secondary)] block mb-1">Artist / Outlet Name *</label>
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
                  <label className="text-xs font-mono text-[var(--text-secondary)] block mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@yourdomain.com"
                    className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] focus:border-[var(--accent-primary)] rounded-lg p-2.5 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-[var(--text-secondary)] block mb-1">Primary Role *</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] rounded-lg p-2.5 focus:border-[var(--accent-primary)] focus:outline-none"
                  >
                    <option value="Independent Artist">Independent Artist</option>
                    <option value="Concert / Festival Photographer">Concert / Festival Photographer</option>
                    <option value="Music Journalist / Writer">Music Journalist / Writer</option>
                    <option value="Videographer / Content Creator">Videographer / Content Creator</option>
                    <option value="Artist Manager / Label Rep">Artist Manager / Label Rep</option>
                  </select>
                </div>
              </div>

              {status === "error" && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-300 rounded-xl p-3 text-xs text-red-700" role="alert">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{message}</span>
                </div>
              )}

              <div className="pt-2 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn-brand px-6 py-2.5 flex items-center space-x-1.5 disabled:opacity-60"
                >
                  <span>{status === "submitting" ? "Submitting..." : "Request Badge"}</span>
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
