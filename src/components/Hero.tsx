import fs from "fs";
import path from "path";
import { PERSONAL_INFO } from "@/data/content";
import ProfilePortrait from "./ProfilePortrait";
import HeroClient from "./HeroClient";
import LiveStatusStrip from "./LiveStatusStrip";

export default function Hero() {
  const resumeDiskPath = path.join(process.cwd(), "public", "Sujal_Kumar_Kanu_Resume_2026.pdf");
  const hasResume = fs.existsSync(resumeDiskPath);

  return (
    <section
      id="home"
      aria-label="Home Introduction"
      className="hero-panel w-full relative z-10"
    >
      {/* Ambient background glow: slow drifting pure CSS field */}
      <div className="ambient-hero-glow" aria-hidden="true" />

      <div className="portfolio-container flex flex-col justify-between flex-1 h-full min-h-0">
        <div className="pt-1 sm:pt-4 my-auto flex flex-col-reverse md:flex-row items-center gap-5 sm:gap-8 lg:gap-14">
          <HeroClient
            hasResume={hasResume}
            resumePath={PERSONAL_INFO.resumePath}
            socials={PERSONAL_INFO.socials}
          />
          <div className="flex-shrink-0">
            <ProfilePortrait />
          </div>
        </div>

        {/* Live bottom status strip */}
        <LiveStatusStrip />
      </div>
    </section>
  );
}
