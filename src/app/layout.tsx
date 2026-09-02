import type { Metadata } from "next";
import { Playfair_Display, Outfit, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AudioProvider } from "@/components/AudioContext";
import { AuthProvider } from "@/components/AuthContext";
import { AudioPlayerBar } from "@/components/AudioPlayerBar";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import { cn } from "@/lib/utils";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-serif-headline",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Artist Daily News — Powered by Artispreneur | Music Business Intelligence",
    template: "%s | Artist Daily News (ADN) · Powered by Artispreneur",
  },
  description:
    "Join 35,000+ independent artists, managers, and labels. Daily music industry news, culture dispatches, video masterclasses, podcasts, press credentials, and exclusive partner deals.",
  keywords: [
    "music business news",
    "independent artist platform",
    "music journalism",
    "music industry news",
    "spotify algorithm",
    "music videos and podcasts",
    "music press pass",
    "artist grants",
    "music industry intelligence",
    "artispreneur",
  ],
  authors: [{ name: "Artispreneur Editorial Board", url: "https://artistdailynews.com" }],
  creator: "Artispreneur Media Network",
  publisher: "Artispreneur Publishing",
  metadataBase: new URL("https://artistdailynews.com"),
  alternates: {
    canonical: "https://artistdailynews.com",
    types: {
      "application/rss+xml": "https://artistdailynews.com/api/news/feed?format=rss",
    },
  },
  openGraph: {
    title: "Artispreneur — The Intelligence Platform for Independent Music Professionals",
    description:
      "Daily music business intelligence, streaming benchmarks, catalogue data, and DIY strategy for independent creators.",
    url: "https://artistdailynews.com",
    siteName: "Artispreneur · Artist Daily News",
    images: [
      {
        url: "https://artistdailynews.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Artist Daily News - Music Business Intelligence for Independent Artists",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Artispreneur · Artist Daily News",
    description: "Daily music business intelligence for independent creators and indie labels.",
    site: "@artistdailynews",
    creator: "@artispreneur",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Global JSON-LD Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    name: "Artist Daily News",
    alternateName: ["ADN", "Artispreneur"],
    url: "https://artistdailynews.com",
    logo: "https://artistdailynews.com/artispreneur-logo.png",
    sameAs: [
      "https://artispreneur.com",
      "https://twitter.com/artistdailynews",
    ],
    publishingPrinciples: "https://artistdailynews.com/press-pass",
    foundingDate: "2024",
    parentOrganization: {
      "@type": "Organization",
      name: "Artispreneur Media Network",
      url: "https://artispreneur.com",
    },
  };

  return (
    <html lang="en" className={cn("light", playfairDisplay.variable, outfit.variable, geistMono.variable, "font-sans")}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <AuthProvider>
          <AudioProvider>
            <ReadingProgressBar />
            <Header />
            <main className="flex-1 pb-20">{children}</main>
            <AudioPlayerBar />
            <Footer />
          </AudioProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
