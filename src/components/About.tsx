import { PERSONAL_INFO } from "@/data/content";
import TechLogos from "./TechLogos";
import { Globe2 } from "lucide-react";

export default function About() {
  // TODO(Sujal): add one personal sentence about hobbies or life outside code

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="screen-panel w-full"
    >
      <div className="max-w-[1200px] w-full mx-auto px-6 md:px-12 my-auto pt-16 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column (7/12): Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="text-xs font-mono text-[var(--accent)] uppercase tracking-widest font-semibold mb-1">
              01 / About
            </span>

            <h2
              id="about-heading"
              className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text)] mb-4"
            >
              About me
            </h2>

            {/* Concise Handwritten Voice (~65 words total) */}
            <div className="space-y-3 font-handwriting text-lg sm:text-xl text-slate-300 leading-snug">
              <p>
                I study Computer Science and Engineering at BMSIT&M in Bengaluru, where I&apos;ve been building software since 2023.
              </p>
              <p>
                I build full-stack web applications with React, Node, and FastAPI, write Solidity smart contracts for supply chains, and integrate the Claude API for research workflows.
              </p>
              <p>
                Currently, I am learning network security fundamentals, smart-contract auditing techniques, and mathematical curve fitting models in MATLAB.
              </p>
            </div>
          </div>

          {/* Right Column (5/12): Stack + At a Glance Stats + Languages */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-5 lg:border-l lg:border-white/5 lg:pl-10">
            {/* Core Technologies 4x2 grid */}
            <div>
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--muted)] mb-2.5">
                Core technologies
              </h3>
              <TechLogos />
            </div>

            {/* At a glance (Single row of 3 stat cards) */}
            <div>
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--muted)] mb-2">
                At a glance
              </h3>
              <div className="grid grid-cols-3 gap-2.5 max-w-sm">
                {PERSONAL_INFO.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-[var(--surface)] border border-white/5 text-center flex flex-col justify-center"
                  >
                    <span className="text-xl font-extrabold text-[var(--accent)] font-mono">
                      {stat.value}
                    </span>
                    <span className="text-[10px] text-[var(--muted)] mt-0.5 leading-tight font-medium">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages spoken */}
            <div className="flex items-center gap-2 text-xs text-[var(--muted)] pt-1">
              <Globe2 className="w-3.5 h-3.5 text-[var(--accent)] flex-shrink-0" />
              <span className="font-mono text-[11px] truncate">
                {PERSONAL_INFO.languages.join(" • ")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
