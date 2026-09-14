import Link from "next/link";
import type { ReactNode } from "react";

const TRUST_LINKS = [
  { href: "/about", label: "About" },
  { href: "/editorial-standards", label: "Editorial Standards" },
  { href: "/corrections", label: "Corrections" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export function TrustPageShell({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  children: ReactNode;
}) {
  return (
    <main className="bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <p className="text-xs font-mono uppercase tracking-widest text-[var(--accent-primary)] font-bold mb-4">
          {eyebrow}
        </p>
        <h1 className="font-serif-headline text-4xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
          {title}
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed mb-10 max-w-2xl">
          {lede}
        </p>

        <div className="space-y-6">{children}</div>

        <nav
          aria-label="Trust pages"
          className="mt-12 pt-6 border-t border-[var(--border-color)] flex flex-wrap gap-x-6 gap-y-2 text-sm"
        >
          {TRUST_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}

export function TrustSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="card-brand p-6 sm:p-8">
      <h2 className="font-serif-headline text-xl font-bold text-[var(--text-primary)] mb-3">
        {title}
      </h2>
      <div className="text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
        {children}
      </div>
    </section>
  );
}
