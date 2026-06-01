"use client";

import { ArrowRight, FileText } from "lucide-react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const SystemGraph = dynamic(() => import("@/components/ui/SystemGraph"), {
  ssr: false,
});

const easeEnter = [0.22, 1, 0.36, 1] as const;
const COORD_LABELS = ["01", "02", "03"];

function LiveStatus() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Manila",
      });
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      className="flex items-center gap-3 mb-7"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.28, ease: easeEnter }}
    >
      <span
        className="font-mono text-[11px] tracking-[0.12em]"
        style={{ color: "var(--muted-foreground)", opacity: 0.5 }}
      >
        PHT {time}
      </span>
      <span
        className="w-px h-3"
        style={{ background: "var(--border)" }}
      />
      <span
        className="font-mono text-[11px] tracking-[0.1em]"
        style={{ color: "var(--muted-foreground)", opacity: 0.5 }}
      >
        full-stack &amp; AI systems
      </span>
    </motion.div>
  );
}

function CoordinateRule() {
  return (
    <div
      className="absolute left-0 top-0 bottom-0 hidden lg:flex flex-col items-center gap-0"
      style={{ width: "36px", zIndex: 1 }}
      aria-hidden="true"
    >
      <motion.div
        className="w-px bg-border origin-top flex-1"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: easeEnter, delay: 0.2 }}
        style={{ minHeight: "100%" }}
      />
      <div className="absolute inset-y-0 left-0 w-full flex flex-col justify-evenly pointer-events-none">
        {COORD_LABELS.map((label, i) => (
          <motion.span
            key={label}
            className="coord-label pl-3"
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.55 + i * 0.1, ease: easeEnter }}
          >
            {label}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const graphY = useTransform(scrollYProgress, [0, 1], [0, -48]);

  return (
    <section
      ref={sectionRef}
      className="relative pt-28 pb-16 lg:pb-0 overflow-hidden min-h-[90vh] flex items-center"
    >
      <div className="max-w-5xl mx-auto w-full px-6 lg:pl-14">
        <div className="relative min-h-[440px] flex items-center">
          <CoordinateRule />

          <div className="relative z-10 max-w-[580px] w-full lg:pl-8">
            <motion.div
              className="inline-flex items-center gap-2 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0 }}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
                  style={{ animation: "ping 1s cubic-bezier(0,0,0.2,1) 1" }}
                />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span
                className="text-[12px] font-medium tracking-wide"
                style={{ color: "var(--muted-foreground)" }}
              >
                Available for hire
              </span>
            </motion.div>

            <LiveStatus />

            <div className="mb-8">
              <div className="overflow-hidden">
                <motion.h1
                  className="text-[40px] md:text-[64px] font-semibold tracking-[-0.05em] leading-[1.05]"
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: easeEnter, delay: 0.1 }}
                >
                  I build the tools
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1
                  className="text-[40px] md:text-[64px] font-semibold tracking-[-0.05em] leading-[1.05]"
                  style={{ color: "var(--muted-foreground)" }}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: easeEnter, delay: 0.19 }}
                >
                  companies run on.
                </motion.h1>
              </div>
            </div>

            <motion.p
              className="text-[16px] md:text-[17px] leading-[1.7] mb-10 max-w-[480px]"
              style={{ color: "var(--muted-foreground)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: easeEnter, delay: 0.35 }}
            >
              Full-stack developer at{" "}
              <span className="text-foreground font-medium">La Rose Noire Philippines</span>
              {" "}- a 1,100-employee artisan bakery and manufacturer. Designed and shipped{" "}
              <span className="text-foreground font-medium">8 production systems</span>{" "}
              across real-time audio infrastructure, enterprise workflows, and internal tooling - all end-to-end, without handoffs.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeEnter, delay: 0.47 }}
            >
              <MagneticButton
                href="#projects"
                className="resend-button resend-button-primary h-11 px-6 gap-2"
              >
                View Projects <ArrowRight className="w-4 h-4" />
              </MagneticButton>
              <a
                href="/resume/Jonas_David_Resume.pdf"
                download="Jonas_David_Resume.pdf"
                className="resend-button resend-button-secondary h-11 px-6 gap-2"
                aria-label="Download Jonas David resume PDF"
              >
                <FileText className="w-4 h-4" /> Download Resume
              </a>
            </motion.div>

          </div>

          <motion.div
            aria-hidden="true"
            className="absolute pointer-events-none hidden lg:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.72 }}
            transition={{ duration: 1.4, delay: 0.4, ease: "easeOut" }}
            style={{
              left: "500px",
              right: "-240px",
              top: "-100px",
              bottom: "-80px",
              zIndex: 0,
              y: graphY,
              maskImage: [
                "linear-gradient(to right, transparent 0%, black 28%)",
                "linear-gradient(to bottom, transparent 0%, black 20%, black 75%, transparent 100%)",
              ].join(", "),
              maskComposite: "intersect",
              WebkitMaskImage: [
                "linear-gradient(to right, transparent 0%, black 28%)",
                "linear-gradient(to bottom, transparent 0%, black 20%, black 75%, transparent 100%)",
              ].join(", "),
              WebkitMaskComposite: "source-in",
            }}
          >
            <div className="w-full h-full" style={{ background: "transparent" }}>
              <SystemGraph />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function MagneticButton({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = 60;
    if (dist > 0 && dist < maxDist) {
      const strength = (1 - dist / maxDist) * 6;
      setPos({ x: (dx / dist) * strength, y: (dy / dist) * strength });
    }
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 300, damping: 28, mass: 0.5 }}
    >
      {children}
    </motion.a>
  );
}
