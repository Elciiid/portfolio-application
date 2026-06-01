"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const buildInfo = {
  framework: "Next.js",
  version:   "v2.1.0",
  updated:   "April 2026",
};

const socials = [
  { label: "GitHub",   href: "https://github.com/Elciiid" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jonas-david-487722352/" },
];

const email = "jonaselcid30@gmail.com";
const copyrightYear = 2026;

export default function Footer() {
  const [showEmail, setShowEmail] = useState(false);

  return (
    <motion.footer
      className="border-t border-border px-6 pt-12 pb-8"
      style={{
        background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.15) 100%)",
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease }}
      viewport={{ once: true, margin: "-40px" }}
    >
      <div className="max-w-5xl mx-auto">

        {/* Two-zone grid */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-border">

          {/* Zone 1: Identity + socials */}
          <div>
            <p className="text-[15px] font-semibold tracking-tight mb-1">
              Jonas David
            </p>
            <p
              className="font-mono text-[11px] tracking-[0.06em] mb-4"
              style={{ color: "var(--muted-foreground)", opacity: 0.6 }}
            >
              full-stack &amp; AI systems
            </p>
            <div className="relative flex items-center gap-4">
              {socials.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  className="text-[13px] resend-link"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {s.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => setShowEmail((current) => !current)}
                className="text-[13px] resend-link"
                style={{ color: "var(--muted-foreground)" }}
                aria-expanded={showEmail}
                aria-controls="footer-email"
              >
                Gmail
              </button>
              {showEmail && (
                <motion.div
                  id="footer-email"
                  role="status"
                  className="absolute left-0 bottom-full mb-3 rounded-md px-3 py-2 font-mono text-[12px] tracking-[0.04em] shadow-2xl"
                  style={{
                    color: "var(--foreground)",
                    background: "var(--muted)",
                    border: "1px solid var(--border)",
                  }}
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.18, ease }}
                >
                  {email}
                </motion.div>
              )}
            </div>
          </div>

          {/* Zone 2: Build metadata */}
          <div className="space-y-1.5 md:text-right">
            <p
              className="font-mono text-[11px] tracking-[0.06em]"
              style={{ color: "var(--muted-foreground)", opacity: 0.5 }}
            >
              Built with {buildInfo.framework}
            </p>
            <p
              className="font-mono text-[11px] tracking-[0.06em]"
              style={{ color: "var(--muted-foreground)", opacity: 0.5 }}
            >
              Last updated {buildInfo.updated}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-5">
          <p
            className="text-[12px]"
            style={{ color: "var(--muted-foreground)", opacity: 0.5 }}
          >
            (c) {copyrightYear} Jonas David. Open to full-time roles.
          </p>
        </div>

      </div>
    </motion.footer>
  );
}
