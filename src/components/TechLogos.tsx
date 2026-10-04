import React from "react";

// Clean inline SVGs for the top 8 technologies
export default function TechLogos() {
  const logos = [
    {
      name: "Python",
      svg: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
          <path d="M11.9 2c-3.8 0-3.6 1.6-3.6 1.6l.0 1.7h3.7v.5H4.8S2 5.5 2 9.3s2.5 3.7 2.5 3.7h1.5v-1.8s-.1-2.2 2.2-2.2h3.7s2.1.0 2.1-2.1V4.1S14.2 2 11.9 2zm-1.8 1.1c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7zM12.1 22c3.8 0 3.6-1.6 3.6-1.6l-.0-1.7h-3.7v-.5h7.2s2.8.3 2.8-3.5-2.5-3.7-2.5-3.7h-1.5v1.8s.1 2.2-2.2 2.2h-3.7s-2.1-.0-2.1 2.1v2.8s-.2 2.1 2.1 2.1zm1.8-1.1c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7z" />
        </svg>
      ),
    },
    {
      name: "JavaScript",
      svg: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
          <path d="M3 3h18v18H3V3zm13.7 14.3c1.2 0 2-.6 2.4-1.4l-1.4-.9c-.3.5-.7.8-1.1.8-.6 0-1-.3-1-1.1v-4.9h-1.8v5c0 1.6.9 2.5 2.9 2.5zm-5.7 0c1.2 0 1.9-.6 2.3-1.3l-1.3-.9c-.3.5-.6.7-1 .7-.4 0-.7-.2-.7-.6 0-.5.3-.7.9-1l.7-.3c1.3-.6 2-1.2 2-2.5 0-1.5-1.1-2.5-2.7-2.5-1.3 0-2.2.6-2.6 1.5l1.4.8c.2-.4.6-.7 1.1-.7.4 0 .8.2.8.6 0 .4-.3.6-.8.8l-.7.3c-1.3.5-2 1.2-2 2.6-.1 1.7 1.2 2.5 2.6 2.5z" />
        </svg>
      ),
    },
    {
      name: "React",
      svg: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2" aria-hidden="true">
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(0 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="2" className="fill-current stroke-none" />
        </svg>
      ),
    },
    {
      name: "Node.js",
      svg: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
          <path d="M12 2l10 5.8v11.5L12 25l-10-5.7V7.8L12 2zm0 2.3L4.2 8.7v8.8l7.8 4.4 7.8-4.4V8.7L12 4.3z" />
        </svg>
      ),
    },
    {
      name: "Solidity",
      svg: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
          <path d="M12 1.5l-5.7 9.5 5.7 3.4 5.7-3.4L12 1.5zm0 13.9l-5.7-3.4L12 22.5l5.7-10.5-5.7 3.4z" />
        </svg>
      ),
    },
    {
      name: "Docker",
      svg: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
          <path d="M13.8 8.8h-1.9v-2h1.9v2zm-2.3 0H9.6v-2h1.9v2zm-2.4 0H7.2v-2h1.9v2zm4.7-2.4h-1.9v-2h1.9v2zm-2.3 0H9.6v-2h1.9v2zm-2.4 0H7.2v-2h1.9v2zm11.7 5.7c-.5-.4-1.5-.5-2.2-.2-.2-.6-.6-1.1-1.2-1.4l-.8-.4-.4.8c-.3.7-.3 1.5-.1 2.2-.6.3-1.6.4-2.8.4H2.4c-.2 1.1.2 2.3.9 3.2 1.2 1.6 3.1 2.5 5.7 2.5 6.3 0 10.7-3.9 11.8-8.1.7.2 1.4.1 2-.3.4-.3.7-.8.7-1.3-.8-.3-1.7-.5-2.6-.4z" />
        </svg>
      ),
    },
    {
      name: "Git",
      svg: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
          <path d="M21.7 10.8l-8.5-8.5c-.8-.8-2.2-.8-3 0L8.2 4.3l3.8 3.8c.8-.3 1.8-.1 2.4.5.6.6.8 1.6.5 2.4l3.6 3.6c.8-.3 1.8-.1 2.4.5.9.9.9 2.3 0 3.1s-2.3.9-3.1 0c-.7-.7-.9-1.8-.5-2.6L13.8 12v4.8c.3.2.6.5.7.9.6 1.4-.1 3.1-1.5 3.7-1.4.6-3.1-.1-3.7-1.5-.6-1.4.1-3.1 1.5-3.7.4-.2.8-.2 1.2-.2v-5c-.4-.1-.8-.2-1.2-.4L7 14.5c-.8.8-2.2.8-3 0l-1.7-1.7c-.8-.8-.8-2.2 0-3l8-8c.8-.8 2.2-.8 3 0l8.4 8.4c.8.8.8 2.2 0 3.1-.9.7-2.2.7-3 0z" />
        </svg>
      ),
    },
    {
      name: "Linux",
      svg: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
          <path d="M12.2 2c-3.1 0-4.6 2.3-4.6 5.6 0 1.5.3 3.5.7 4.7-.7.5-1.4 1.2-1.7 2.1-.4 1.1-.3 2.7.5 3.9-.7.4-1.3.9-1.6 1.6-.5 1.1-.2 2.2.9 2.2h11.2c1.1 0 1.4-1.1.9-2.2-.3-.7-.9-1.2-1.6-1.6.8-1.2.9-2.8.5-3.9-.3-.9-1-1.6-1.7-2.1.4-1.2.7-3.2.7-4.7 0-3.3-1.5-5.6-4.2-5.6zm-1.8 4.2c.4 0 .7.3.7.8s-.3.8-.7.8-.7-.3-.7-.8.3-.8.7-.8zm3.6 0c.4 0 .7.3.7.8s-.3.8-.7.8-.7-.3-.7-.8.3-.8.7-.8z" />
        </svg>
      ),
    },
  ];

  return (
    <div
      role="region"
      aria-label="Core Technology Grid"
      className="grid grid-cols-4 gap-3 max-w-sm"
    >
      {logos.map((logo) => (
        <div
          key={logo.name}
          title={logo.name}
          className="flex items-center justify-center p-3.5 rounded-xl bg-[#0e1c2e] border border-white/5 text-slate-400 hover:text-[#00D8F6] hover:border-[#00D8F6]/30 hover:bg-[#13253d] transition-all duration-200"
        >
          {logo.svg}
          <span className="sr-only">{logo.name}</span>
        </div>
      ))}
    </div>
  );
}
