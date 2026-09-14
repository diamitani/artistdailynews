"use client";

import { useState } from "react";

/**
 * Compact newsletter signup form with inline success/error feedback.
 * Used in the site footer and on /news-home.
 */
export function NewsletterInlineForm({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role: "Independent Artist", topics: ["financial", "streaming", "opportunities"] }),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "You're subscribed. Watch your inbox on weekday mornings.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Subscription failed. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong on our end. Please try again in a moment.");
    }
  };

  const dark = variant === "dark";

  if (status === "success") {
    return (
      <div
        className={`rounded-xl px-4 py-3 text-sm font-medium text-left ${
          dark
            ? "bg-emerald-400/15 border border-emerald-300/30 text-emerald-200"
            : "bg-emerald-50 border border-emerald-300 text-emerald-800"
        }`}
        role="status"
        aria-live="polite"
      >
        {message}
      </div>
    );
  }

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className={`flex gap-3 ${dark ? "flex-col sm:flex-row" : "flex-col sm:flex-row sm:w-auto w-full"}`}
      >
        <input
          type="email"
          placeholder={dark ? "your@email.com" : "Enter your email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-label="Email address"
          className={
            dark
              ? "flex-1 px-6 py-4 rounded-md bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
              : "flex-1 sm:w-64 px-4 py-2.5 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] text-sm"
          }
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={
            dark
              ? "bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] disabled:opacity-60 text-white px-10 py-4 rounded-md font-bold text-lg transition-all whitespace-nowrap"
              : "btn-brand px-6 py-2.5 text-sm whitespace-nowrap disabled:opacity-60"
          }
        >
          {status === "loading" ? "Subscribing…" : "Subscribe Free"}
        </button>
      </form>
      {status === "error" && (
        <p
          className={`mt-2 text-xs text-left ${dark ? "text-red-300" : "text-red-600"}`}
          role="alert"
          aria-live="assertive"
        >
          {message}
        </p>
      )}
    </div>
  );
}
