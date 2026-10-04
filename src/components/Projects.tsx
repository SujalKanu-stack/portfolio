import fs from "fs";
import path from "path";
import { PROJECTS, ProjectItem, SECTIONS } from "@/data/content";
import { ExternalLink, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "./SocialIcons";
import Image from "next/image";

export default function Projects() {
  const featuredProject = PROJECTS.find((p) => p.featured) || PROJECTS[0];
  const otherProjects = PROJECTS.filter((p) => !p.featured);

  const agrichainDiskPath = path.join(process.cwd(), "public", "projects", "agrichain.png");
  const hasAgrichainImage = fs.existsSync(agrichainDiskPath);

  if (!hasAgrichainImage && process.env.NODE_ENV === "development") {
    console.warn("[Projects] Notice: Place your AgriChain screenshot at /public/projects/agrichain.png");
  }

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="screen-panel w-full"
    >
      <div className="screen-panel-content max-w-[1200px] w-full mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between mb-4">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column (7/12): Featured AgriChain Card */}
          <div className="lg:col-span-7 flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-[var(--surface)] border border-white/10 shadow-lg relative">
            <div>
              <div className="flex items-center justify-between gap-3 mb-2">
                <span className="text-[11px] font-mono text-[var(--accent)] uppercase tracking-wider font-semibold">
                  Primary Architecture &bull; {featuredProject.year}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-[var(--muted)] border border-white/5">
                  Polygon Amoy
                </span>
              </div>

              <h3 className="text-xl font-bold text-[var(--text)] mb-1">
                {featuredProject.title}
              </h3>

              <p className="text-xs text-[var(--accent)] font-medium mb-3">
                {featuredProject.tagline}
              </p>

              {/* Mockup or Refined Prototype Frame */}
              <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden bg-[var(--bg-1)] border border-white/10 mb-3 flex items-center justify-center">
                {hasAgrichainImage ? (
                  <Image
                    src="/projects/agrichain.png"
                    alt={`${featuredProject.title} preview`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-3 text-center">
                    <span className="text-xs font-mono font-bold text-[var(--text)]">
                      4-Tier Provenance & Fraud Detection Engine
                    </span>
                    <span className="text-[10px] font-mono text-[var(--muted)] mt-0.5">
                      Farmer &bull; Distributor &bull; Retailer &bull; Consumer
                    </span>
                  </div>
                )}
              </div>

              {/* 3 "What I Built" bullets */}
              <ul className="space-y-1 mb-3">
                {featuredProject.features?.slice(0, 3).map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-[11px] text-[var(--muted)]">
                    <CheckCircle2 className="w-3 h-3 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-auto">
              <div className="flex flex-wrap gap-1">
                {featuredProject.stack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-[10px] font-mono bg-white/5 text-[var(--muted)] rounded border border-white/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2">
                {featuredProject.liveUrl && (
                  <a
                    href={featuredProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-[var(--accent)] text-slate-950 hover:bg-[var(--accent-hover)] transition-colors"
                    aria-label="Explore AgriChain"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {featuredProject.githubUrl && (
                  <a
                    href={featuredProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-[var(--text)] hover:bg-white/10 transition-colors"
                    aria-label="View AgriChain repository"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column (5/12): Compact Index of Other 4 Projects */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-2">
            {otherProjects.map((project: ProjectItem) => (
              <a
                key={project.id}
                href={project.githubUrl || "#"}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col justify-between p-3 rounded-xl bg-[var(--surface)] border border-white/5 hover:border-[var(--accent)] hover:bg-[var(--surface-hover)] transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                    {project.title}
                  </h4>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono text-[var(--muted-dark)]">
                      {project.year}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[var(--muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                </div>

                <p className="text-[11px] text-[var(--muted)] line-clamp-1 mt-0.5">
                  {project.tagline}
                </p>

                <div className="flex flex-wrap gap-1 mt-1.5">
                  {project.stack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-[9px] font-mono px-1.5 py-0.5 bg-white/5 text-[var(--muted-dark)] rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
