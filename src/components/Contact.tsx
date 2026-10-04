"use client";

import { useState } from "react";
import { PERSONAL_INFO } from "@/data/content";
import { Copy, Check, Send, Mail, AlertCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "", honeypot: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.socials.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return; // Silent discard for bots

    setStatus("loading");
    setFeedback("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setFeedback(data.message || "Message sent successfully!");
        setFormData({ name: "", email: "", message: "", honeypot: "" });
      } else {
        setStatus("error");
        setFeedback(data.error || "Failed to send message. Please try emailing directly.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setFeedback("Network error. Please email directly at sujalguptaa121@gmail.com.");
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-16 md:py-24 px-6 max-w-5xl mx-auto border-t border-white/5"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
        {/* Left Column: Direct Links & Copy */}
        <div className="md:col-span-5">
          <h2
            id="contact-heading"
            className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 mb-3"
          >
            Get in touch
          </h2>
          
          <p className="text-sm text-slate-400 leading-relaxed mb-6">
            Whether you want to discuss full-stack development, smart contracts, or student opportunities, feel free to drop a line.
          </p>

          <div className="space-y-3 mb-8">
            {/* Email with copy button */}
            <div className="p-3.5 rounded-xl bg-[#0E1B2E] border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <Mail className="w-4 h-4 text-[#00D8F6] flex-shrink-0" />
                <a
                  href={`mailto:${PERSONAL_INFO.socials.email}`}
                  className="text-xs sm:text-sm text-slate-200 hover:text-[#00D8F6] truncate transition-colors"
                >
                  {PERSONAL_INFO.socials.email}
                </a>
              </div>
              <button
                type="button"
                onClick={copyEmail}
                aria-label="Copy email address to clipboard"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors flex-shrink-0"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            {/* Social links */}
            <div className="flex gap-2.5">
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noreferrer"
                className="flex-1 p-3 rounded-xl bg-[#0E1B2E] border border-white/5 text-xs text-slate-300 hover:text-white hover:border-[#00D8F6]/30 flex items-center justify-center gap-2 transition-colors min-h-[44px]"
              >
                <GithubIcon className="w-4 h-4 text-[#00D8F6]" />
                <span>GitHub</span>
              </a>

              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex-1 p-3 rounded-xl bg-[#0E1B2E] border border-white/5 text-xs text-slate-300 hover:text-white hover:border-[#00D8F6]/30 flex items-center justify-center gap-2 transition-colors min-h-[44px]"
              >
                <LinkedinIcon className="w-4 h-4 text-[#00D8F6]" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Working Contact Form */}
        <div className="md:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 rounded-2xl bg-[#0B1728] border border-white/10 space-y-4 shadow-xl"
          >
            {/* Honeypot field for bot detection */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="hp-field">Leave this empty</label>
              <input
                type="text"
                id="hp-field"
                name="hp-field"
                tabIndex={-1}
                autoComplete="off"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              />
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                required
                placeholder="Jane Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#070F1C] border border-white/10 text-slate-200 text-sm focus:border-[#00D8F6] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                required
                placeholder="jane@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#070F1C] border border-white/10 text-slate-200 text-sm focus:border-[#00D8F6] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
              >
                Message
              </label>
              <textarea
                id="message"
                required
                rows={4}
                placeholder="Hi Sujal, I reviewed your AgriChain project and..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#070F1C] border border-white/10 text-slate-200 text-sm focus:border-[#00D8F6] focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* Inline live status message */}
            <div aria-live="polite">
              {status === "success" && (
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 flex-shrink-0" />
                  <span>{feedback}</span>
                </div>
              )}

              {status === "error" && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{feedback}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#00D8F6] text-slate-950 font-semibold text-xs hover:bg-[#33E1F8] disabled:opacity-50 transition-colors flex items-center justify-center gap-2 min-h-[44px]"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{status === "loading" ? "Sending..." : "Send Message"}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
