import type { Metadata } from "next";
import { TrustPageShell, TrustSection } from "@/components/TrustPageShell";

export const metadata: Metadata = {
  title: "Privacy Policy · Artist Daily News",
  description:
    "What Artist Daily News collects, how cookies and local storage are used, and how to request deletion.",
};

export default function PrivacyPage() {
  return (
    <TrustPageShell
      eyebrow="Trust · Privacy"
      title="Privacy Policy"
      lede="Plain language on what we collect, why, and how to ask us to delete it."
    >
      <TrustSection title="What we collect">
        <p>
          <strong className="text-[var(--text-primary)]">
            Newsletter email and preferences.
          </strong>{" "}
          If you subscribe, we store your email address and any preferences you
          set, such as topics.
        </p>
        <p>
          <strong className="text-[var(--text-primary)]">
            Anonymized reading analytics.
          </strong>{" "}
          We measure page views, scroll and engagement, and outbound clicks to
          understand what readers find useful. We do not do cross-site
          tracking.
        </p>
      </TrustSection>

      <TrustSection title="Cookies and local storage">
        <p>
          We use cookies and local storage for basic site functions, such as
          remembering your preferences. We do not use them to track you across
          other sites.
        </p>
      </TrustSection>

      <TrustSection title="No sale of personal data">
        <p>We do not sell your personal data.</p>
      </TrustSection>

      <TrustSection title="Request a copy or deletion">
        <p>
          To request a copy of your data or ask us to delete it, email{" "}
          <a
            href="mailto:newsdesk@artistdailynews.com"
            className="text-[var(--accent-primary)] hover:underline font-semibold"
          >
            newsdesk@artistdailynews.com
          </a>{" "}
          and we will handle it.
        </p>
      </TrustSection>
    </TrustPageShell>
  );
}
