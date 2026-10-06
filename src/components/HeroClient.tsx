"use client";

import { useEffect, useState } from "react";
import { ArrowDown, Download, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";

const ROTATING_PHRASES = [
  "full-stack systems",
  "blockchain protocols",
  "applied generative AI",
];

const GLYPHS = "!@#$%^&*()_+-=[]{}|;:,.<>?/~0123456789";

export default function HeroClient({
  hasResume,
  resumePath,
  socials,
}: {
  hasResume: boolean;
  resumePath: string;
  socials: { github: string; linkedin: string; email: string };
}) {
  // 1. Decrypting Name Effect
  const [displayName, setDisplayName] = useState("Sujal");
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const target = "Sujal";
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayName(
        target
          .split("")
          .map((letter, index) => {
            if (index < iteration) return target[index];
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );

      if (iteration >= target.length) {
        clearInterval(interval);
      }
      iteration += 1 / 3;
    }, 45);

    return () => clearInterval(interval);
  }, []);

  // 2. Rotating handwritten line (typed and erased)
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState(ROTATING_PHRASES[0]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const currentPhrase = ROTATING_PHRASES[phraseIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting && displayText === currentPhrase) {
      // Pause before deleting
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === "") {
      timer = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % ROTATING_PHRASES.length);
      }, 400);
    } else {
      timer = setTimeout(
        () => {
          setDisplayText((prev) =>
            isDeleting
              ? currentPhrase.substring(0, prev.length - 1)
              : currentPhrase.substring(0, prev.length + 1)
          );
        },
        isDeleting ? 40 : 80
      );
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex]);

  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("projects");
    if (target) {
      if (window.__lenis) {
        window.__lenis.scrollTo(target, { duration: 0.85, offset: 0 });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
      if (window.history.pushState) {
        window.history.pushState(null, "", "#projects");
      }
    }
  };

  return (
    <div className="flex-1 text-center md:text-left w-full max-w-xl mx-auto md:mx-0">
      {/* Motto Tag Pill with Rotating Text - fixed min-width prevents layout shift */}
      <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-[var(--surface)] border border-white/10 text-xs font-medium tracking-wide mb-3 sm:mb-4 max-w-full shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse flex-shrink-0" />
        <span className="text-[var(--muted)] font-mono text-[10px] sm:text-[11px] whitespace-nowrap">Specializing in</span>
        <span className="font-handwriting text-xs sm:text-sm text-[var(--accent)] min-w-[135px] sm:min-w-[168px] inline-block text-left truncate">
          {displayText}
          <span className="inline-block w-1 h-3.5 bg-[var(--accent)] ml-0.5 align-middle animate-pulse" />
        </span>
      </div>

      {/* Main Title with Decrypted Name & Fluid clamp() Typography */}
      <h1 className="fluid-h1 font-extrabold tracking-tight text-[var(--text)] leading-tight mb-2.5 sm:mb-3">
        Hi, I&apos;m{" "}
        <span className="text-[var(--accent)] hand-drawn-underline font-mono">
          {displayName}
        </span>
        .
      </h1>

      {/* Two-line concise intro with Fluid clamp() Typography */}
      <p className="fluid-body text-[var(--muted)] max-w-lg leading-relaxed mb-5 sm:mb-6 mx-auto md:mx-0">
        Third-year Computer Science & Engineering student at BMSIT&M Bengaluru.
        I engineer decentralized supply-chain protocols, full-stack web platforms, and applied generative AI systems.
      </p>

      {/* Action Buttons - Stacked on mobile (<640px), row on tablet & desktop */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center md:justify-start gap-2.5 sm:gap-3 mb-5 sm:mb-6 w-full max-w-xs sm:max-w-none mx-auto md:mx-0">
        <a
          href="#projects"
          onClick={handleScrollToProjects}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[var(--accent)] text-slate-950 font-semibold text-xs sm:text-sm hover:bg-[var(--accent-hover)] transition-all shadow-md shadow-[var(--accent)]/15 min-h-[44px] w-full sm:w-auto cursor-pointer"
        >
          <span>View my work</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </a>

        {hasResume ? (
          <div className="inline-flex items-center justify-between sm:justify-start rounded-full bg-white/5 border border-white/15 hover:border-[var(--accent)] hover:bg-[var(--accent-subtle)] transition-all min-h-[44px] overflow-hidden group w-full sm:w-auto">
            <a
              href={resumePath}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View resume in new tab"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 pl-4 pr-2.5 py-2.5 text-[var(--text)] group-hover:text-[var(--accent)] text-xs sm:text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)] min-h-[44px]"
            >
              <FileText className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>View resume</span>
            </a>
            <span className="w-px h-5 bg-white/15" aria-hidden="true" />
            <a
              href={resumePath}
              download="Sujal_Kumar_Kanu_Resume_2026.pdf"
              aria-label="Download resume PDF"
              title="Download resume PDF"
              className="inline-flex items-center justify-center pl-2.5 pr-4 py-2.5 text-[var(--muted)] hover:text-[var(--accent)] text-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)] min-h-[44px]"
            >
              <Download className="w-3.5 h-3.5" />
            </a>
          </div>
        ) : (
          <button
            type="button"
            disabled
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-[var(--muted-dark)] text-xs font-medium cursor-not-allowed min-h-[44px] w-full sm:w-auto"
          >
            <FileText className="w-3.5 h-3.5 opacity-50" />
            <span>Resume coming soon</span>
          </button>
        )}
      </div>

      {/* Social Buttons */}
      <div className="flex items-center justify-center md:justify-start gap-2.5">
        <a
          href={socials.github}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub profile"
          className="w-11 h-11 sm:w-10 sm:h-10 rounded-xl bg-[var(--surface)] border border-white/10 text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--border-active)] hover:bg-[var(--surface-hover)] flex items-center justify-center transition-all duration-200"
        >
          <GithubIcon className="w-4 h-4" />
        </a>

        <a
          href={socials.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn profile"
          className="w-11 h-11 sm:w-10 sm:h-10 rounded-xl bg-[var(--surface)] border border-white/10 text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--border-active)] hover:bg-[var(--surface-hover)] flex items-center justify-center transition-all duration-200"
        >
          <LinkedinIcon className="w-4 h-4" />
        </a>

        <a
          href={`mailto:${socials.email}`}
          aria-label="Send direct email"
          className="w-11 h-11 sm:w-10 sm:h-10 rounded-xl bg-[var(--surface)] border border-white/10 text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--border-active)] hover:bg-[var(--surface-hover)] flex items-center justify-center transition-all duration-200"
        >
          <span className="font-mono text-sm font-bold text-[var(--accent)]">@</span>
        </a>
      </div>
    </div>
  );
}
