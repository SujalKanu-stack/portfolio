import { ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-white/5 text-center text-xs text-slate-500">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>
          &copy; {new Date().getFullYear()} Sujal Kumar Kanu &bull; Built with Next.js & Tailwind CSS
        </p>
        <a
          href="#home"
          aria-label="Back to top of page"
          className="inline-flex items-center gap-1.5 text-slate-400 hover:text-[#00D8F6] transition-colors"
        >
          <span>Back to top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </a>
      </div>
    </footer>
  );
}
