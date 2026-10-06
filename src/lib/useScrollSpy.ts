"use client";

import { useEffect, useState, useRef } from "react";

const SECTION_IDS = ["home", "about", "projects", "journey", "contact"];

export function useScrollSpy() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const activeSectionRef = useRef<string>("home");

  useEffect(() => {
    let ticking = false;

    const determineActiveSection = () => {
      const scrollY = window.scrollY;
      const innerHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      // 1. If at top of document
      if (scrollY < 100) {
        if (activeSectionRef.current !== "home") {
          activeSectionRef.current = "home";
          setActiveSection("home");
        }
        return;
      }

      // 2. If scrolled near the bottom of document
      if (scrollY + innerHeight >= scrollHeight - 80) {
        if (activeSectionRef.current !== "contact") {
          activeSectionRef.current = "contact";
          setActiveSection("contact");
        }
        return;
      }

      // 3. Find section crossing the focal line (35% from top of viewport)
      const focalLine = innerHeight * 0.35;
      let currentId = activeSectionRef.current;
      let found = false;

      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const id = SECTION_IDS[i];
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= focalLine && rect.bottom > focalLine) {
            currentId = id;
            found = true;
            break;
          }
        }
      }

      // Fallback: closest section above focal line
      if (!found) {
        for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
          const id = SECTION_IDS[i];
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= focalLine) {
              currentId = id;
              break;
            }
          }
        }
      }

      if (currentId !== activeSectionRef.current) {
        activeSectionRef.current = currentId;
        setActiveSection(currentId);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          determineActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial check
    determineActiveSection();

    // Listen to Lenis scroll if available, fallback to native window scroll
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    if (window.__lenis) {
      window.__lenis.scrollTo(el, { duration: 0.85, offset: 0 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }

    if (window.history.pushState) {
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return { activeSection, scrollToSection };
}
