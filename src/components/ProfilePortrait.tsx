"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { withBase } from "@/lib/basePath";

export default function ProfilePortrait() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [canTilt, setCanTilt] = useState(false);

  useEffect(() => {
    // Enable 3D tilt only on desktop devices with hover support and without reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const isDesktopWidth = window.innerWidth >= 768;

    setCanTilt(!prefersReducedMotion && hasFinePointer && isDesktopWidth);

    const handleResize = () => {
      setCanTilt(
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
          window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
          window.innerWidth >= 768
      );
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Gentle 3D tilt: max +-7 degrees for refined feel
    const rotX = (0.5 - y) * 12;
    const rotY = (x - 0.5) * 12;
    setTilt({ x: rotX, y: rotY });
  };

  const handleMouseEnter = () => {
    if (canTilt) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const transformStyle =
    canTilt && isHovered
      ? `perspective(1000px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) scale3d(1.03, 1.03, 1.03) translateZ(0)`
      : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateZ(0)";

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative group mx-auto flex-shrink-0 cursor-pointer select-none
                 w-48 h-60 min-[400px]:w-52 min-[400px]:h-64 sm:w-60 sm:h-76 md:w-64 md:h-80 lg:w-72 lg:h-92 xl:w-76 xl:h-96"
      style={{
        transform: transformStyle,
        transition: isHovered
          ? "transform 0.12s ease-out, box-shadow 0.3s ease-out"
          : "transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.4s ease-out",
        willChange: "transform",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Ambient outer orange glow & soft shadow aura */}
      <div
        className="absolute -inset-1.5 rounded-[26px] bg-gradient-to-tr from-[var(--accent)]/30 via-[var(--accent)]/10 to-transparent blur-md opacity-60 group-hover:opacity-100 group-hover:blur-lg transition-all duration-500 pointer-events-none"
        aria-hidden="true"
      />

      {/* Main glassmorphic full-frame portrait card */}
      <div
        className="relative w-full h-full rounded-[22px] overflow-hidden bg-[var(--surface)] border border-white/15 
                   group-hover:border-[var(--accent)]/50 shadow-[0_12px_36px_rgba(0,0,0,0.85),0_0_20px_rgba(255,122,26,0.18)]
                   group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_35px_rgba(255,122,26,0.38)]
                   transition-all duration-500"
      >
        {/* Full-frame portrait photo */}
        <Image
          src={withBase("/profile.jpg")}
          alt="Sujal Kumar Kanu"
          fill
          sizes="(max-width: 640px) 210px, (max-width: 768px) 240px, (max-width: 1024px) 260px, 304px"
          priority
          className="object-cover object-[center_20%] select-none transition-transform duration-700 ease-out group-hover:scale-105"
          style={{
            transform: "translateZ(0)",
            willChange: "transform",
          }}
        />

        {/* Ambient subtle light sheen overlay on hover */}
        <div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-[var(--accent)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          aria-hidden="true"
        />

        {/* Cyber corner accent markers */}
        <div
          className="absolute top-2.5 left-2.5 w-2 h-2 border-t-2 border-l-2 border-[var(--accent)]/60 rounded-tl-sm pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute top-2.5 right-2.5 w-2 h-2 border-t-2 border-r-2 border-[var(--accent)]/60 rounded-tr-sm pointer-events-none"
          aria-hidden="true"
        />

        {/* Elegant bottom gradient overlay with name & title */}
        <div className="absolute inset-x-0 bottom-0 pt-16 pb-3.5 px-3.5 sm:pb-4 sm:px-4 md:pb-5 md:px-5 bg-gradient-to-t from-black/95 via-black/70 to-transparent flex flex-col justify-end text-left pointer-events-none">
          {/* Cyber status pill */}
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse shadow-[0_0_8px_var(--accent)]" />
            <span className="text-[9px] sm:text-[10px] font-mono tracking-wider text-[var(--accent)] uppercase font-semibold">
              Software Engineer
            </span>
          </div>

          {/* Name */}
          <h3 className="text-sm min-[400px]:text-base sm:text-lg md:text-xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
            Sujal Kumar Kanu
          </h3>

          {/* Title / Credentials */}
          <p className="text-[10px] min-[400px]:text-[11px] sm:text-xs text-[var(--muted)] font-medium mt-0.5 tracking-tight drop-shadow">
            B.E. CSE &bull; BMSIT&amp;M
          </p>
        </div>
      </div>
    </div>
  );
}
