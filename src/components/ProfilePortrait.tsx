import fs from "fs";
import path from "path";
import Image from "next/image";

export default function ProfilePortrait() {
  const profileDiskPath = path.join(process.cwd(), "public", "profile.jpg");
  const hasProfilePhoto = fs.existsSync(profileDiskPath);

  if (!hasProfilePhoto && process.env.NODE_ENV === "development") {
    // Log in development console only, never show in UI
    console.warn("[ProfilePortrait] Notice: Place your real photo at /public/profile.jpg");
  }

  return (
    <div className="relative group w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 mx-auto flex-shrink-0">
      {/* Refined subtle frame */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent)]/15 to-transparent rounded-2xl transform rotate-1 group-hover:rotate-0 transition-transform duration-300" />

      <div className="relative w-full h-full bg-[var(--surface)] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center justify-center text-center p-4">
        {hasProfilePhoto ? (
          <Image
            src="/profile.jpg"
            alt="Sujal Kumar Kanu portrait"
            fill
            sizes="(max-width: 768px) 208px, 256px"
            priority
            className="object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center w-full h-full border border-dashed border-white/15 rounded-xl">
            <div className="w-16 h-16 rounded-xl bg-[var(--bg-1)] border border-[var(--border-active)] flex items-center justify-center text-xl font-bold text-[var(--accent)] mb-2 shadow-inner">
              SKK
            </div>
            <p className="text-xs font-semibold text-[var(--text)]">Sujal Kumar Kanu</p>
            <p className="text-[11px] text-[var(--muted)] mt-0.5">B.E. CSE &bull; BMSIT&M</p>
          </div>
        )}
      </div>
    </div>
  );
}
