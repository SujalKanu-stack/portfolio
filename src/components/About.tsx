import { PERSONAL_INFO } from "@/data/content";
import TechLogos from "./TechLogos";
import { Globe2 } from "lucide-react";

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-16 md:py-24 px-6 max-w-5xl mx-auto border-t border-white/5"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
        {/* Left Column: Personal Narrative */}
        <div className="md:col-span-7">
          <h2
            id="about-heading"
            className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 mb-6 flex items-center gap-3"
          >
            About me
          </h2>

          {/* Handwritten-font personal narrative */}
          <div className="space-y-4 font-handwriting text-xl sm:text-2xl text-slate-300 leading-relaxed">
            <p>
              I&apos;m <span className="text-[#00D8F6] font-bold">Sujal</span>. I study Computer Science and
              Engineering at BMSIT&M in Bengaluru, where I&apos;ve been building software since 2023.
            </p>
            <p>
              Most of my time is spent building full-stack applications with React, Node, and FastAPI,
              writing Solidity smart contracts for decentralized supply chains, and exploring applied AI systems with the Claude API.
            </p>
            <p>
              Right now, I&apos;m deepening my knowledge in network security, smart contract auditing, and statistical curve fitting models.
            </p>
            <p>
              When I&apos;m not writing code, I analyze distributed ledger architectures and collaborate in 24-hour hackathons with fellow students.
            </p>
          </div>

          {/* Languages spoken line */}
          <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-2 text-xs text-slate-400">
            <Globe2 className="w-4 h-4 text-[#00D8F6]" />
            <span>Languages: {PERSONAL_INFO.languages.join(" • ")}</span>
          </div>
        </div>

        {/* Right Column: Stack & Honest Stats */}
        <div className="md:col-span-5 flex flex-col justify-between gap-8">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">
              Core Technologies
            </h3>
            <TechLogos />
          </div>

          {/* Honest Stat Cards */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">
              Verified Metrics
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {PERSONAL_INFO.stats.map((stat, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-[#0E1B2E] border border-white/5 text-center flex flex-col justify-center"
                >
                  <span className="text-2xl font-extrabold text-[#00D8F6]">
                    {stat.value}
                  </span>
                  <span className="text-[11px] text-slate-400 mt-1 leading-tight font-medium">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
