"use client";

import { motion } from "framer-motion";

// ─── Animation config ─────────────────────────────────────────────────────────
const easeEnter = [0.22, 1, 0.36, 1] as const;

// ─── Section ──────────────────────────────────────────────────────────────────
export default function About() {
  return (
    <section id="about" className="py-24 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">

        {/* ── Left: sticky anchor column ────────────────────────────── */}
        <div className="md:col-span-4">
          <div className="md:sticky md:top-28 flex gap-5">

            {/* Vertical rule — draws down on entry */}
            <motion.div
              className="hidden md:block w-px shrink-0 bg-border origin-top"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.9, ease: easeEnter }}
              style={{ height: "120px" }}
            />

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: easeEnter }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <h2
                className="text-[11px] font-medium tracking-[0.12em] uppercase mb-3"
                style={{ color: "var(--muted-foreground)" }}
              >
                About
              </h2>
            </motion.div>
          </div>
        </div>

        {/* ── Right: identity statement ──────────────────────────────── */}
        <div className="md:col-span-8 space-y-6">
          <motion.p
            className="text-[22px] md:text-[26px] font-semibold leading-[1.25] tracking-[-0.03em]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeEnter }}
            viewport={{ once: true, margin: "-80px" }}
          >
            Full-stack developer who builds systems that production environments
            depend on — from schema to deployment, without handoffs.
          </motion.p>

          <motion.p
            className="text-[16px] leading-[1.75]"
            style={{ color: "var(--muted-foreground)" }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: easeEnter, delay: 0.1 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            During my internship at{" "}
            <span className="text-foreground font-medium">La Rose Noire Philippines</span>
            {" "}— a 1,100-employee artisan bakery and manufacturer — I designed and
            shipped 8 internal systems used daily by operations, HR, IT, and Facilities
            teams. These weren{"'"}t demo apps. They handled real workflows: synchronized
            audio across factory floors, health clearance approvals routing through
            three approval stages, and IT ticket triage across 9 staff members.
          </motion.p>

          <motion.p
            className="text-[16px] leading-[1.75]"
            style={{ color: "var(--muted-foreground)" }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: easeEnter, delay: 0.18 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            I{"'"}m now focused on layering AI into operational systems — building
            automation pipelines that reduce decision overhead for high-volume,
            process-heavy environments. Currently exploring Web3 infrastructure
            as a substrate for autonomous on-chain agents.
          </motion.p>

          {/* ── Role badge ───────────────────────────────────────────── */}
          <motion.div
            className="flex flex-wrap gap-3 pt-2"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeEnter, delay: 0.25 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            {[
              "Full-Stack Developer",
              "Dec 2025 – Mar 2026",
              "La Rose Noire Philippines",
            ].map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono tracking-[0.08em] px-3 py-1.5 rounded-full border"
                style={{
                  color: "var(--muted-foreground)",
                  borderColor: "var(--border)",
                  background: "var(--muted)",
                }}
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
