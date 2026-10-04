import fs from "fs";
import path from "path";
import { PERSONAL_INFO } from "@/data/content";
import ProfilePortrait from "./ProfilePortrait";
import { ArrowDown, FileText, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";

export default function Hero() {
  const resumeDiskPath = path.join(process.cwd(), "public", "Sujal_Kumar_Kanu_Resume.pdf");
  const hasResume = fs.existsSync(resumeDiskPath);

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="pt-28 pb-16 md:pt-36 md:pb-24 px-6 max-w-5xl mx-auto"
    >
      <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-14">
        {/* Left Column: Intro & Actions */}
        <div className="flex-1 text-center md:text-left">
          {/* Motto Tag Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E1E33] border border-[#00D8F6]/20 text-[#00D8F6] text-xs font-medium tracking-wide mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D8F6] animate-pulse" />
            <span className="font-handwriting text-sm tracking-normal">
              {PERSONAL_INFO.tagline}
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-100 leading-tight mb-5">
            Hi, I&apos;m{" "}
            <span className="text-[#00D8F6] hand-drawn-underline">Sujal</span>.
          </h1>

          {/* Two-line Intro */}
          <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed mb-8">
            Third-year Computer Science & Engineering student at BMSIT&M Bengaluru.
            I build blockchain supply-chain protocols, full-stack web applications, and applied generative AI tools.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-8">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00D8F6] text-slate-950 font-semibold text-sm hover:bg-[#33E1F8] transition-colors shadow-lg shadow-[#00D8F6]/10 min-h-[44px]"
            >
              <span>View my work</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            {hasResume ? (
              <a
                href={PERSONAL_INFO.resumePath}
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/15 text-slate-200 hover:text-white hover:border-[#00D8F6]/50 hover:bg-[#00D8F6]/5 text-sm font-medium transition-colors min-h-[44px]"
              >
                <FileText className="w-4 h-4 text-[#00D8F6]" />
                <span>Download resume</span>
              </a>
            ) : (
              <button
                type="button"
                disabled
                title="TODO(Sujal): Place your resume at /public/Sujal_Kumar_Kanu_Resume.pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-slate-400 text-sm font-medium cursor-not-allowed opacity-80 min-h-[44px]"
              >
                <FileText className="w-4 h-4 text-slate-500" />
                <span>Resume (Pending Upload)</span>
              </button>
            )}
          </div>

          {/* Social Icon Square Buttons */}
          <div className="flex items-center justify-center md:justify-start gap-2.5">
            <a
              href={PERSONAL_INFO.socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="Sujal Kumar Kanu on GitHub"
              className="w-10 h-10 rounded-lg bg-[#0E1B2E] border border-white/10 text-slate-400 hover:text-white hover:border-[#00D8F6]/40 hover:bg-[#13253D] flex items-center justify-center transition-all duration-200"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href={PERSONAL_INFO.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="Sujal Kumar Kanu on LinkedIn"
              className="w-10 h-10 rounded-lg bg-[#0E1B2E] border border-white/10 text-slate-400 hover:text-white hover:border-[#00D8F6]/40 hover:bg-[#13253D] flex items-center justify-center transition-all duration-200"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${PERSONAL_INFO.socials.email}`}
              aria-label="Email Sujal Kumar Kanu"
              className="w-10 h-10 rounded-lg bg-[#0E1B2E] border border-white/10 text-slate-400 hover:text-white hover:border-[#00D8F6]/40 hover:bg-[#13253D] flex items-center justify-center transition-all duration-200"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Right Column: Portrait */}
        <div className="flex-shrink-0">
          <ProfilePortrait />
        </div>
      </div>
    </section>
  );
}
