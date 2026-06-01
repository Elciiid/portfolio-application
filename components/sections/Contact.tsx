"use client";

import { useState } from "react";
import { Send, CheckCircle, Clock, MapPin, Briefcase } from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;
const contactEmail = "jonaselcid30@gmail.com";

// ─── Availability card (left column) ─────────────────────────────────────────
function AvailabilityCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease }}
      viewport={{ once: true, margin: "-80px" }}
      className="rounded-lg p-5 space-y-5"
      style={{
        background: "var(--muted)",
        border: "1px solid var(--border)",
      }}
    >
      {/* Status row */}
      <div className="flex items-center gap-2.5">
        <span className="relative flex h-2 w-2 shrink-0">
          <span
            className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
            style={{ animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite" }}
          />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span
          className="text-[13px] font-medium"
          style={{ color: "var(--foreground)" }}
        >
          Available for hire
        </span>
      </div>

      <div
        className="h-px"
        style={{ background: "var(--border)" }}
      />

      {/* Details */}
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <MapPin
            size={13}
            className="mt-0.5 shrink-0"
            style={{ color: "var(--muted-foreground)" }}
          />
          <div>
            <p
              className="text-[12px] font-mono"
              style={{ color: "var(--muted-foreground)", opacity: 0.7 }}
            >
              Location
            </p>
            <p className="text-[13px] font-medium mt-0.5">
              Philippines - Remote OK
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock
            size={13}
            className="mt-0.5 shrink-0"
            style={{ color: "var(--muted-foreground)" }}
          />
          <div>
            <p
              className="text-[12px] font-mono"
              style={{ color: "var(--muted-foreground)", opacity: 0.7 }}
            >
              Timezone
            </p>
            <p className="text-[13px] font-medium mt-0.5">
              PHT (UTC+8)
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Briefcase
            size={13}
            className="mt-0.5 shrink-0"
            style={{ color: "var(--muted-foreground)" }}
          />
          <div>
            <p
              className="text-[12px] font-mono"
              style={{ color: "var(--muted-foreground)", opacity: 0.7 }}
            >
              Preferred engagement
            </p>
            <p className="text-[13px] font-medium mt-0.5">
              Full-time - Systems / AI automation
            </p>
          </div>
        </div>
      </div>

    </motion.div>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────
export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong.");
        setStatus("error");
      } else {
        setStatus("sent");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">

        {/* Left Column — Availability card */}
        <div className="md:col-span-4 space-y-6">
          <motion.h2
            className="text-[11px] font-medium tracking-[0.12em] uppercase"
            style={{ color: "var(--muted-foreground)" }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            viewport={{ once: true, margin: "-80px" }}
          >
            Get in Touch
          </motion.h2>
          <AvailabilityCard />
          <motion.a
            href={`mailto:${contactEmail}`}
            className="inline-flex text-[13px] resend-link"
            style={{ color: "var(--muted-foreground)" }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.08 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            {contactEmail}
          </motion.a>
        </div>

        {/* Right Column */}
        <div className="md:col-span-8">
          <motion.p
            className="text-[15px] leading-relaxed mb-10 max-w-xl"
            style={{ color: "var(--muted-foreground)" }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease, delay: 0.05 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            Open to full-time roles building internal tools, backend workflows,
            and AI-assisted automation. For interviews or project fit, send a
            short note and I&apos;ll reply directly.
          </motion.p>

          <AnimatePresence mode="wait">
            {status !== "sent" ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="space-y-8 max-w-xl"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <div className="space-y-5">
                  <motion.div
                    className="input-line"
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-border py-2.5 text-[14px] placeholder:text-muted-foreground/60 focus:outline-none transition-colors"
                    />
                  </motion.div>

                  <motion.div
                    className="input-line"
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease, delay: 0.17 }}
                    viewport={{ once: true }}
                  >
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Email Address"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-border py-2.5 text-[14px] placeholder:text-muted-foreground/60 focus:outline-none transition-colors"
                    />
                  </motion.div>

                  <motion.div
                    className="input-line"
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease, delay: 0.24 }}
                    viewport={{ once: true }}
                  >
                    <textarea
                      name="message"
                      required
                      rows={4}
                      placeholder="Role, team, or project context"
                      value={form.message}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-border py-2.5 text-[14px] placeholder:text-muted-foreground/60 focus:outline-none transition-colors resize-none"
                    />
                  </motion.div>
                </div>

                <motion.div
                  className="flex flex-col gap-3"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease, delay: 0.32 }}
                  viewport={{ once: true }}
                >
                  {status === "error" && errorMsg && (
                    <p className="text-[13px] text-red-400">{errorMsg}</p>
                  )}
                  <div className="flex justify-end">
                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    className="resend-button resend-button-primary h-10 px-6 gap-2 disabled:opacity-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {(status === "idle" || status === "error") && <><Send size={13} /> Send inquiry</>}
                    {status === "sending" && (
                      <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full border-2 border-t-transparent animate-spin border-current" />
                        Sending...
                      </span>
                    )}
                  </motion.button>
                  </div>
                </motion.div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                className="flex flex-col items-start gap-3 max-w-xl"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22, delay: 0.1 }}
                >
                  <CheckCircle className="w-7 h-7 text-emerald-500" />
                </motion.div>
                <p className="text-[15px] font-medium">Message sent.</p>
                <p className="text-[14px] text-muted-foreground leading-relaxed">
                  I&apos;ll get back to you within 24 hours.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
