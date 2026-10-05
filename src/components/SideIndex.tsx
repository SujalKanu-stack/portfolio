"use client";

import { useEffect, useState } from "react";
import { SECTIONS } from "@/data/content";

export default function SideIndex() {
  const [activeId, setActiveId] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate top scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);

      // Track active section
      const sections = SECTIONS.map((s) => document.getElementById(s.id));
      const scrollPos = window.scrollY + window.innerHeight * 0.4;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveId(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      if (window.__lenis) {
        window.__lenis.scrollTo(elem, { duration: 0.8, offset: 0 });
      } else {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* 2px hairline progress bar at top */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[var(--accent)] z-[100] transition-all duration-75 origin-left pointer-events-none"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />

      {/* Right side indicator: desktop only (>= 1024px), anchored with safe area padding */}
      <nav
        aria-label="Section Index"
        className="fixed right-[max(16px,env(safe-area-inset-right))] top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-3 pointer-events-auto select-none"
      >
        {SECTIONS.map((section) => {
          const isActive = activeId === section.id;
          return (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              aria-current={isActive ? "true" : undefined}
              aria-label={`Jump to section ${section.label}`}
              className="group flex items-center justify-end py-1 text-right focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)] rounded"
            >
              {/* Label positioned strictly to the LEFT of the dot, expanding leftwards */}
              <span
                data-testid={`side-index-label-${section.id}`}
                className={`text-[11px] font-mono tracking-wider whitespace-nowrap mr-2.5 transition-all duration-200 pointer-events-none ${
                  isActive
                    ? "text-[var(--accent)] font-semibold opacity-100 translate-x-0"
                    : "text-[var(--muted-dark)] opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 group-hover:text-[var(--muted)] translate-x-1 group-hover:translate-x-0 group-focus-visible:translate-x-0"
                }`}
              >
                {section.label}
              </span>

              {/* Dot on the right */}
              <span
                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 flex-shrink-0 ${
                  isActive
                    ? "bg-[var(--accent)] scale-150 ring-2 ring-[var(--accent)]/30"
                    : "bg-white/20 group-hover:bg-white/60"
                }`}
              />
            </button>
          );
        })}
      </nav>
    </>
  );
}
