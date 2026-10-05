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
        window.__lenis.scrollTo(target, { duration: 1.1 });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="flex-1 text-center md:text-left">
      {/* Motto Tag Pill with Rotating Text */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)] border border-white/10 text-xs font-medium tracking-wide mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
        <span className="text-[var(--muted)] font-mono text-[11px]">Specializing in</span>
        <span className="font-handwriting text-sm text-[var(--accent)] min-w-[130px] inline-block text-left">
          {displayText}
          <span className="inline-block w-1 h-3.5 bg-[var(--accent)] ml-0.5 align-middle animate-pulse" />
        </span>
      </div>

      {/* Main Title with Decrypted Name */}
      <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-[var(--text)] leading-tight mb-3">
        Hi, I&apos;m{" "}
        <span className="text-[var(--accent)] hand-drawn-underline font-mono">
          {displayName}
        </span>
        .
      </h1>

      {/* Two-line concise intro */}
      <p className="text-sm sm:text-base text-[var(--muted)] max-w-lg leading-relaxed mb-6">
        Third-year Computer Science & Engineering student at BMSIT&M Bengaluru.
        I engineer decentralized supply-chain protocols, full-stack web platforms, and applied generative AI systems.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6">
        <a
          href="#projects"
          onClick={handleScrollToProjects}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--accent)] text-slate-950 font-semibold text-xs hover:bg-[var(--accent-hover)] transition-all shadow-md shadow-[var(--accent)]/15 min-h-[40px]"
        >
          <span>View my work</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </a>

        {hasResume ? (
          <div className="inline-flex items-center rounded-full bg-white/5 border border-white/15 hover:border-[var(--accent)] hover:bg-[var(--accent-subtle)] transition-all min-h-[40px] overflow-hidden group">
            <a
              href={resumePath}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View resume in new tab"
              className="inline-flex items-center gap-2 pl-4 pr-2.5 py-2.5 text-[var(--text)] group-hover:text-[var(--accent)] text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
            >
              <FileText className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>View resume</span>
            </a>
            <span className="w-px h-3.5 bg-white/15" aria-hidden="true" />
            <a
              href={resumePath}
              download="Sujal_Kumar_Kanu_Resume.pdf"
              aria-label="Download resume PDF"
              title="Download resume PDF"
              className="inline-flex items-center justify-center pl-2.5 pr-4 py-2.5 text-[var(--muted)] hover:text-[var(--accent)] text-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
            >
              <Download className="w-3.5 h-3.5" />
            </a>
          </div>
        ) : (
          <button
            type="button"
            disabled
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-[var(--muted-dark)] text-xs font-medium cursor-not-allowed min-h-[40px]"
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
          className="w-9 h-9 rounded-lg bg-[var(--surface)] border border-white/10 text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--border-active)] hover:bg-[var(--surface-hover)] flex items-center justify-center transition-all duration-200"
        >
          <GithubIcon className="w-4 h-4" />
        </a>

        <a
          href={socials.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn profile"
          className="w-9 h-9 rounded-lg bg-[var(--surface)] border border-white/10 text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--border-active)] hover:bg-[var(--surface-hover)] flex items-center justify-center transition-all duration-200"
        >
          <LinkedinIcon className="w-4 h-4" />
        </a>

        <a
          href={`mailto:${socials.email}`}
          aria-label="Send direct email"
          className="w-9 h-9 rounded-lg bg-[var(--surface)] border border-white/10 text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--border-active)] hover:bg-[var(--surface-hover)] flex items-center justify-center transition-all duration-200"
        >
          <span className="font-mono text-xs font-bold text-[var(--accent)]">@</span>
        </a>
      </div>
    </div>
  );
}
