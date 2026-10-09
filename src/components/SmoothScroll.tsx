"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
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

    // Connect Lenis scroll events to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis via GSAP's high-precision 60/120fps hardware ticker
    const tickerHandler = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerHandler);
    gsap.ticker.lagSmoothing(0);

    // Global smooth navigation for anchor clicks (Home, About, Projects, Journey, Contact)
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
        }, 120);
      }
    }

    // Initialize ScrollTrigger animations if motion is allowed
    let stAnimations: ScrollTrigger[] = [];

    if (!prefersReducedMotion) {
      // 1. Parallax for hero background ambient glow
      const heroGlow = document.querySelector(".ambient-hero-glow");
      if (heroGlow) {
        const tween = gsap.to(heroGlow, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: "#home",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        if (tween.scrollTrigger) stAnimations.push(tween.scrollTrigger);
      }

      // 2. Subtle fade-up animations for each section header (triggered only once)
      const sectionIds = ["#about", "#projects", "#journey", "#contact"];
      sectionIds.forEach((id) => {
        const sec = document.querySelector(id);
        if (!sec) return;

        const header = sec.querySelector("h2")?.parentElement;
        if (header) {
          const tween = gsap.fromTo(
            header,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sec,
                start: "top 85%",
                once: true,
              },
            }
          );
          if (tween.scrollTrigger) stAnimations.push(tween.scrollTrigger);
        }
      });

      // 3. Reveal animations for cards, stats, skills, and project items
      // About stats cards
      const statCards = document.querySelectorAll("#about .grid.grid-cols-3 > div");
      if (statCards.length > 0) {
        const tween = gsap.fromTo(
          statCards,
          { opacity: 0, y: 16, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#about",
              start: "top 75%",
              once: true,
            },
          }
        );
        if (tween.scrollTrigger) stAnimations.push(tween.scrollTrigger);
      }

      // Projects cards reveal
      const projectCards = document.querySelectorAll("#projects .group\\/featured, #projects .group\\/card");
      if (projectCards.length > 0) {
        const tween = gsap.fromTo(
          projectCards,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#projects",
              start: "top 75%",
              once: true,
            },
          }
        );
        if (tween.scrollTrigger) stAnimations.push(tween.scrollTrigger);
      }

      // Journey cards reveal
      const journeyCards = document.querySelectorAll("#journey .space-y-3\\.5 > div, #journey .space-y-4 > div");
      if (journeyCards.length > 0) {
        const tween = gsap.fromTo(
          journeyCards,
          { opacity: 0, x: -16 },
          {
            opacity: 1,
            x: 0,
            duration: 0.55,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#journey",
              start: "top 75%",
              once: true,
            },
          }
        );
        if (tween.scrollTrigger) stAnimations.push(tween.scrollTrigger);
      }
    }

    return () => {
      stAnimations.forEach((st) => st.kill());
      gsap.ticker.remove(tickerHandler);
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
        // Refresh ScrollTrigger positions once boot finishes and DOM is settled
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100);
      }
    }
  }, [isBooting]);

  return <>{children}</>;
}
