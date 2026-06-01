"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ExternalLink } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;
const resumeHref = "/resume/Jonas_David_Resume.pdf";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="resume-backdrop"
            className="fixed inset-0 z-[90]"
            style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            key="resume-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Resume"
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 pointer-events-none"
          >
            <motion.div
              className="relative w-full max-w-3xl pointer-events-auto"
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.3, ease }}
            >
              <div
                className="flex items-center justify-between px-4 py-3 rounded-t-xl border-b"
                style={{
                  background: "var(--background)",
                  borderColor: "var(--border)",
                  border: "1px solid var(--border)",
                  borderBottom: "none",
                }}
              >
                <div className="flex flex-col">
                  <span
                    className="font-mono text-[11px] tracking-[0.12em] uppercase"
                    style={{ color: "var(--muted-foreground)", opacity: 0.6 }}
                  >
                    Resume PDF
                  </span>
                  <span
                    className="font-mono text-[10px] tracking-[0.08em]"
                    style={{ color: "var(--muted-foreground)", opacity: 0.42 }}
                  >
                    Updated 2026
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={resumeHref}
                    download="Jonas_David_Resume.pdf"
                    className="resend-button resend-button-secondary h-8 px-3 gap-1.5 text-[12px]"
                    title="Download resume"
                  >
                    <Download size={12} />
                    Download PDF
                  </a>

                  <a
                    href={resumeHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resend-button resend-button-secondary h-8 px-3 gap-1.5 text-[12px]"
                    title="Open resume in a new tab"
                  >
                    <ExternalLink size={12} />
                    Open
                  </a>

                  <button
                    onClick={onClose}
                    className="w-8 h-8 rounded-md flex items-center justify-center transition-colors hover:bg-muted"
                    aria-label="Close resume"
                  >
                    <X size={14} style={{ color: "var(--muted-foreground)" }} />
                  </button>
                </div>
              </div>

              <div
                className="relative overflow-hidden rounded-b-xl"
                style={{
                  border: "1px solid var(--border)",
                  borderTop: "none",
                  background: "var(--muted)",
                  maxHeight: "80vh",
                  overflowY: "auto",
                }}
              >
                <iframe
                  src={`${resumeHref}#toolbar=0&navpanes=0`}
                  title="Jonas David Resume"
                  className="block w-full min-h-[72vh]"
                  style={{ border: 0, background: "var(--background)" }}
                />
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
