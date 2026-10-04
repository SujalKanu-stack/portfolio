import fs from "fs";
import path from "path";
import Image from "next/image";

export default function ProfilePortrait() {
  const profileDiskPath = path.join(process.cwd(), "public", "profile.jpg");
  const hasProfilePhoto = fs.existsSync(profileDiskPath);

  return (
    <div className="relative group w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 mx-auto">
      {/* Subtle rotated frame effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#00D8F6]/20 to-transparent rounded-2xl transform rotate-2 group-hover:rotate-1 transition-transform duration-300" />
      
      <div className="relative w-full h-full bg-[#0E1B2E] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center justify-center text-center p-4">
        {hasProfilePhoto ? (
          <Image
            src="/profile.jpg"
            alt="Sujal Kumar Kanu portrait"
            fill
            sizes="(max-width: 768px) 256px, 320px"
            priority
            className="object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 rounded-xl bg-[#13253D] border border-[#00D8F6]/30 flex items-center justify-center text-2xl font-bold text-[#00D8F6] mb-3">
              SKK
            </div>
            <p className="text-sm font-semibold text-slate-200">Sujal Kumar Kanu</p>
            <p className="text-xs text-slate-400 mt-1">B.E. CSE &bull; BMSIT&M Bengaluru</p>
            <span className="mt-4 px-2.5 py-1 text-[11px] font-mono bg-yellow-400/10 text-yellow-300 border border-yellow-400/25 rounded-md">
              TODO(Sujal): place photo at /public/profile.jpg
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
