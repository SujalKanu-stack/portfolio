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
  themeColor: "#060B14",
  width: "device-width",
  initialScale: 1,
};

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
  metadataBase: new URL("https://sujalkanu.dev"), // TODO(Sujal): update with your final domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sujal Kumar Kanu | Portfolio",
    description:
      "Third-year B.E. CSE student at BMSIT&M Bengaluru building full-stack web, blockchain smart contracts, and applied AI systems.",
    url: "https://sujalkanu.dev",
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
    url: "https://sujalkanu.dev",
    sameAs: [
      "https://github.com/SujalKanu-stack",
      "https://linkedin.com/in/sujal-kanu",
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
      className={`${inter.variable} ${caveat.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#070e1a] text-slate-100 selection:bg-[#00D8F6] selection:text-slate-950">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
