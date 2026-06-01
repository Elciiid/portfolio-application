"use client";

import Link from "next/link";
import ResumeModal from "@/components/ui/ResumeModal";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FileText } from "lucide-react";

const navLinks = [
  { label: "About",    href: "#about",    id: "about"    },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Contact",  href: "#contact",  id: "contact"  },
];

// ─── Monospaced live clock ────────────────────────────────────────────────────
function NavClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Manila",
      });
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <motion.span
      className="hidden lg:block font-mono text-[11px] tracking-[0.08em] select-none"
      style={{ color: "var(--muted-foreground)", opacity: 0.45 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.45 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      PHT {time}
    </motion.span>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled]           = useState(false);
  const [resumeOpen, setResumeOpen]       = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  // ── Scroll shadow ──────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Scroll-spy via IntersectionObserver ────────────────────────────────────
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.id);
    const observers: IntersectionObserver[] = [];
    const visible = new Set<string>();

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            visible.add(id);
          } else {
            visible.delete(id);
          }

          // Pick the top-most visible section
          const current = sectionIds.find((s) => visible.has(s)) ?? "";
          setActiveSection(current);

          // Update URL hash silently — no history entries added
          if (current) {
            window.history.replaceState(null, "", `#${current}`);
          } else if (window.scrollY < 80) {
            window.history.replaceState(null, "", "/");
          }
        },
        { threshold: 0.25 }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300"
        style={{
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "blur(8px)",
          backgroundColor: scrolled
            ? "color-mix(in srgb, var(--background) 85%, transparent)"
            : "color-mix(in srgb, var(--background) 60%, transparent)",
          borderColor: scrolled ? "var(--border)" : "transparent",
        }}
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      >
        <nav className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">

          {/* Left: logo + nav links */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center text-[11px] font-bold tracking-tight text-background bg-foreground shrink-0 transition-opacity duration-200 group-hover:opacity-75"
                aria-hidden="true"
              >
                JD
              </div>
              <span className="font-medium text-[14px] resend-link">
                Jonas David
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.id;
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className="relative text-[14px] group transition-colors duration-200"
                    style={{
                      color: isActive
                        ? "var(--foreground)"
                        : "var(--muted-foreground)",
                    }}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 + i * 0.07 }}
                  >
                    {link.label}
                    {/* Underline — solid when active, grows on hover */}
                    <span
                      className="absolute -bottom-0.5 left-0 h-px bg-foreground/40 transition-all duration-300 group-hover:w-full"
                      style={{ width: isActive ? "100%" : "0%" }}
                    />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Right: clock + theme toggle + Resume CTA */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.35 }}
          >
            <NavClock />
            <button
              id="resume-btn"
              onClick={() => setResumeOpen(true)}
              className="resend-button resend-button-primary h-9 px-4 text-[13px] gap-1.5"
              aria-label="Open Jonas David resume PDF"
            >
              <FileText size={13} />
              Resume PDF
            </button>
          </motion.div>
        </nav>
      </motion.header>

      {/* Resume lightbox — rendered outside the header so it's full-screen */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
}
