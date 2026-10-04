import fs from "fs";
import path from "path";
import { PROJECTS, ProjectItem } from "@/data/content";
import { ExternalLink, ArrowUpRight, CheckCircle } from "lucide-react";
import { GithubIcon } from "./SocialIcons";
import Image from "next/image";

export default function Projects() {
  const featuredProject = PROJECTS.find((p) => p.featured) || PROJECTS[0];
  const otherProjects = PROJECTS.filter((p) => !p.featured);

  const agrichainDiskPath = path.join(process.cwd(), "public", "projects", "agrichain.png");
  const hasAgrichainImage = fs.existsSync(agrichainDiskPath);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-16 md:py-24 px-6 max-w-5xl mx-auto border-t border-white/5"
    >
      <div className="mb-10">
        <h2
          id="projects-heading"
          className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 mb-2"
        >
          Featured Work
        </h2>
        <p className="text-sm sm:text-base text-slate-400">
          Decentralized supply chains, applied AI systems, and interactive simulations.
        </p>
      </div>

      {/* 1. Large Featured Project Card: AgriChain */}
      <article className="rounded-2xl bg-[#0B1728] border border-white/10 overflow-hidden mb-14 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left / Top: Mockup Preview or Neutral Fallback */}
          <div className="lg:col-span-6 bg-[#081220] p-6 sm:p-8 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/10 relative min-h-[280px]">
            {hasAgrichainImage ? (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 shadow-lg">
                <Image
                  src="/projects/agrichain.png"
                  alt={`${featuredProject.title} interface screenshot`}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center bg-[#0d1c30] rounded-xl border border-dashed border-white/15">
                <div className="w-12 h-12 rounded-lg bg-[#00D8F6]/10 text-[#00D8F6] flex items-center justify-center font-mono text-sm font-bold mb-3">
                  ETH
                </div>
                <h4 className="text-sm font-bold text-slate-200">
                  {featuredProject.title} Prototype
                </h4>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">
                  Polygon Amoy Smart Contracts &bull; 4-Tier Provenance Lifecycle
                </p>
                <span className="mt-3 px-2.5 py-1 text-[11px] font-mono bg-yellow-400/10 text-yellow-300 border border-yellow-400/25 rounded-md">
                  TODO(Sujal): add /public/projects/agrichain.png
                </span>
              </div>
            )}
          </div>

          {/* Right: Technical Details & Architecture */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-3 mb-2">
                <span className="text-xs font-mono text-[#00D8F6] uppercase tracking-wider font-semibold">
                  Featured Case Study &bull; {featuredProject.year}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-100 mb-2">
                {featuredProject.title}
              </h3>
              
              <p className="text-xs sm:text-sm text-[#00D8F6]/90 font-medium mb-4">
                {featuredProject.tagline}
              </p>

              <p className="text-sm text-slate-300 leading-relaxed mb-5">
                {featuredProject.description}
              </p>

              {/* What I Built checklist */}
              {featuredProject.features && (
                <div className="space-y-2 mb-6">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    What I Engineered:
                  </h4>
                  <ul className="space-y-1.5">
                    {featuredProject.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-normal">
                        <CheckCircle className="w-3.5 h-3.5 text-[#00D8F6] flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Stack Badges */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {featuredProject.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs font-mono bg-white/5 border border-white/10 rounded text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
              {featuredProject.liveUrl && (
                <a
                  href={featuredProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#00D8F6] text-slate-950 font-semibold text-xs hover:bg-[#33E1F8] transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Explore System</span>
                </a>
              )}
              {featuredProject.githubUrl && (
                <a
                  href={featuredProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-200 hover:text-white hover:bg-white/10 text-xs font-medium transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>Smart Contracts / Repo</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </article>

      {/* 2. Project Index List */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">
          Other Projects & System Implementations
        </h3>

        <div className="divide-y divide-white/5 border-y border-white/5">
          {otherProjects.map((project: ProjectItem) => (
            <div
              key={project.id}
              className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-white/[0.02] px-2 rounded-lg transition-colors"
            >
              <div className="max-w-xl">
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="text-base font-bold text-slate-200 group-hover:text-[#00D8F6] transition-colors">
                    {project.title}
                  </h4>
                  <span className="text-xs font-mono text-slate-500">
                    {project.year}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 mb-2">
                  {project.tagline}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[11px] font-mono bg-white/5 text-slate-300 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View ${project.title} repository`}
                    className="p-2 rounded-lg text-slate-400 hover:text-[#00D8F6] hover:bg-white/5 transition-all"
                  >
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
