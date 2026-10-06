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
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Optimized Lenis configuration for 60/120 FPS buttery smooth scrolling
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      syncTouch: false, // Maintain native, responsive hardware-accelerated touch physics on mobile
      touchMultiplier: 1.0,
      infinite: false,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    // Proper recursive RAF tracking to eliminate memory leaks and multiple loops
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Global smooth navigation for anchor clicks
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const element = document.querySelector(href);
        if (element) {
          e.preventDefault();
          lenis.scrollTo(element as HTMLElement, {
            duration: 0.85,
            offset: 0,
            lock: false,
          });
          // Update URL hash cleanly without abrupt native scroll jumping
          if (window.history.pushState) {
            window.history.pushState(null, "", href);
          }
        }
      } else if (href === "#") {
        e.preventDefault();
        lenis.scrollTo(0, { duration: 0.85 });
      }
    };

    document.addEventListener("click", handleAnchorClick);

    // Handle initial hash in URL if present
    if (window.location.hash) {
      const initialElement = document.querySelector(window.location.hash);
      if (initialElement) {
        setTimeout(() => {
          lenis.scrollTo(initialElement as HTMLElement, { duration: 0.6, offset: 0 });
        }, 100);
      }
    }

    return () => {
      cancelAnimationFrame(rafId);
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

