"use client";

import { Home, User, FolderGit2, Compass, Mail } from "lucide-react";
import { useScrollSpy } from "@/lib/useScrollSpy";

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "journey", label: "Journey", icon: Compass },
  { id: "contact", label: "Contact", icon: Mail },
];

export default function Navbar() {
  const { activeSection, scrollToSection } = useScrollSpy();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <header className="fixed top-[max(0.625rem,env(safe-area-inset-top))] sm:top-4 inset-x-0 z-50 flex justify-center px-2 sm:px-4 pointer-events-none">
      <nav
        aria-label="Main Navigation"
        className="pointer-events-auto flex items-center gap-0.5 sm:gap-1 p-1 sm:p-1.5 rounded-full bg-[#110e0c]/90 backdrop-blur-md border border-white/10 shadow-2xl shadow-black/60 transition-all max-w-fit mx-auto"
      >
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs transition-all duration-200 min-h-[38px] min-w-[38px] justify-center select-none ${
                isActive
                  ? "bg-[var(--accent)] text-slate-950 font-bold shadow-sm shadow-[var(--accent)]/20"
                  : "text-[var(--muted)] font-medium hover:text-[var(--text)] hover:bg-white/5"
              }`}
            >
              <Icon className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="hidden sm:inline">{item.label}</span>
            </a>
          );
        })}
      </nav>
    </header>
  );
}

