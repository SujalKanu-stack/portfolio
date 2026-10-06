import { PERSONAL_INFO, SECTIONS } from "@/data/content";
import TechLogos from "./TechLogos";
import { Globe2 } from "lucide-react";

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="portfolio-section"
    >
      <div className="portfolio-container">
        {/* Section Header */}
        <div className="mb-5 sm:mb-8">
          <span className="text-xs font-mono text-[var(--accent)] uppercase tracking-widest font-semibold block mb-1">
            {SECTIONS[1].eyebrow}
          </span>
          <h2
            id="about-heading"
            className="fluid-h2 font-extrabold tracking-tight text-[var(--text)]"
          >
            About me
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-12 items-start">
          {/* Left Column (7/12): Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            {/* Concise Handwritten Voice with Responsive Fluid Clamp */}
            <div className="space-y-3.5 sm:space-y-4 font-handwriting text-[clamp(1.05rem,1.3vw+0.65rem,1.25rem)] text-slate-300 leading-relaxed">
              <p>
                I study Computer Science and Engineering at BMSIT&M in Bengaluru, where I&apos;ve been building software since 2024.
              </p>
              <p>
                I build full-stack web applications with React, Node, and FastAPI, write Solidity smart contracts for supply chains, and integrate the Claude API for research workflows.
              </p>
              <p>
                Right now I&apos;m learning generative AI: how large language models work, prompt engineering, and building AI agents. I&apos;ve already used the Claude API in Research Collab Hub, and next I want to build an agent end to end, while continuing to explore network security.
              </p>
            </div>
          </div>

          {/* Right Column (5/12): Stack + At a Glance Stats + Languages */}
          <div className="lg:col-span-5 flex flex-col justify-start space-y-4 sm:space-y-5 lg:border-l lg:border-white/5 lg:pl-8 xl:pl-10">
            {/* Core Technologies 4x2 grid */}
            <div>
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--muted)] mb-2 sm:mb-2.5">
                Core technologies
              </h3>
              <TechLogos />
            </div>

            {/* At a glance */}
            <div>
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--muted)] mb-2 sm:mb-2.5">
                At a glance
              </h3>
              <div className="grid grid-cols-3 gap-2 sm:gap-2.5 max-w-sm mb-2 sm:mb-2.5">
                {PERSONAL_INFO.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="p-2 sm:p-2.5 rounded-xl bg-[var(--surface)] border border-white/5 text-center flex flex-col justify-center min-h-[58px]"
                  >
                    <span className="text-base sm:text-lg font-extrabold text-[var(--accent)] font-mono leading-none">
                      {stat.value}
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-[var(--muted)] mt-1 leading-tight font-medium">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Now Learning compact card */}
              <div className="p-2.5 px-3 rounded-xl bg-[var(--surface)] border border-white/5 flex items-center justify-between max-w-sm gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="relative flex h-2 w-2 flex-shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
                  </span>
                  <div className="min-w-0">
                    <span className="text-[9px] font-mono text-[var(--muted-dark)] block uppercase tracking-wider">
                      Current Focus
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-semibold text-[var(--text)] truncate block">
                      Generative AI &bull; LLMs &bull; Agents
                    </span>
                  </div>
                </div>
                <span className="text-[9px] font-mono text-[var(--accent)] px-2 py-0.5 rounded bg-[var(--accent-subtle)] border border-[var(--border-active)] flex-shrink-0">
                  Active
                </span>
              </div>
            </div>

            {/* Languages spoken */}
            <div className="flex items-center gap-2 text-xs text-[var(--muted)] pt-0.5">
              <Globe2 className="w-3.5 h-3.5 text-[var(--accent)] flex-shrink-0" />
              <span className="font-mono text-[10px] sm:text-[11px] truncate">
                {PERSONAL_INFO.languages.join(" • ")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
