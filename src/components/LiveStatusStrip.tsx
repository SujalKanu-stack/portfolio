"use client";

import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";

export default function LiveStatusStrip() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      try {
        const istTime = new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(new Date());
        setTime(istTime);
      } catch {
        setTime("IST");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollDown = () => {
    const aboutElem = document.getElementById("about");
    if (aboutElem) {
      if (window.__lenis) {
        window.__lenis.scrollTo(aboutElem, { duration: 0.85, offset: 0 });
      } else {
        aboutElem.scrollIntoView({ behavior: "smooth" });
      }
      if (window.history.pushState) {
        window.history.pushState(null, "", "#about");
      }
    }
  };

  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 text-[10px] sm:text-[11px] font-mono text-[var(--muted)] border-t border-white/5 pt-2.5 sm:pt-3">
      {/* Top on mobile / Left on desktop: Bengaluru Time & Status */}
      <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-2">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
          </span>
          <span className="text-[var(--text)] font-medium">Bengaluru, IN</span>
          {time && <span className="text-[var(--muted-dark)]">({time} IST)</span>}
        </div>

        {/* Mobile-only scroll button */}
        <button
          onClick={handleScrollDown}
          className="flex sm:hidden items-center gap-1 hover:text-[var(--accent)] text-[var(--muted-dark)] transition-colors focus:outline-none py-0.5"
          aria-label="Scroll to About section"
        >
          <span>Scroll</span>
          <ArrowDown className="w-3 h-3 animate-bounce" />
        </button>
      </div>

      {/* Now Learning Pill with pulsing dot */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)] border border-white/10 text-[10px] sm:text-[11px] font-mono text-[var(--text)] max-w-full">
        <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--accent)]" />
        </span>
        <span className="text-[var(--muted)] flex-shrink-0">Now learning:</span>
        <span className="text-[var(--accent)] font-semibold truncate">Generative AI</span>
        <span className="text-[var(--muted-dark)] hidden md:inline flex-shrink-0">(LLMs, prompt engineering, agents)</span>
      </div>

      {/* Desktop-only scroll indicator */}
      <button
        onClick={handleScrollDown}
        className="hidden sm:flex items-center gap-1.5 hover:text-[var(--accent)] transition-colors focus:outline-none flex-shrink-0"
        aria-label="Scroll to About section"
      >
        <span>Scroll</span>
        <ArrowDown className="w-3 h-3 animate-bounce" />
      </button>
    </div>
  );
}
