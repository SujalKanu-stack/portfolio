import Image from "next/image";
import { withBase } from "@/lib/basePath";

export default function ProfilePortrait() {
  return (
    <div className="relative group w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 mx-auto flex-shrink-0">
      {/* Refined subtle frame with ambient accent glow */}
      <div
        className="absolute inset-0 bg-gradient-to-tr from-[var(--accent)]/20 to-transparent rounded-2xl transform rotate-1 group-hover:rotate-0 transition-transform duration-300"
        aria-hidden="true"
      />

      {/* Main glassmorphic card container */}
      <div className="relative w-full h-full bg-[var(--surface)] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center justify-center text-center p-2.5 sm:p-4">
        {/* Inner dashed frame */}
        <div className="flex flex-col items-center justify-center p-2 sm:p-4 md:p-5 text-center w-full h-full border border-dashed border-white/15 rounded-xl group-hover:border-white/25 transition-colors duration-300">
          {/* Portrait Photo Container with subtle orange glow and hover animation */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-24 lg:h-24 rounded-xl overflow-hidden bg-[var(--bg-1)] border border-[var(--border-active)] shadow-[0_0_15px_rgba(255,122,26,0.2)] group-hover:shadow-[0_0_25px_rgba(255,122,26,0.38)] group-hover:border-[var(--accent)] transition-all duration-300 mb-2 sm:mb-2.5 flex-shrink-0">
            <Image
              src={withBase("/profile.jpg")}
              alt="Sujal Kumar Kanu portrait"
              fill
              sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
              priority
              className="object-cover object-[center_25%] transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </div>

          {/* Identity details */}
          <p className="text-xs sm:text-sm font-semibold text-[var(--text)] tracking-tight">
            Sujal Kumar Kanu
          </p>
          <p className="text-[10px] sm:text-[11px] text-[var(--muted)] mt-0.5">
            B.E. CSE &bull; BMSIT&M
          </p>
        </div>
      </div>
    </div>
  );
}

