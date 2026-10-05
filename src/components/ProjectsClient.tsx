"use client";

import { useState } from "react";
import { ProjectItem, SECTIONS } from "@/data/content";
import { ArrowUpRight, CheckCircle2, Info } from "lucide-react";
import Image from "next/image";
import { withBase } from "@/lib/basePath";
import ProjectDialog from "./ProjectDialog";

export default function ProjectsClient({
  featuredProject,
  otherProjects,
  hasAgrichainImage,
}: {
  featuredProject: ProjectItem;
  otherProjects: ProjectItem[];
  hasAgrichainImage: boolean;
}) {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeTrigger, setActiveTrigger] = useState<HTMLElement | null>(null);

  const openDialog = (project: ProjectItem, e: React.MouseEvent<HTMLElement>) => {
    setActiveTrigger(e.currentTarget);
    setSelectedProject(project);
  };

  const closeDialog = () => {
    setSelectedProject(null);
  };

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="portfolio-section"
    >
      <div className="portfolio-container">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <span className="text-xs font-mono text-[var(--accent)] uppercase tracking-widest font-semibold block mb-1">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
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

              <div className="mb-1">
                <h3 className="text-lg sm:text-xl font-bold text-[var(--text)] leading-snug">
                  {featuredProject.title}
                </h3>
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

            {/* Bottom Stack & Single Direct Repository Link */}
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
                  aria-label="AgriChain repository, opens in a new tab"
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--accent)] text-slate-950 text-[11px] font-semibold hover:bg-[var(--accent-hover)] transition-colors focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
                >
                  <span>Repository</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          {/* Right Column (5/12): Responsive 3-Card Index */}
          <div className="lg:col-span-5 flex flex-col gap-3.5 h-full">
            {otherProjects.map((project: ProjectItem) => {
              const hasRepo = Boolean(project.repoUrl);
              const isInProgress = project.status === "in-progress";
              const isPrivate = project.visibility === "private";

              const innerContent = (
                <>
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 pr-2">
                      <h4 className="text-xs sm:text-sm font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors line-clamp-2 leading-tight">
                        {project.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
                      {isInProgress && (
                        <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold tracking-wide">
                          In progress
                        </span>
                      )}
                      {isPrivate && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-white/5 text-[var(--muted)] border border-white/5">
                          Private
                        </span>
                      )}
                      {project.year && (
                        <span className="text-[10px] font-mono text-[var(--muted-dark)] font-medium">
                          {project.year}
                        </span>
                      )}
                      {hasRepo ? (
                        <ArrowUpRight className="w-3.5 h-3.5 text-[var(--muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[var(--muted-dark)] group-hover:text-[var(--accent)] transition-colors">
                          <Info className="w-3 h-3" />
                          <span>Details</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-[11px] text-[var(--muted)] line-clamp-2 mt-1 leading-snug">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-white/5">
                    <div className="flex flex-wrap gap-1">
                      {project.stack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-[9px] font-mono px-1.5 py-0.5 bg-white/5 text-[var(--muted)] rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {!hasRepo && (
                      <span className="text-[10px] font-mono text-[var(--accent)] font-medium opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
                        View architecture &rarr;
                      </span>
                    )}
                  </div>
                </>
              );

              if (hasRepo) {
                return (
                  <a
                    key={project.id}
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} repository, opens in a new tab`}
                    className="group flex-1 flex flex-col justify-between p-3.5 sm:p-4 rounded-xl bg-[var(--surface)] border border-white/5 hover:border-[var(--accent)] hover:bg-[var(--surface-hover)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
                  >
                    {innerContent}
                  </a>
                );
              }

              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={(e) => openDialog(project, e)}
                  aria-haspopup="dialog"
                  aria-label={`${project.title}, opens architecture details dialog`}
                  className="group flex-1 flex flex-col justify-between p-3.5 sm:p-4 rounded-xl bg-[var(--surface)] border border-white/5 hover:border-[var(--accent)] hover:bg-[var(--surface-hover)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)] w-full"
                >
                  {innerContent}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Project Details Modal Dialog */}
      <ProjectDialog
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={closeDialog}
        triggerElement={activeTrigger}
      />
    </section>
  );
}
