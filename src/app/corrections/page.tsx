import type { Metadata } from "next";
import { TrustPageShell, TrustSection } from "@/components/TrustPageShell";

export const metadata: Metadata = {
  title: "Corrections · Artist Daily News",
  description:
    "How to report an error in Artist Daily News, our corrections protocol, and a public log of recent corrections.",
};

const PROTOCOL = [
  {
    title: "Stop distribution if meaning changes",
    body: "If an error changes what a story means, we stop distributing it until it is fixed.",
  },
  {
    title: "Correct the record, preserve history",
    body: "We correct the story while preserving its history — the original is never silently rewritten.",
  },
  {
    title: "A visible note, every time",
    body: "Every correction carries a visible note saying what changed and when.",
  },
];

export default function CorrectionsPage() {
  return (
    <TrustPageShell
      eyebrow="Trust · Corrections"
      title="Corrections"
      lede="We fix mistakes openly, and we keep a public record of them."
    >
      <TrustSection title="How to report an error">
        <p>
          If you spot an error in one of our stories, email{" "}
          <a
            href="mailto:newsdesk@artistdailynews.com"
            className="text-[var(--accent-primary)] hover:underline font-semibold"
          >
            newsdesk@artistdailynews.com
          </a>{" "}
          with a link to the story and a description of what is wrong. We
          review every report.
        </p>
      </TrustSection>

      <TrustSection title="Our corrections protocol">
        <ol className="space-y-4 list-none">
          {PROTOCOL.map((step, i) => (
            <li key={step.title} className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent-primary)]/10 text-[11px] font-mono font-bold text-[var(--accent-primary)]">
                {i + 1}
              </span>
              <div>
                <p className="font-semibold text-[var(--text-primary)]">
                  {step.title}
                </p>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </TrustSection>

      <TrustSection title="Recent corrections">
        <p className="rounded-lg border border-dashed border-[var(--border-color)] bg-[var(--bg-secondary)] px-4 py-5 text-center">
          No corrections published yet.
        </p>
      </TrustSection>
    </TrustPageShell>
  );
}
