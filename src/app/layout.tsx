import type { Metadata, Viewport } from "next";
import { Inter, Caveat } from "next/font/google";
import "./globals.css";
import React from "react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "700"],
});

export const viewport: Viewport = {
  themeColor: "#FF7A1A",
  width: "device-width",
  initialScale: 1,
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sujalkanu.dev";

export const metadata: Metadata = {
  title: "Sujal Kumar Kanu | Portfolio",
  description:
    "Third-year Computer Science & Engineering student at BMSIT&M Bengaluru building full-stack applications, blockchain smart contracts, and applied generative AI systems.",
  keywords: [
    "Sujal Kumar Kanu",
    "Sujal Kanu",
    "BMSIT",
    "Full Stack Developer",
    "Blockchain Engineer",
    "AgriChain",
    "Solidity",
    "Bengaluru",
  ],
  authors: [{ name: "Sujal Kumar Kanu", url: "https://github.com/SujalKanu-stack" }],
  creator: "Sujal Kumar Kanu",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sujal Kumar Kanu | Portfolio",
    description:
      "Third-year B.E. CSE student at BMSIT&M Bengaluru building full-stack web, blockchain smart contracts, and applied AI systems.",
    url: siteUrl,
    siteName: "Sujal Kumar Kanu Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sujal Kumar Kanu | Portfolio",
    description:
      "Third-year B.E. CSE student at BMSIT&M Bengaluru building full-stack web, blockchain smart contracts, and applied AI systems.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sujal Kumar Kanu",
    jobTitle: "Computer Science & Engineering Student",
    url: siteUrl,
    sameAs: [
      "https://github.com/SujalKanu-stack",
      "https://www.linkedin.com/in/sujal-kumar-kanu/",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "BMS Institute of Technology & Management (VTU)",
    },
    knowsAbout: [
      "Full-stack Web Development",
      "Blockchain & Smart Contracts",
      "Solidity",
      "Applied Generative AI",
      "React",
      "Node.js",
      "FastAPI",
    ],
  };

  return (
    <html
      lang="en"
      data-theme="ember"
      className={`${inter.variable} ${caveat.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <noscript>
          <style>{`#boot-overlay { display: none !important; }`}</style>
        </noscript>
      </head>
      <body className="min-h-full flex flex-col selection:bg-[var(--accent)] selection:text-black">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
