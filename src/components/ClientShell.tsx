"use client";

import { useState } from "react";
import BootSequence from "@/components/BootSequence";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import SideIndex from "@/components/SideIndex";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [isBooting, setIsBooting] = useState(true);

  return (
    <>
      {/* 1. Terminal Boot Sequence Overlay */}
      <BootSequence onComplete={() => setIsBooting(false)} />

      {/* 2. Smooth Scrolling & Section Snapping Wrapper */}
      <SmoothScroll isBooting={isBooting}>
        {/* Floating Centered Pill Navbar */}
        <Navbar />

        {/* Desktop Side Section Index (01-05) + Hairline Top Progress */}
        <SideIndex />

        <main id="main-content" className="w-full flex flex-col">
          {children}
        </main>
      </SmoothScroll>
    </>
  );
}
