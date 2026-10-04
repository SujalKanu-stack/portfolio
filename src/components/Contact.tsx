"use client";

import { useState } from "react";
import { PERSONAL_INFO } from "@/data/content";
import { Copy, Check, Send, Mail, AlertCircle, ArrowUp } from "lucide-react";
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

    // Client-side validation
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setStatus("error");
      setFeedback("Please enter your name (minimum 2 characters).");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setStatus("error");
      setFeedback("Please enter a valid email address.");
      return;
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setStatus("error");
      setFeedback("Message must be at least 10 characters long.");
      return;
    }

    const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
    if (!endpoint) {
      setStatus("error");
      setFeedback(
        `Contact service endpoint is pending configuration. Please email directly using the link below or at ${PERSONAL_INFO.socials.email}.`
      );
      return;
    }

    setStatus("loading");
    setFeedback("");

    const submitUrl =
      endpoint.startsWith("http://") || endpoint.startsWith("https://")
        ? endpoint
        : `https://formspree.io/f/${endpoint}`;

    try {
      const res = await fetch(submitUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      });

      if (res.ok) {
        setStatus("success");
        setFeedback("Thank you! Your message has been sent successfully.");
        setFormData({ name: "", email: "", message: "", honeypot: "" });
      } else {
        const errorData = await res.json().catch(() => null);
        setStatus("error");
        setFeedback(
          errorData?.error || "Submission failed. Please reach out via direct email below."
        );
      }
    } catch (err) {
      console.error("Contact form error:", err);
      setStatus("error");
      setFeedback("Network connection error. Please email directly via the link below.");
    }
  };

  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="screen-panel w-full"
    >
      <div className="max-w-[1200px] w-full mx-auto px-6 md:px-12 my-auto pt-16 pb-4 flex flex-col justify-between h-full">
        <div>
          <div className="mb-4">
            <span className="text-xs font-mono text-[var(--accent)] uppercase tracking-widest font-semibold">
              05 / Contact
            </span>
            <h2
              id="contact-heading"
              className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text)]"
            >
              Get in touch
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column (5/12): Direct email & socials */}
            <div className="lg:col-span-5 space-y-4">
              <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                Whether you want to discuss full-stack development, smart contracts, or student opportunities, feel free to drop a line.
              </p>

              {/* Direct email card with copy */}
              <div className="p-3 rounded-xl bg-[var(--surface)] border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <Mail className="w-3.5 h-3.5 text-[var(--accent)] flex-shrink-0" />
                  <a
                    href={`mailto:${PERSONAL_INFO.socials.email}`}
                    className="text-xs text-[var(--text)] hover:text-[var(--accent)] truncate transition-colors font-mono"
                  >
                    {PERSONAL_INFO.socials.email}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label="Copy email address"
                  className="p-1 rounded text-[var(--muted)] hover:text-[var(--text)] transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Social links */}
              <div className="flex gap-2">
                <a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 p-2.5 rounded-xl bg-[var(--surface)] border border-white/5 text-xs text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--accent)]/30 flex items-center justify-center gap-2 transition-colors min-h-[38px]"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span className="font-mono text-xs">GitHub</span>
                </a>

                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 p-2.5 rounded-xl bg-[var(--surface)] border border-white/5 text-xs text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--accent)]/30 flex items-center justify-center gap-2 transition-colors min-h-[38px]"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span className="font-mono text-xs">LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Right Column (7/12): Compact Contact Form */}
            <div className="lg:col-span-7">
              <form
                onSubmit={handleSubmit}
                className="p-5 sm:p-6 rounded-2xl bg-[var(--surface)] border border-white/10 space-y-3 shadow-xl"
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="name" className="block text-[10px] font-mono uppercase tracking-wider text-[var(--muted)] mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[var(--bg-1)] border border-white/10 text-[var(--text)] text-xs focus:border-[var(--accent)] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-[10px] font-mono uppercase tracking-wider text-[var(--muted)] mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[var(--bg-1)] border border-white/10 text-[var(--text)] text-xs focus:border-[var(--accent)] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-[10px] font-mono uppercase tracking-wider text-[var(--muted)] mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={3}
                    placeholder="Hi Sujal, I checked your AgriChain project and..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[var(--bg-1)] border border-white/10 text-[var(--text)] text-xs focus:border-[var(--accent)] focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Inline live status message */}
                <div aria-live="polite">
                  {status === "success" && (
                    <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{feedback}</span>
                    </div>
                  )}

                  {status === "error" && (
                    <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{feedback}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="px-5 py-2 rounded-full bg-[var(--accent)] text-slate-950 font-semibold text-xs hover:bg-[var(--accent-hover)] disabled:opacity-50 transition-colors flex items-center justify-center gap-2 min-h-[36px]"
                  >
                    <Send className="w-3 h-3" />
                    <span>{status === "loading" ? "Sending..." : "Send Message"}</span>
                  </button>

                  <a
                    href={`mailto:${PERSONAL_INFO.socials.email}?subject=Portfolio%20Inquiry`}
                    className="text-[11px] font-mono text-[var(--muted-dark)] hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1"
                  >
                    <Mail className="w-3 h-3" />
                    <span>Or send via mail client &rarr;</span>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Integrated 1-line Footer at the bottom of the contact screen panel */}
        <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[var(--muted-dark)] mt-4">
          <p>&copy; {new Date().getFullYear()} Sujal Kumar Kanu &bull; BMSIT&M Bengaluru</p>
          <a
            href="#home"
            onClick={handleBackToTop}
            className="flex items-center gap-1 hover:text-[var(--accent)] transition-colors focus:outline-none"
          >
            <span>Top</span>
            <ArrowUp className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
}
