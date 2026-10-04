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
        window.__lenis.scrollTo(elem, { duration: 1.1 });
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

      {/* Right side indicator: desktop only (>= 1024px) */}
      <nav
        aria-label="Section Index"
        className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3 pointer-events-auto select-none"
      >
        {SECTIONS.map((section) => {
          const isActive = activeId === section.id;
          return (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              aria-current={isActive ? "true" : undefined}
              className="group flex items-center justify-end gap-2.5 py-1 text-right focus:outline-none"
            >
              <span
                className={`text-[11px] font-mono tracking-wider transition-all duration-200 ${
                  isActive
                    ? "text-[var(--accent)] font-semibold opacity-100 translate-x-0"
                    : "text-[var(--muted-dark)] opacity-0 group-hover:opacity-100 group-hover:text-[var(--muted)] translate-x-2 group-hover:translate-x-0"
                }`}
              >
                {section.label}
              </span>
              <span
                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
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
