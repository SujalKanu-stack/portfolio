import fs from "fs";
import path from "path";
import { PERSONAL_INFO } from "@/data/content";
import ProfilePortrait from "./ProfilePortrait";
import HeroClient from "./HeroClient";
import LiveStatusStrip from "./LiveStatusStrip";

export default function Hero() {
  const resumeDiskPath = path.join(process.cwd(), "public", "Sujal_Kumar_Kanu_Resume.pdf");
  const hasResume = fs.existsSync(resumeDiskPath);

  return (
    <section
      id="home"
      aria-label="Home Introduction"
      className="screen-panel w-full relative z-10"
    >
      {/* Ambient background glow: slow drifting pure CSS field */}
      <div className="ambient-hero-glow" aria-hidden="true" />

      <div className="screen-panel-content max-w-[1200px] w-full mx-auto px-6 md:px-12 flex flex-col justify-between">
        <div className="pt-2 flex flex-col-reverse md:flex-row items-center gap-8 lg:gap-14">
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
