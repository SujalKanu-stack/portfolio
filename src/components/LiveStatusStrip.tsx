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
        window.__lenis.scrollTo(aboutElem, { duration: 1.1 });
      } else {
        aboutElem.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="w-full flex items-center justify-between text-[11px] font-mono text-[var(--muted)] border-t border-white/5 pt-3">
      {/* Live Bengaluru Time & Status */}
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
        </span>
        <span className="text-[var(--text)]">Bengaluru, IN</span>
        {time && <span className="text-[var(--muted-dark)] hidden sm:inline">({time} IST)</span>}
      </div>

      {/* Now Learning Pill with pulsing dot */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)] border border-white/10 text-[10px] sm:text-[11px] font-mono text-[var(--text)]">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--accent)]" />
        </span>
        <span className="text-[var(--muted)]">Now learning:</span>
        <span className="text-[var(--accent)] font-semibold">Generative AI</span>
        <span className="text-[var(--muted-dark)] hidden md:inline">(LLMs, prompt engineering, agents)</span>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={handleScrollDown}
        className="flex items-center gap-1.5 hover:text-[var(--accent)] transition-colors focus:outline-none"
      >
        <span>Scroll</span>
        <ArrowDown className="w-3 h-3 animate-bounce" />
      </button>
    </div>
  );
}
