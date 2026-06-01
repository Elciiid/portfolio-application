"use client";

import { motion } from "framer-motion";

const easeEnter = [0.22, 1, 0.36, 1] as const;

const proofHighlights = [
  { value: "8 systems", label: "shipped for daily internal use" },
  { value: "1,100+ employees", label: "production environment exposure" },
  { value: "24-node sync", label: "factory audio playback coordination" },
  { value: "Multi-role workflows", label: "approvals, routing, audit trails" },
];

const aboutTags = [
  "La Rose Noire Philippines",
  "Full-stack delivery",
  "AI-assisted automation",
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">

        {/* Left: sticky anchor column */}
        <div className="md:col-span-4">
          <div className="md:sticky md:top-28 flex gap-5">

            {/* Vertical rule draws down on entry */}
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

        {/* Right: identity statement */}
        <div className="md:col-span-8 space-y-7">
          <motion.p
            className="text-[22px] md:text-[26px] font-semibold leading-[1.25] tracking-[-0.03em]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeEnter }}
            viewport={{ once: true, margin: "-80px" }}
          >
            Full-stack developer building production tools for real operational
            workflows.
          </motion.p>

          <motion.p
            className="text-[15px] md:text-[16px] leading-[1.7] max-w-2xl"
            style={{ color: "var(--muted-foreground)" }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: easeEnter, delay: 0.1 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            During my internship at{" "}
            <span className="text-foreground font-medium">La Rose Noire Philippines</span>,
            I owned internal systems end to end: database structure, backend
            logic, UI, deployment, and workflow handoff. The work centered on
            practical operations: audio synchronization, ticket triage, approvals,
            scheduling, and auditability.
          </motion.p>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: easeEnter, delay: 0.16 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            {proofHighlights.map((item) => (
              <div key={item.value} className="flex gap-3">
                <span
                  className="mt-2 h-1.5 w-1.5 rounded-full shrink-0"
                  style={{ background: "var(--foreground)", opacity: 0.55 }}
                  aria-hidden="true"
                />
                <div>
                  <p className="text-[14px] font-medium leading-snug">{item.value}</p>
                  <p
                    className="mt-0.5 text-[12px] leading-relaxed"
                    style={{ color: "var(--muted-foreground)", opacity: 0.72 }}
                  >
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.p
            className="text-[14px] md:text-[15px] leading-[1.65] max-w-xl"
            style={{ color: "var(--muted-foreground)" }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: easeEnter, delay: 0.22 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            My current direction is AI-assisted automation for process-heavy
            teams: turning events, rules, and operational context into clearer
            decisions without overstating the AI.
          </motion.p>

          {/* Role tags */}
          <motion.div
            className="flex flex-wrap gap-2.5 pt-1"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeEnter, delay: 0.28 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            {aboutTags.map((tag) => (
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
