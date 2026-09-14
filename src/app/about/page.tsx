import type { Metadata } from "next";
import Link from "next/link";
import { TrustPageShell, TrustSection } from "@/components/TrustPageShell";

export const metadata: Metadata = {
  title: "About · Artist Daily News",
  description:
    "What Artist Daily News is: a weekday editorial brief translating music-industry developments for independent artists.",
};

export default function AboutPage() {
  return (
    <TrustPageShell
      eyebrow="Trust · About"
      title="About Artist Daily News"
      lede="A weekday brief on the music business, written for independent artists."
    >
      <TrustSection title="What this is">
        <p>
          Artist Daily News is a daily editorial brief that translates
          music-industry developments into plain language: what happened, why
          it matters, and what an independent artist might do about it.
        </p>
      </TrustSection>

      <TrustSection title="How it works">
        <p>
          Our editors select stories from established music-industry
          publications and creator communities, then write original summaries
          in our own words. Every story links to the canonical publisher
          source — the brief is a pointer to the original reporting, not a
          replacement for it.
        </p>
        <p>We never republish full articles.</p>
      </TrustSection>

      <TrustSection title="Who it's for">
        <p>
          Independent musicians, managers, and indie labels who want to follow
          the business of music without the noise.
        </p>
      </TrustSection>

      <TrustSection title="Powered by Artispreneur">
        <p>
          Artist Daily News is powered by{" "}
          <a
            href="https://artispreneur.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent-primary)] hover:underline font-semibold"
          >
            Artispreneur
          </a>
          .
        </p>
        <p>
          Questions, tips, or feedback for the newsroom:{" "}
          <a
            href="mailto:newsdesk@artistdailynews.com"
            className="text-[var(--accent-primary)] hover:underline font-semibold"
          >
            newsdesk@artistdailynews.com
          </a>
          .
        </p>
      </TrustSection>

      <TrustSection title="Our commitments">
        <p>
          Read how we verify stories in our{" "}
          <Link
            href="/editorial-standards"
            className="text-[var(--accent-primary)] hover:underline font-semibold"
          >
            Editorial Standards
          </Link>
          , and how we fix mistakes on our{" "}
          <Link
            href="/corrections"
            className="text-[var(--accent-primary)] hover:underline font-semibold"
          >
            Corrections
          </Link>{" "}
          page.
        </p>
      </TrustSection>
    </TrustPageShell>
  );
}
