"use client";

import { useEffect, useState, useRef, useCallback } from "react";

interface BootLineDef {
  text: string;
  isReady?: boolean;
}

const BOOT_LINES: BootLineDef[] = [
  { text: "> booting sujal.dev .......... OK" },
  { text: "> mounting /education ........ OK" },
  { text: "> loading stack: Python, JavaScript, React, Node.js, FastAPI, Docker, Solidity .... OK" },
  { text: "> initializing AI modules .... OK" },
  { text: "> compiling projects (4) ..... OK" },
  { text: "> verifying portfolio ........ OK" },
  { text: "> READY.", isReady: true },
];

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [shouldRender, setShouldRender] = useState(true);
  const [isDismissing, setIsDismissing] = useState(false);
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [currentLineText, setCurrentLineText] = useState("");
  const [isReadyActive, setIsReadyActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  const isDismissingRef = useRef(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const intervalsRef = useRef<NodeJS.Timeout[]>([]);
  const animFrameRef = useRef<number | null>(null);

  const finishBoot = useCallback(() => {
    if (isDismissingRef.current) return;
    isDismissingRef.current = true;
    setIsDismissing(true);

    // Clear active timeouts and animation frames
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    intervalsRef.current.forEach(clearInterval);
    intervalsRef.current = [];
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    setProgress(100);

    // Smooth transition into Hero section
    setTimeout(() => {
      setShouldRender(false);
      onComplete();
    }, 550);
  }, [onComplete]);

  // Cursor blink
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 450);
    intervalsRef.current.push(blinkInterval);
    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Check if automated audit test explicitly bypassed boot
    let auditBypass = false;
    try {
      auditBypass = sessionStorage.getItem("portfolio_booted") === "true";
    } catch {
      // Storage unavailable
    }

    if (prefersReducedMotion || auditBypass) {
      const skipTimer = setTimeout(() => {
        setShouldRender(false);
        onComplete();
      }, 0);
      return () => clearTimeout(skipTimer);
    }

    const schedule = (fn: () => void, ms: number) => {
      const id = setTimeout(() => {
        if (!isDismissingRef.current) fn();
      }, ms);
      timeoutsRef.current.push(id);
      return id;
    };

    // Smooth Progress Bar animation (0% to 100% over 3100ms)
    const startTime = performance.now();
    const totalDuration = 3100;

    const updateProgress = (now: number) => {
      if (isDismissingRef.current) return;
      const elapsed = now - startTime;
      const p = Math.min(100, Math.round((elapsed / totalDuration) * 100));
      setProgress(p);

      if (elapsed < totalDuration) {
        animFrameRef.current = requestAnimationFrame(updateProgress);
      }
    };
    animFrameRef.current = requestAnimationFrame(updateProgress);

    // Sequential Line Typewriter Timing
    const lineTimings = [
      { start: 60, end: 380 },
      { start: 420, end: 760 },
      { start: 800, end: 1400 },
      { start: 1450, end: 1800 },
      { start: 1850, end: 2200 },
      { start: 2250, end: 2600 },
      { start: 2650, end: 2900 },
    ];

    lineTimings.forEach((timing, idx) => {
      const lineDef = BOOT_LINES[idx];
      const targetText = lineDef.text;
      const lineDuration = timing.end - timing.start;
      const charCount = targetText.length;
      const stepInterval = Math.max(12, Math.floor(lineDuration / charCount));

      schedule(() => {
        let charIndex = 0;
        const typeInterval = setInterval(() => {
          if (isDismissingRef.current) {
            clearInterval(typeInterval);
            return;
          }
          // Step by 1 or 2 characters for long lines to maintain snappy pacing
          charIndex += charCount > 50 ? 2 : 1;
          if (charIndex > charCount) charIndex = charCount;

          setCurrentLineText(targetText.slice(0, charIndex));

          if (charIndex >= charCount) {
            clearInterval(typeInterval);
            if (lineDef.isReady) {
              setIsReadyActive(true);
            } else {
              setCompletedLines((prev) => [...prev, targetText]);
              setCurrentLineText("");
            }
          }
        }, stepInterval);
        intervalsRef.current.push(typeInterval);
      }, timing.start);
    });

    // Auto finish after animation completes (at ~3.4s)
    schedule(() => {
      finishBoot();
    }, 3400);

    // Global dismiss on click anywhere or press any key
    const handleKeyDown = () => {
      finishBoot();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      intervalsRef.current.forEach(clearInterval);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
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
      className={`fixed inset-0 z-[9999] bg-[#070605] flex flex-col justify-between p-4 sm:p-8 md:p-12 font-mono text-xs sm:text-sm text-[var(--muted)] cursor-pointer select-none transition-all duration-600 ease-out ${
        isDismissing
          ? "opacity-0 scale-[1.01] filter blur-[2px] pointer-events-none"
          : "opacity-100 scale-100 filter blur-0 pointer-events-auto"
      }`}
    >
      {/* Subtle radial ambient amber glow centered behind terminal */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255, 122, 26, 0.06) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      {/* Top spacer */}
      <div className="w-full h-4" aria-hidden="true" />

      {/* Central Terminal Window */}
      <div
        className="relative z-10 max-w-xl sm:max-w-2xl mx-auto w-full my-auto bg-[#100D0B]/95 border border-white/10 rounded-2xl p-5 sm:p-7 shadow-2xl shadow-black/90 backdrop-blur-md overflow-hidden"
      >
        {/* Subtle orange accent top hairline border */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[var(--accent)]/50 to-transparent" />

        {/* Window Topbar */}
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono pb-3 mb-4 border-b border-white/10 tracking-wider">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 pr-2">
            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-red-500/70 inline-block flex-shrink-0" />
            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-amber-500/70 inline-block flex-shrink-0" />
            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-emerald-500/70 inline-block flex-shrink-0" />
            <span className="text-[var(--muted-dark)] ml-1 font-semibold tracking-wider truncate">
              SUJAL.DEV // TERMINAL BOOT
            </span>
          </div>
          <button
            type="button"
            onClick={finishBoot}
            aria-label="Skip boot sequence"
            className="text-[var(--accent)] font-semibold tracking-wider hover:brightness-125 focus:outline-none transition-all cursor-pointer flex-shrink-0 text-[10px] sm:text-[11px]"
          >
            [ESC OR CLICK TO SKIP]
          </button>
        </div>

        {/* Terminal Log Lines Container */}
        <div className="min-h-[185px] sm:min-h-[205px] flex flex-col justify-start space-y-2 text-xs sm:text-[13px] leading-relaxed">
          {completedLines.map((line, idx) => (
            <div key={idx} className="font-mono text-slate-300">
              {line.includes("OK") ? (
                <div>
                  <span>{line.slice(0, line.lastIndexOf("OK"))}</span>
                  <span className="text-[var(--accent)] font-bold text-[11px] sm:text-xs">
                    OK
                  </span>
                </div>
              ) : (
                <div>{line}</div>
              )}
            </div>
          ))}

          {currentLineText && !isReadyActive && (
            <div className="text-slate-300 font-mono flex items-center">
              <span>{currentLineText}</span>
              {cursorVisible && (
                <span className="inline-block w-2 h-3.5 bg-[var(--accent)] ml-1 animate-pulse flex-shrink-0" />
              )}
            </div>
          )}

          {isReadyActive && (
            <div className="text-[var(--accent)] font-bold tracking-wide flex items-center pt-1 drop-shadow-[0_0_8px_rgba(255,122,26,0.6)]">
              <span>&gt; READY.</span>
              {cursorVisible && (
                <span className="inline-block w-2 h-4 bg-[var(--accent)] ml-1.5 animate-pulse" />
              )}
            </div>
          )}
        </div>

        {/* Progress Bar & Percentage Counter */}
        <div className="pt-5 border-t border-white/5 space-y-2 mt-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-[var(--muted-dark)] tracking-wider uppercase text-[10px] sm:text-xs">
              INITIALIZING ENVIRONMENT
            </span>
            <span className="text-[var(--accent)] font-bold text-xs sm:text-sm font-mono">
              {progress}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] rounded-full transition-all duration-75 ease-out shadow-[0_0_12px_var(--accent)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Subtle bottom skip instruction */}
      <div className="relative z-10 text-center text-[10px] sm:text-[11px] font-mono text-[var(--muted-dark)]/70 uppercase tracking-widest pb-2 animate-pulse">
        Click anywhere or press any key to skip
      </div>
    </div>
  );
}
