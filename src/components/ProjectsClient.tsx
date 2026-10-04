"use client";

import { useState } from "react";
import { ProjectItem, SECTIONS } from "@/data/content";
import { ArrowUpRight, CheckCircle2, ChevronDown, ChevronUp, Lock } from "lucide-react";
import { GithubIcon } from "./SocialIcons";
import Image from "next/image";
import { withBase } from "@/lib/basePath";

export default function ProjectsClient({
  featuredProject,
  otherProjects,
  hasAgrichainImage,
}: {
  featuredProject: ProjectItem;
  otherProjects: ProjectItem[];
  hasAgrichainImage: boolean;
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedId((curr) => (curr === id ? null : id));
  };

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="screen-panel w-full"
    >
      <div className="screen-panel-content max-w-[1200px] w-full mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-xs font-mono text-[var(--accent)] uppercase tracking-widest font-semibold">
              {SECTIONS[2].eyebrow}
            </span>
            <h2
              id="projects-heading"
              className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text)]"
            >
              Featured Systems
            </h2>
          </div>
        </div>

        {/* 12-Column Grid: 7/12 Featured Card on Left, 5/12 Index on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch min-h-0">
          {/* Left Column (7/12): Featured AgriChain Card */}
          <div className="lg:col-span-7 flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-[var(--surface)] border border-white/10 shadow-lg relative group/card">
            <div>
              <div className="flex items-center justify-between gap-3 mb-1.5">
                <span className="text-[10px] font-mono text-[var(--accent)] uppercase tracking-wider font-semibold">
                  FEATURED
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-[var(--muted)] border border-white/5">
                  Polygon Amoy
                </span>
              </div>

              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="text-lg sm:text-xl font-bold text-[var(--text)]">
                  {featuredProject.title}
                </h3>
                {featuredProject.repoUrl && (
                  <a
                    href={featuredProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${featuredProject.title}, opens GitHub in a new tab`}
                    className="p-1 rounded text-[var(--muted)] hover:text-[var(--accent)] transition-colors focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                )}
              </div>

              <p className="text-xs text-[var(--accent)] font-medium mb-2.5">
                {featuredProject.tagline}
              </p>

              {/* Clean SVG Architecture Diagram in site theme (or custom screenshot if added) */}
              <div className="relative w-full aspect-[22/8] rounded-xl overflow-hidden bg-[#110E0C] border border-white/10 mb-2.5 flex items-center justify-center">
                {hasAgrichainImage ? (
                  <Image
                    src={withBase("/projects/agrichain.png")}
                    alt={`${featuredProject.title} preview`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <svg
                    viewBox="0 0 540 115"
                    className="w-full h-full text-[var(--accent)]"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="AgriChain 4-Tier Provenance and Fraud Engine Architecture"
                  >
                    <rect width="540" height="115" rx="8" fill="#130F0C" />

                    {/* Ledger line */}
                    <line
                      x1="60"
                      y1="64"
                      x2="480"
                      y2="64"
                      stroke="rgba(255,255,255,0.12)"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                    <line
                      x1="80"
                      y1="64"
                      x2="460"
                      y2="64"
                      stroke="var(--accent)"
                      strokeWidth="1.5"
                      strokeOpacity="0.4"
                    />

                    {/* Fraud engine badge */}
                    <g transform="translate(270, 20)">
                      <rect
                        x="-48"
                        y="-4"
                        width="96"
                        height="20"
                        rx="10"
                        fill="#1F1712"
                        stroke="var(--accent)"
                        strokeWidth="1"
                      />
                      <text
                        x="0"
                        y="10"
                        fill="var(--accent)"
                        fontSize="8.5"
                        fontFamily="monospace"
                        fontWeight="700"
                        textAnchor="middle"
                        letterSpacing="0.8"
                      >
                        FRAUD ENGINE
                      </text>
                      <line
                        x1="0"
                        y1="16"
                        x2="0"
                        y2="44"
                        stroke="var(--accent)"
                        strokeWidth="1"
                        strokeDasharray="2 2"
                        strokeOpacity="0.7"
                      />
                    </g>

                    {/* Node 1: Farmer */}
                    <g transform="translate(90, 64)">
                      <circle r="15" fill="#1A1410" stroke="var(--accent)" strokeWidth="1.5" />
                      <circle r="5" fill="var(--accent)" fillOpacity="0.6" />
                      <text
                        y="26"
                        fill="#F7F3EE"
                        fontSize="10"
                        fontFamily="monospace"
                        textAnchor="middle"
                        fontWeight="600"
                      >
                        Farmer
                      </text>
                      <text
                        y="-20"
                        fill="#8E867C"
                        fontSize="8"
                        fontFamily="monospace"
                        textAnchor="middle"
                      >
                        01 Origin
                      </text>
                    </g>

                    {/* Node 2: Distributor */}
                    <g transform="translate(210, 64)">
                      <circle
                        r="15"
                        fill="#1A1410"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="1.2"
                      />
                      <circle r="5" fill="#FF7A1A" fillOpacity="0.4" />
                      <text
                        y="26"
                        fill="#F7F3EE"
                        fontSize="10"
                        fontFamily="monospace"
                        textAnchor="middle"
                        fontWeight="600"
                      >
                        Distributor
                      </text>
                      <text
                        y="-20"
                        fill="#8E867C"
                        fontSize="8"
                        fontFamily="monospace"
                        textAnchor="middle"
                      >
                        02 Transit
                      </text>
                    </g>

                    {/* Node 3: Retailer */}
                    <g transform="translate(330, 64)">
                      <circle
                        r="15"
                        fill="#1A1410"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="1.2"
                      />
                      <circle r="5" fill="#FF7A1A" fillOpacity="0.4" />
                      <text
                        y="26"
                        fill="#F7F3EE"
                        fontSize="10"
                        fontFamily="monospace"
                        textAnchor="middle"
                        fontWeight="600"
                      >
                        Retailer
                      </text>
                      <text
                        y="-20"
                        fill="#8E867C"
                        fontSize="8"
                        fontFamily="monospace"
                        textAnchor="middle"
                      >
                        03 Custody
                      </text>
                    </g>

                    {/* Node 4: Consumer */}
                    <g transform="translate(450, 64)">
                      <circle r="15" fill="#1A1410" stroke="var(--accent)" strokeWidth="1.5" />
                      <circle r="5" fill="var(--accent)" fillOpacity="0.8" />
                      <text
                        y="26"
                        fill="#F7F3EE"
                        fontSize="10"
                        fontFamily="monospace"
                        textAnchor="middle"
                        fontWeight="600"
                      >
                        Consumer
                      </text>
                      <text
                        y="-20"
                        fill="#8E867C"
                        fontSize="8"
                        fontFamily="monospace"
                        textAnchor="middle"
                      >
                        04 QR Verify
                      </text>
                    </g>
                  </svg>
                )}
              </div>

              {/* Factual Bullets from content.ts */}
              <ul className="space-y-1 mb-2">
                {featuredProject.features?.slice(0, 3).map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 text-[11px] text-[var(--muted)] leading-tight">
                    <CheckCircle2 className="w-3 h-3 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Stack & Direct Link */}
            <div className="flex items-center justify-between pt-2 border-t border-white/5 mt-auto">
              <div className="flex flex-wrap gap-1">
                {featuredProject.stack
                  .filter((t) => t !== "Polygon Amoy") // Avoid duplicate tag since badge already displays Polygon Amoy
                  .slice(0, 4)
                  .map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[9px] font-mono bg-white/5 text-[var(--muted)] rounded border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
              </div>

              {featuredProject.repoUrl && (
                <a
                  href={featuredProject.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="AgriChain, opens GitHub in a new tab"
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--accent)] text-slate-950 text-[11px] font-semibold hover:bg-[var(--accent-hover)] transition-colors focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
                >
                  <span>Repository</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          {/* Right Column (5/12): Equal-Height 4-Row Index */}
          <div className="lg:col-span-5 grid grid-rows-4 gap-2.5 h-full">
            {otherProjects.map((project: ProjectItem) => {
              const hasRepo = Boolean(project.repoUrl);
              const isExpanded = expandedId === project.id;

              const content = (
                <>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <h4 className="text-xs font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors truncate">
                        {project.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {project.year && (
                        <span className="text-[10px] font-mono text-[var(--muted-dark)] font-medium">
                          {project.year}
                        </span>
                      )}
                      {hasRepo ? (
                        <ArrowUpRight className="w-3.5 h-3.5 text-[var(--muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      ) : (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono bg-white/5 text-[var(--muted-dark)] border border-white/5">
                          <Lock className="w-2.5 h-2.5 opacity-60" />
                          <span>Private</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-[11px] text-[var(--muted)] line-clamp-1 mt-0.5">
                    {project.tagline}
                  </p>

                  <div className="flex items-center justify-between mt-1">
                    <div className="flex flex-wrap gap-1">
                      {project.stack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-[9px] font-mono px-1.5 py-0.5 bg-white/5 text-[var(--muted-dark)] rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {!hasRepo && project.bullets && (
                      <button
                        type="button"
                        onClick={(e) => toggleExpand(project.id, e)}
                        className="text-[10px] font-mono text-[var(--muted)] hover:text-[var(--accent)] flex items-center gap-0.5 focus:outline-none"
                        aria-expanded={isExpanded}
                        aria-label={`Toggle details for ${project.title}`}
                      >
                        <span>{isExpanded ? "Close" : "Details"}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-3 h-3" />
                        ) : (
                          <ChevronDown className="w-3 h-3" />
                        )}
                      </button>
                    )}
                  </div>

                  {/* Inline Expanded Details for Private Projects */}
                  {isExpanded && project.bullets && (
                    <div className="mt-2 pt-2 border-t border-white/10 space-y-1">
                      {project.bullets.map((b, i) => (
                        <div key={i} className="flex items-start gap-1 text-[10px] text-[var(--muted)]">
                          <span className="text-[var(--accent)] font-mono">&bull;</span>
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              );

              if (hasRepo) {
                return (
                  <a
                    key={project.id}
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title}, opens GitHub repository in a new tab`}
                    className="group flex flex-col justify-center p-3 rounded-xl bg-[var(--surface)] border border-white/5 hover:border-[var(--accent)] hover:bg-[var(--surface-hover)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer focus-visible:border-[var(--accent)]"
                  >
                    {content}
                  </a>
                );
              }

              return (
                <div
                  key={project.id}
                  className="flex flex-col justify-center p-3 rounded-xl bg-[var(--surface)] border border-white/5 transition-all duration-200"
                >
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
