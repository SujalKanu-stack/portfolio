"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function SmoothScroll({
  children,
  isBooting = false,
}: {
  children: React.ReactNode;
  isBooting?: boolean;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const animId = requestAnimationFrame(raf);

    // Section snapping on desktop (>= 1024px)
    let snapTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      if (window.innerWidth < 1024) return;

      clearTimeout(snapTimeout);
      snapTimeout = setTimeout(() => {
        const sections = Array.from(document.querySelectorAll("section[id]")) as HTMLElement[];
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        // Find the section closest to viewport top
        let closestSection: HTMLElement | null = null;
        let minDiff = Infinity;

        sections.forEach((sec) => {
          const diff = Math.abs(sec.offsetTop - scrollY);
          if (diff < minDiff && diff < windowHeight * 0.45) {
            minDiff = diff;
            closestSection = sec;
          }
        });

        if (closestSection && minDiff > 10) {
          lenis.scrollTo(closestSection, { duration: 0.8, lock: false });
        }
      }, 160);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Intercept internal hash links to scroll smoothly with Lenis
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const element = document.querySelector(href);
        if (element) {
          e.preventDefault();
          lenis.scrollTo(element as HTMLElement, { duration: 1.1 });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) {
      if (isBooting) {
        lenisRef.current.stop();
      } else {
        lenisRef.current.start();
      }
    }
  }, [isBooting]);

  return <>{children}</>;
}
