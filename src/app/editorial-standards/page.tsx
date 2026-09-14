import type { Metadata } from "next";
import Link from "next/link";
import { TrustPageShell, TrustSection } from "@/components/TrustPageShell";

export const metadata: Metadata = {
  title: "Editorial Standards · Artist Daily News",
  description:
    "The verification rules behind Artist Daily News: how stories are sourced, summarized, reviewed, and corrected.",
};

const RULES = [
  {
    title: "Canonical sources, every time",
    body: "Every story links to its canonical publisher source, with the correct publication name and the correct publication date.",
  },
  {
    title: "Headlines are never fabricated or “improved”",
    body: "Headlines describe what is actually in the story. We don't invent, embellish, or sharpen them to get clicks.",
  },
  {
    title: "Summaries are original language",
    body: "Summaries are written in our own words. We never copy passages from the source article.",
  },
  {
    title: "Human review before publication",
    body: "No story publishes without a human editor reviewing it first.",
  },
  {
    title: "Images only when we have the right",
    body: "We only publish images we own, are licensed to use, or have permission to publish.",
  },
  {
    title: "Mistakes are corrected openly",
    body: "When we get something wrong, we fix it on the record — see our corrections policy.",
  },
];

export default function EditorialStandardsPage() {
  return (
    <TrustPageShell
      eyebrow="Trust · Editorial Standards"
      title="Editorial Standards"
      lede="How we decide what to publish, and the rules every story follows."
    >
      <TrustSection title="Verification rules">
        <ul className="space-y-4">
          {RULES.map((rule) => (
            <li key={rule.title} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--accent-primary)]"
              />
              <div>
                <p className="font-semibold text-[var(--text-primary)]">
                  {rule.title}
                </p>
                <p>{rule.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </TrustSection>

      <TrustSection title="Corrections policy">
        <p>
          Standards only mean something if mistakes are fixed openly. Our full
          corrections protocol — how to report an error and what happens next
          — is on our{" "}
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
