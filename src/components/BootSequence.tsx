"use client";

import { useEffect, useState, useCallback } from "react";

const BOOT_LINES = [
  "> booting sujal.dev",
  "> mounting /education ........ ok",
  "> loading stack: solidity, react, fastapi, docker ... ok",
  "> compiling projects (3) ..... ok",
  "> ready.",
];

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [shouldRender, setShouldRender] = useState(true);
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [isDismissing, setIsDismissing] = useState(false);

  const finishBoot = useCallback(() => {
    if (isDismissing) return;
    setIsDismissing(true);
    try {
      sessionStorage.setItem("portfolio_booted", "true");
    } catch {
      // Ignore storage errors in private browsing
    }
    setTimeout(() => {
      setShouldRender(false);
      onComplete();
    }, 450);
  }, [isDismissing, onComplete]);

  useEffect(() => {
    // Check if user already booted this session or prefers reduced motion
    const alreadyBooted = sessionStorage.getItem("portfolio_booted");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (alreadyBooted || prefersReducedMotion) {
      const skipTimer = setTimeout(() => {
        setShouldRender(false);
        onComplete();
      }, 0);
      return () => clearTimeout(skipTimer);
    }

    // Line typing timers
    const timers: NodeJS.Timeout[] = [];
    BOOT_LINES.forEach((line, index) => {
      timers.push(
        setTimeout(() => {
          setVisibleLines((prev) => [...prev, line]);
        }, index * 260 + 100)
      );
    });

    // Progress counter
    const startTime = Date.now();
    const duration = 1500;
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(finishBoot, 200);
      }
    }, 30);

    // Global dismiss listeners
    const handleKeyDown = () => {
      finishBoot();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [finishBoot, onComplete]);

  if (!shouldRender) return null;

  return (
    <div
      id="boot-overlay"
      role="status"
      aria-label="System Initializing"
      onClick={finishBoot}
      className={`fixed inset-0 z-[9999] bg-[#090807] flex flex-col justify-between p-6 sm:p-12 font-mono text-xs sm:text-sm text-[var(--muted)] cursor-pointer select-none transition-transform duration-500 ease-in-out ${
        isDismissing ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <div className="max-w-xl mx-auto w-full my-auto space-y-2.5">
        <div className="flex items-center justify-between text-[11px] text-[var(--muted-dark)] mb-4 border-b border-white/10 pb-2">
          <span>SUJAL.DEV // TERMINAL BOOT</span>
          <span className="text-[var(--accent)]">[ESC OR CLICK TO SKIP]</span>
        </div>

        <div className="space-y-1.5 min-h-[140px]">
          {visibleLines.map((line, idx) => (
            <div
              key={idx}
              className={`${
                line.includes("ready")
                  ? "text-[var(--accent)] font-bold"
                  : "text-slate-300"
              }`}
            >
              {line}
            </div>
          ))}
        </div>

        {/* Progress Bar & Percentage */}
        <div className="pt-4 space-y-1.5">
          <div className="flex justify-between text-xs font-mono text-[var(--muted)]">
            <span>INITIALIZING ENVIRONMENT</span>
            <span className="text-[var(--accent)] font-bold">{progress}%</span>
          </div>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--accent)] transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="text-center text-[10px] text-[var(--muted-dark)] uppercase tracking-widest">
        Click anywhere or press any key to enter immediately
      </div>
    </div>
  );
}
