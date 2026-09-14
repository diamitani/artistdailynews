import type { Metadata } from "next";
import { TrustPageShell, TrustSection } from "@/components/TrustPageShell";

export const metadata: Metadata = {
  title: "Terms of Use · Artist Daily News",
  description:
    "The terms for using Artist Daily News: summaries and source links, completeness, partner disclosure, and acceptable use.",
};

export default function TermsPage() {
  return (
    <TrustPageShell
      eyebrow="Trust · Terms"
      title="Terms of Use"
      lede="The short version of the rules for using Artist Daily News."
    >
      <TrustSection title="Summaries and source links">
        <p>
          Our stories are informational summaries that link to their canonical
          publisher sources. They are not a substitute for the originals —
          check the source for the full picture.
        </p>
      </TrustSection>

      <TrustSection title="No guarantee of completeness">
        <p>
          We work to be accurate, but we do not guarantee that the brief is
          complete, error-free, or up to date.
        </p>
      </TrustSection>

      <TrustSection title="Affiliate and partner disclosure">
        <p>
          Where a link is sponsored or a partner relationship exists, it is
          labeled as such.
        </p>
      </TrustSection>

      <TrustSection title="Acceptable use">
        <p>
          Do not scrape the site in ways that degrade it, misrepresent our
          content, or infringe anyone's rights.
        </p>
      </TrustSection>
    </TrustPageShell>
  );
}
