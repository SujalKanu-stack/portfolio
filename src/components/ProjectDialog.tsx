"use client";

import { useEffect, useRef } from "react";
import { ProjectItem } from "@/data/content";
import { ArrowUpRight, CheckCircle2, X } from "lucide-react";

interface ProjectDialogProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
  triggerElement?: HTMLElement | null;
}

export default function ProjectDialog({
  project,
  isOpen,
  onClose,
  triggerElement,
}: ProjectDialogProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const activeTriggerRef = useRef<HTMLElement | null>(null);
  const scrollYRef = useRef<number>(0);

  // Open modal when isOpen changes to true
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && project) {
      activeTriggerRef.current = triggerElement || (document.activeElement as HTMLElement);
      scrollYRef.current = window.scrollY;

      // Stop Lenis while dialog is open
      if (window.__lenis) {
        window.__lenis.stop();
      }

      if (!dialog.open) {
        dialog.showModal();
      }

      // Preserve exact scroll position
      window.scrollTo({ top: scrollYRef.current, behavior: "instant" });
    }
  }, [isOpen, project, triggerElement]);

  const handleClose = () => {
    const dialog = dialogRef.current;
    const targetTrigger = activeTriggerRef.current;
    const targetScrollY = scrollYRef.current;

    if (dialog && dialog.open) {
      dialog.close();
    }

    if (window.__lenis) {
      window.__lenis.start();
    }

    // Maintain exact scroll position
    window.scrollTo({ top: targetScrollY, behavior: "instant" });

    // Return focus to triggering button before unmounting
    if (targetTrigger && typeof targetTrigger.focus === "function") {
      targetTrigger.focus({ preventScroll: true });
    }

    onClose();
  };

  // Close when clicking outside on backdrop
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      handleClose();
    }
  };

  const handleCancel = (e: React.SyntheticEvent) => {
    e.preventDefault();
    handleClose();
  };

  if (!project) return null;

  const isInProgress = project.status === "in-progress";
  const isPrivate = project.visibility === "private";

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
      aria-labelledby="dialog-project-title"
      data-lenis-prevent
      className="project-dialog bg-[#16120E] text-[var(--text)] border border-white/10 shadow-2xl p-0 w-[min(560px,92vw)] max-h-[80svh] sm:rounded-2xl rounded-t-2xl rounded-b-none outline-none overflow-hidden animate-dialog-in backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      <div
        data-lenis-prevent
        className="flex flex-col max-h-[80svh] overflow-y-auto p-5 sm:p-7"
      >
        {/* Header with Title and Close Button */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              {isInProgress && (
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold tracking-wide">
                  In progress
                </span>
              )}
              {isPrivate && (
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-[var(--muted)] border border-white/10 font-semibold tracking-wide">
                  Private
                </span>
              )}
              {project.year && (
                <span className="text-[11px] font-mono text-[var(--muted-dark)] font-medium">
                  {project.year}
                </span>
              )}
            </div>

            <h3
              id="dialog-project-title"
              className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text)] leading-snug"
            >
              {project.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close dialog"
            className="p-1.5 rounded-lg text-[var(--muted)] hover:text-[var(--text)] hover:bg-white/5 transition-colors focus-visible:ring-1 focus-visible:ring-[var(--accent)] flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tagline */}
        <p className="text-xs sm:text-sm text-[var(--accent)] font-medium mb-3 leading-relaxed">
          {project.tagline}
        </p>

        {/* 2 to 3 Sentence Factual Description */}
        <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed mb-4">
          {project.description}
        </p>

        {/* 3 Factual Bullets */}
        {project.bullets && project.bullets.length > 0 && (
          <div className="mb-4">
            <h4 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--muted-dark)] mb-2">
              Key Architecture & Workflows
            </h4>
            <ul className="space-y-2">
              {project.bullets.map((bullet: string, idx: number) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-xs text-[var(--text)] leading-relaxed"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech Stack Tags */}
        <div className="mb-5">
          <h4 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--muted-dark)] mb-2">
            Technologies & Tools
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech: string) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[10px] font-mono bg-white/5 text-[var(--muted)] rounded border border-white/5"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Actions / Links ONLY if a URL exists */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3 mt-auto">
          <div className="text-[11px] text-[var(--muted-dark)] font-mono">
            {!project.repoUrl && !project.liveUrl && (
              <span>Architecture walkthrough available upon request</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} repository, opens in a new tab`}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--accent)] text-slate-950 text-xs font-semibold hover:bg-[var(--accent-hover)] transition-colors focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
              >
                <span>Repository</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live demo, opens in a new tab`}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 text-[var(--text)] text-xs font-semibold hover:bg-white/20 transition-colors focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
              >
                <span>Live Demo</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              type="button"
              onClick={handleClose}
              className="px-3.5 py-1.5 rounded-full bg-white/5 text-[var(--muted)] hover:text-[var(--text)] hover:bg-white/10 text-xs font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
