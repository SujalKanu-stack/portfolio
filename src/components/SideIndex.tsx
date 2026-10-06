"use client";

import { useEffect, useRef } from "react";
import { SECTIONS } from "@/data/content";
import { useScrollSpy } from "@/lib/useScrollSpy";

export default function SideIndex() {
  const { activeSection, scrollToSection } = useScrollSpy();
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let ticking = false;

    const updateProgressBar = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollHeight)) : 0;

      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateProgressBar();
          ticking = false;
        });
        ticking = true;
      }
    };

    updateProgressBar();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <>
      {/* 2px hairline progress bar at top - direct GPU transform, zero jitter, zero layout recalculations */}
      <div
        ref={progressBarRef}
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[2px] bg-[var(--accent)] z-[100] origin-left pointer-events-none will-change-transform shadow-[0_0_8px_var(--accent)]"
        style={{ transform: "scaleX(0)" }}
      />

      {/* Right side indicator: desktop only (>= 1024px), anchored with safe area padding */}
      <nav
        aria-label="Section Index"
        className="fixed right-[max(16px,env(safe-area-inset-right))] top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-3 pointer-events-auto select-none"
      >
        {SECTIONS.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              aria-current={isActive ? "true" : undefined}
              aria-label={`Jump to section ${section.label}`}
              className="group flex items-center justify-end py-1 text-right focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)] rounded cursor-pointer"
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

