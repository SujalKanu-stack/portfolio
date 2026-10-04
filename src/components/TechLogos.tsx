"use client";

import React from "react";
import {
  SiPython,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiSolidity,
  SiDocker,
  SiGit,
  SiLinux,
} from "@icons-pack/react-simple-icons";

interface TechItem {
  name: string;
  icon: React.ComponentType<{ className?: string; color?: string; size?: number }>;
  brandColor: string;
}

const TECH_ITEMS: TechItem[] = [
  { name: "Python", icon: SiPython, brandColor: "#3776AB" },
  { name: "JavaScript", icon: SiJavascript, brandColor: "#F7DF1E" },
  { name: "React", icon: SiReact, brandColor: "#61DAFB" },
  { name: "Node.js", icon: SiNodedotjs, brandColor: "#5FA04E" },
  { name: "Solidity", icon: SiSolidity, brandColor: "#AA6746" },
  { name: "Docker", icon: SiDocker, brandColor: "#2496ED" },
  { name: "Git", icon: SiGit, brandColor: "#F05032" },
  { name: "Linux", icon: SiLinux, brandColor: "#FCC624" },
];

export default function TechLogos() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mx", `${x}px`);
    e.currentTarget.style.setProperty("--my", `${y}px`);
  };

  return (
    <div
      role="region"
      aria-label="Core Technologies"
      className="grid grid-cols-4 gap-2.5 max-w-sm"
    >
      {TECH_ITEMS.map((item) => {
        const IconComponent = item.icon;
        return (
          <div
            key={item.name}
            tabIndex={0}
            aria-label={item.name}
            onMouseMove={handleMouseMove}
            className="spotlight-card group relative flex flex-col items-center justify-center p-3 rounded-xl border border-white/10 bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--accent)] transition-all duration-200 cursor-default focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
          >
            <div className="w-5 h-5 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
              <IconComponent size={20} className="fill-current group-hover:opacity-100 opacity-80" />
            </div>
            <span className="text-[10px] font-mono tracking-tight text-[var(--muted)] group-hover:text-[var(--text)] mt-1.5 opacity-90 truncate max-w-full">
              {item.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
