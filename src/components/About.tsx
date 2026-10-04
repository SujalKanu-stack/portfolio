import { PERSONAL_INFO, SECTIONS } from "@/data/content";
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
      <div className="screen-panel-content max-w-[1200px] w-full mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column (7/12): Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            <span className="text-xs font-mono text-[var(--accent)] uppercase tracking-widest font-semibold mb-1">
              {SECTIONS[1].eyebrow}
            </span>

            <h2
              id="about-heading"
              className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text)] mb-4"
            >
              About me
            </h2>

            {/* Concise Handwritten Voice */}
            <div className="space-y-3 font-handwriting text-lg sm:text-xl text-slate-300 leading-snug">
              <p>
                I study Computer Science and Engineering at BMSIT&M in Bengaluru, where I&apos;ve been building software since 2023.
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
          <div className="lg:col-span-5 flex flex-col justify-start space-y-4 lg:border-l lg:border-white/5 lg:pl-10">
            {/* Core Technologies 4x2 grid */}
            <div>
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--muted)] mb-2">
                Core technologies
              </h3>
              <TechLogos />
            </div>

            {/* At a glance */}
            <div>
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--muted)] mb-2">
                At a glance
              </h3>
              <div className="grid grid-cols-3 gap-2 max-w-sm mb-2">
                {PERSONAL_INFO.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="p-2 rounded-xl bg-[var(--surface)] border border-white/5 text-center flex flex-col justify-center"
                  >
                    <span className="text-lg font-extrabold text-[var(--accent)] font-mono">
                      {stat.value}
                    </span>
                    <span className="text-[10px] text-[var(--muted)] mt-0.5 leading-tight font-medium">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Now Learning compact card */}
              <div className="p-2 px-3 rounded-xl bg-[var(--surface)] border border-white/5 flex items-center justify-between max-w-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="relative flex h-2 w-2 flex-shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
                  </span>
                  <div className="min-w-0">
                    <span className="text-[9px] font-mono text-[var(--muted-dark)] block uppercase tracking-wider">
                      Current Focus
                    </span>
                    <span className="text-[11px] font-semibold text-[var(--text)] truncate block">
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
