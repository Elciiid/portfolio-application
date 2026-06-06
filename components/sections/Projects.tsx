"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ExternalLink, Music, ClipboardCheck, Building2,
  Ticket, Globe, BarChart3, Dices, Check, Play, X, MessagesSquare,
  Bot, ShieldCheck, Languages, FileText,
  LucideProps,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { internshipProjects, personalProjects } from "@/lib/projects";
import { Project } from "@/types";

// ─── Icon map ────────────────────────────────────────────────────────────────
type IconComponent = React.FC<LucideProps>;
const PROJECT_ICONS: Record<string, IconComponent> = {
  "mp3-streamer":          Music,
  "return-to-work-portal": ClipboardCheck,
  "facilities-portal":     Building2,
  "iticket-hub":           Ticket,
  "centralpoint-portal":   Globe,
  "centralpoint-core":     MessagesSquare,
  "disposal-logs":         BarChart3,
  "raffle-system":         Dices,
  "ai-web3-automation-assistant": Bot,
  "facebook-phishing-detector":   ShieldCheck,
  "sulyap-kapampangan":           Languages,
};

// ─── Tech stack ───────────────────────────────────────────────────────────────
const techStack: { label: string; items: string[] }[] = [
  { label: "Backend",  items: ["PHP 8.x", "SQL Server", "MSSQL", "JSON / REST"] },
  { label: "Frontend", items: ["Next.js", "TypeScript", "Tailwind CSS", "Vanilla JS"] },
  { label: "Systems",  items: ["Long-poll", "Three.js", "Automation Rules", "RBAC"] },
];

const easeEnter = [0.22, 1, 0.36, 1] as const;

function getProjectSignal(project: Project) {
  if (project.source === "internship" && project.featured) return "Production workflow";
  if (project.source === "internship") return "Internal operations";
  if (project.category === "web3") return "Automation prototype";
  if (project.category === "ai") return "Applied AI project";
  return project.docsHref ? "Technical breakdown available" : "Portfolio project";
}

async function safePlayVideo(video: HTMLVideoElement) {
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.autoplay = true;
  video.setAttribute("muted", "");
  video.setAttribute("autoplay", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");

  if (!video.paused && !video.ended) return true;

  try {
    await video.play();
    return true;
  } catch {
    return false;
  }
}

// ─── Video Modal ─────────────────────────────────────────────────────────────
function VideoModal({ path, title, onClose }: { path: string; title: string; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

        {/* Modal */}
        <motion.div
          className="relative z-10 w-full max-w-3xl rounded-xl overflow-hidden"
          style={{ border: "1px solid rgba(255,255,255,0.1)" }}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.25, ease: easeEnter }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Chrome bar */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ background: "#161616", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
          >
            <span className="text-[12px] font-medium text-white/60">{title} - Demo</span>
            <button
              onClick={onClose}
              className="text-white/40 hover:text-white/80 transition-colors"
              aria-label="Close demo video"
            >
              <X size={15} />
            </button>
          </div>
          {/* Video */}
          <video
            src={`/videos/${path}`}
            autoPlay
            loop
            muted
            playsInline
            controls
            className="w-full"
            style={{ background: "#0a0a0a", display: "block" }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectActions({ project, onPlayVideo }: { project: Project; onPlayVideo: () => void }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {project.videoPath && (
        <motion.button
          onClick={onPlayVideo}
          aria-label={`Watch full demo for ${project.title}`}
          className="inline-flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-full backdrop-blur-md"
          style={{
            background: "rgba(255,255,255,0.085)",
            border: "1px solid rgba(255,255,255,0.13)",
            color: "rgba(255,255,255,0.78)",
          }}
          whileHover={{ background: "rgba(255,255,255,0.13)" }}
          whileTap={{ scale: 0.97 }}
        >
          <Play size={10} fill="currentColor" /> Watch Demo
        </motion.button>
      )}
      {project.liveUrl && (
        <motion.a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open portfolio sandbox for ${project.title}`}
          className="inline-flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-full backdrop-blur-md"
          style={{
            background: `${project.accentColor}1c`,
            border: `1px solid ${project.accentColor}36`,
            color: project.accentColor,
          }}
          whileHover={{ background: `${project.accentColor}26` }}
          whileTap={{ scale: 0.97 }}
        >
          Open Sandbox <ExternalLink size={11} />
        </motion.a>
      )}
      {project.docsHref && (
        <motion.a
          href={project.docsHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Read technical breakdown for ${project.title}`}
          className="inline-flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-full backdrop-blur-md"
          style={{
            background: "rgba(0,0,0,0.32)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.66)",
          }}
          whileHover={{ background: "rgba(255,255,255,0.07)" }}
          whileTap={{ scale: 0.97 }}
        >
          <FileText size={11} /> Technical Breakdown
        </motion.a>
      )}
    </div>
  );
}

function ProjectFallback({ project, onPlayVideo }: { project: Project; onPlayVideo: () => void }) {
  const Icon = PROJECT_ICONS[project.id];

  if (project.isComingSoon) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={project.id}
          className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-8 overflow-hidden"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.32, ease: easeEnter }}
        >
          {/* Ambient glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ background: `radial-gradient(ellipse at 50% 105%, ${project.accentColor}33 0%, transparent 65%)` }}
          />

          {/* Blurred content */}
          <div className="relative z-10 w-full flex flex-col items-center gap-5" style={{ filter: "blur(6px)", userSelect: "none" }}>
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl"
              style={{ background: `${project.accentColor}22`, border: `1px solid ${project.accentColor}44` }}
            >
              {project.icon}
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-white text-[16px] font-semibold">{project.title}</h3>
              <p className="text-white/40 text-[13px] leading-relaxed max-w-[320px]">{project.description}</p>
            </div>
            <div className="flex gap-3 flex-wrap justify-center">
              {project.tech.slice(0, 3).map((t) => (
                <span key={t} className="text-[11px] font-mono text-white/30 px-3 py-1 rounded-full border border-white/10">{t}</span>
              ))}
            </div>
          </div>

          {/* Under construction badge */}
          <div className="absolute z-20 flex flex-col items-center gap-3">
            <div
              className="px-4 py-2 rounded-full text-[12px] font-medium tracking-wide border"
              style={{ background: `${project.accentColor}18`, borderColor: `${project.accentColor}44`, color: project.accentColor }}
            >
              Under Construction
            </div>
            <p className="text-[11px] text-white/30 font-mono">Coming soon</p>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.id}
        className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-8 overflow-hidden"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.32, ease: easeEnter }}
      >
        {/* Ambient glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: [0.35, 0.65, 0.35] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ background: `radial-gradient(ellipse at 50% 105%, ${project.accentColor}40 0%, transparent 65%)` }}
        />

        {/* Icon */}
        <div className="relative z-10">
          <motion.div
            className="absolute rounded-2xl"
            animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.9, 1.15, 0.9] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{ inset: "-4px", background: project.accentColor, filter: "blur(14px)" }}
          />
          <div
            className="relative w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${project.accentColor}33 0%, ${project.accentColor}11 100%)`,
              border: `1px solid ${project.accentColor}55`,
              boxShadow: `0 8px 32px ${project.accentColor}33, inset 0 1px 0 ${project.accentColor}44`,
            }}
          >
            {Icon && <Icon size={26} style={{ color: project.accentColor }} />}
          </div>
        </div>

        {/* Title & description */}
        <div className="text-center space-y-2 z-10">
          <h3 className="text-white text-[16px] font-semibold">{project.title}</h3>
          <p className="text-white/40 text-[13px] leading-relaxed max-w-[320px]">{project.description}</p>
        </div>

        {/* Metrics */}
        {project.metrics && (
          <div className="flex gap-6 z-10">
            {project.metrics.map((m, i) => (
              <motion.div
                key={m.label}
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08 + i * 0.07 }}
              >
                <div className="text-[13px] font-semibold text-white/85">{m.value}</div>
                <div className="text-[10px] text-white/30 mt-0.5 tracking-wide">{m.label}</div>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 z-10">
          {project.videoPath && (
            <motion.button
              onClick={onPlayVideo}
              className="inline-flex items-center gap-1.5 text-[12px] font-medium px-4 py-2 rounded-full"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)" }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              whileHover={{ scale: 1.05, background: "rgba(255,255,255,0.13)" }}
              whileTap={{ scale: 0.96 }}
            >
              <Play size={10} fill="currentColor" /> Watch Demo
            </motion.button>
          )}
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[12px] font-medium px-4 py-2 rounded-full"
              style={{
                background: `${project.accentColor}22`,
                border: `1px solid ${project.accentColor}44`,
                color: project.accentColor,
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.32 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              Open Sandbox <ExternalLink size={11} />
            </motion.a>
          )}
          {project.docsHref && (
            <motion.a
              href={project.docsHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Read technical breakdown for ${project.title}`}
              className="inline-flex items-center gap-1.5 text-[12px] font-medium px-4 py-2 rounded-full"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.62)",
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.38 }}
              whileHover={{ scale: 1.05, background: "rgba(255,255,255,0.08)" }}
              whileTap={{ scale: 0.96 }}
            >
              <FileText size={11} /> Technical Breakdown
            </motion.a>
          )}
        </div>

        {project.docsHref && (
          <motion.span
            className="text-[10px] font-mono tracking-wider uppercase z-10"
            style={{ opacity: 0.32, color: "rgba(255,255,255,0.6)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.32 }}
            transition={{ delay: 0.62 }}
          >
            Architecture, workflow, and engineering decisions
          </motion.span>
        )}

        {/* Demo credentials */}
        {project.liveUrl && (
          <motion.span
            className="text-[10px] font-mono tracking-wider uppercase z-10"
            style={{ opacity: 0.35, color: "rgba(255,255,255,0.6)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            transition={{ delay: 0.6 }}
          >
            Portfolio sandbox only: admin / password
          </motion.span>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

function LiveOperationsWindow({ project, onPlayVideo }: { project: Project; onPlayVideo: () => void }) {
  const previewVideoRef = useRef<HTMLVideoElement | null>(null);
  const previewFrameRef = useRef<HTMLDivElement>(null);
  const [readyVideoPath, setReadyVideoPath] = useState<string | null>(null);

  const setPreviewVideoRef = useCallback((video: HTMLVideoElement | null) => {
    previewVideoRef.current = video;

    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.setAttribute("muted", "");
    video.setAttribute("autoplay", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
  }, []);

  const tryPlayPreview = useCallback(() => {
    const video = previewVideoRef.current;
    if (!video || !project.videoPath) return;

    void safePlayVideo(video).then((started) => {
      if (started) {
        setReadyVideoPath(project.videoPath ?? null);
      }
    });
  }, [project.videoPath]);

  useEffect(() => {
    setReadyVideoPath(null);

    const video = previewVideoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    const firstRetry = window.setTimeout(() => tryPlayPreview(), 80);
    const secondRetry = window.setTimeout(() => tryPlayPreview(), 500);
    const fallbackReady = window.setTimeout(() => {
      setReadyVideoPath(project.videoPath ?? null);
    }, 2600);

    return () => {
      window.clearTimeout(firstRetry);
      window.clearTimeout(secondRetry);
      window.clearTimeout(fallbackReady);
    };
  }, [project.videoPath, tryPlayPreview]);

  useEffect(() => {
    const frame = previewFrameRef.current;
    if (!frame || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tryPlayPreview();
        }
      },
      { threshold: 0.28 }
    );

    observer.observe(frame);
    return () => observer.disconnect();
  }, [project.videoPath, tryPlayPreview]);

  const handleVideoReady = useCallback(() => {
    setReadyVideoPath(project.videoPath ?? null);
    tryPlayPreview();
  }, [project.videoPath, tryPlayPreview]);

  if (!project.videoPath) {
    return <ProjectFallback project={project} onPlayVideo={onPlayVideo} />;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        ref={previewFrameRef}
        key={project.id}
        className="absolute inset-0 overflow-hidden bg-[#050505]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.38, ease: easeEnter }}
        onPointerDown={tryPlayPreview}
        onMouseEnter={tryPlayPreview}
      >
        <video
          ref={setPreviewVideoRef}
          key={project.videoPath}
          src={`/videos/${project.videoPath}`}
          title={`${project.title} live operations preview`}
          aria-label={`${project.title} autoplay application preview`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedMetadata={handleVideoReady}
          onLoadedData={handleVideoReady}
          onCanPlay={handleVideoReady}
          onCanPlayThrough={handleVideoReady}
          onPlaying={() => setReadyVideoPath(project.videoPath ?? null)}
          onClick={tryPlayPreview}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
          style={{
            background: "#050505",
            opacity: readyVideoPath === project.videoPath ? 0.92 : 0.72,
            objectPosition: "center center",
          }}
        />

        <div
          className="absolute inset-[1px] pointer-events-none"
          style={{
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.035), inset 0 24px 80px rgba(0,0,0,0.18)",
          }}
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: [
              "linear-gradient(180deg, rgba(0,0,0,0.34) 0%, rgba(0,0,0,0.04) 40%, rgba(0,0,0,0.82) 100%)",
              "linear-gradient(90deg, rgba(0,0,0,0.66) 0%, rgba(0,0,0,0.2) 42%, rgba(0,0,0,0.08) 100%)",
              "radial-gradient(circle at 78% 18%, rgba(255,255,255,0.08), transparent 28%)",
            ].join(", "),
          }}
        />

        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        <div
          className="absolute left-0 right-0 top-0 h-px opacity-60"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${project.accentColor} 44%, transparent 100%)`,
          }}
        />

        <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-3 sm:left-5 sm:right-5 sm:top-5">
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 backdrop-blur-md"
            style={{
              background: "rgba(0,0,0,0.34)",
              border: "1px solid rgba(255,255,255,0.085)",
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full animate-pulse"
              style={{
                background: project.accentColor,
                boxShadow: `0 0 7px ${project.accentColor}`,
              }}
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/58">
              Live ops
            </span>
          </div>

          <span
            className="hidden sm:inline-flex rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] backdrop-blur-md"
            style={{
              color: "rgba(255,255,255,0.5)",
              background: "rgba(0,0,0,0.3)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {getProjectSignal(project)}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
          <motion.div
            className="max-w-2xl space-y-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.36, ease: easeEnter, delay: 0.08 }}
          >
            <div className="space-y-1.5">
              <h3 className="text-[18px] sm:text-[21px] font-semibold tracking-[-0.03em] text-white">
                {project.title}
              </h3>
              <p className="max-w-[620px] text-[12px] sm:text-[13px] leading-relaxed text-white/58">
                {project.description}
              </p>
            </div>

            {project.metrics && (
              <div className="flex flex-wrap gap-2">
                {project.metrics.slice(0, 3).map((m) => (
                  <div
                    key={m.label}
                    className="rounded-md px-2.5 py-1.5 backdrop-blur-md"
                    style={{
                      background: "rgba(0,0,0,0.28)",
                      border: "1px solid rgba(255,255,255,0.075)",
                    }}
                  >
                    <div className="text-[11px] font-semibold text-white/78">{m.value}</div>
                    <div className="mt-0.5 text-[8px] font-mono uppercase tracking-[0.12em] text-white/32">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <ProjectActions project={project} onPlayVideo={onPlayVideo} />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Stack Table ─────────────────────────────────────────────────────────────
function StackTable() {
  return (
    <motion.div
      className="grid grid-cols-3 gap-px"
      style={{ background: "var(--border)", border: "1px solid var(--border)", borderRadius: "8px", overflow: "hidden" }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: easeEnter, delay: 0.1 }}
    >
      {techStack.map((col, colIdx) => (
        <div key={col.label} className="flex flex-col py-2" style={{ background: "var(--background)" }}>
          {col.items.map((item, i) => (
            <motion.div
              key={item}
              className="flex items-center gap-2.5 px-4 py-2"
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, ease: easeEnter, delay: 0.15 + colIdx * 0.06 + i * 0.04 }}
            >
              <Check size={11} style={{ color: "var(--accent-emerald)", opacity: 0.8, flexShrink: 0 }} />
              <span className="text-[13px] font-mono" style={{ color: "var(--muted-foreground)" }}>{item}</span>
            </motion.div>
          ))}
        </div>
      ))}
    </motion.div>
  );
}

// ─── Tab Button ───────────────────────────────────────────────────────────────
function TabButton({ label, count, active, onClick }: { label: string; count: number; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="relative flex items-center gap-2 px-4 py-2 text-[13px] font-medium transition-colors duration-200"
      style={{ color: active ? "var(--foreground)" : "var(--muted-foreground)" }}
    >
      {label}
      <span
        className="text-[10px] font-mono px-1.5 py-0.5 rounded-full"
        style={{
          background: active ? "var(--foreground)" : "var(--muted)",
          color: active ? "var(--background)" : "var(--muted-foreground)",
        }}
      >
        {count}
      </span>
      {active && (
        <motion.span
          layoutId="activeTab"
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "var(--foreground)" }}
          transition={{ duration: 0.25, ease: easeEnter }}
        />
      )}
    </button>
  );
}

// ─── Main Projects Section ────────────────────────────────────────────────────
export default function Projects() {
  const [tab, setTab] = useState<"internship" | "personal">("internship");
  const projects = tab === "internship" ? internshipProjects : personalProjects;
  const [active, setActive] = useState<Project>(internshipProjects[0]);
  const [videoProject, setVideoProject] = useState<Project | null>(null);
  const ActiveIcon = PROJECT_ICONS[active.id];

  const handleTabChange = (t: "internship" | "personal") => {
    setTab(t);
    const list = t === "internship" ? internshipProjects : personalProjects;
    setActive(list[0]);
  };

  return (
    <section id="projects" className="border-t border-border">
      <div
        className="w-full py-24"
        style={{ background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.25) 30%, rgba(0,0,0,0.25) 70%, transparent 100%)" }}
      >
        <div className="max-w-5xl mx-auto px-6">

          {/* Section header */}
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeEnter }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <h2
              className="text-[11px] font-medium tracking-[0.12em] uppercase mb-4"
              style={{ color: "var(--muted-foreground)" }}
            >
              Selected Work
            </h2>
            <p className="text-[22px] md:text-[28px] font-semibold leading-tight max-w-xl tracking-tight">
              Production systems and applied AI automation work.
            </p>
          </motion.div>

          {/* Tech stack table */}
          <div className="mb-8">
            <p className="text-[11px] font-medium tracking-[0.12em] uppercase mb-3" style={{ color: "var(--muted-foreground)" }}>
              Stack I&apos;ve shipped in
            </p>
            <StackTable />
          </div>

          {/* ── Tab switcher ───────────────────────────────────────────── */}
          <motion.div
            className="flex items-center gap-1 mb-6 border-b"
            style={{ borderColor: "var(--border)" }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeEnter, delay: 0.05 }}
            viewport={{ once: true }}
          >
            <TabButton
              label="La Rose Noire"
              count={internshipProjects.length}
              active={tab === "internship"}
              onClick={() => handleTabChange("internship")}
            />
            <TabButton
              label="Personal"
              count={personalProjects.length}
              active={tab === "personal"}
              onClick={() => handleTabChange("personal")}
            />
          </motion.div>

          {/* Main showcase widget */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeEnter, delay: 0.1 }}
            viewport={{ once: true, margin: "-60px" }}
          >
            <div
              className="relative rounded-xl overflow-hidden"
              style={{
                background: "linear-gradient(160deg, #161616 0%, #0d0d0d 100%)",
                boxShadow: [
                  "0 0 0 1px rgba(255,255,255,0.07)",
                  "0 1px 0 0 rgba(255,255,255,0.12)",
                  "0 24px 60px -12px rgba(0,0,0,0.8)",
                  "inset 0 1px 0 rgba(255,255,255,0.06)",
                ].join(", "),
              }}
            >
              {/* Noise texture */}
              <div
                className="absolute inset-0 pointer-events-none z-0 opacity-[0.025]"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
              />

              {/* Window chrome */}
              <div className="relative z-10 flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                <div className="flex items-center gap-1.5 shrink-0">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F57]" style={{ boxShadow: "0 0 4px #FF5F5788" }} />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" style={{ boxShadow: "0 0 4px #FFBD2E88" }} />
                  <div className="w-3 h-3 rounded-full bg-[#28CA41]" style={{ boxShadow: "0 0 4px #28CA4188" }} />
                </div>
                <div
                  className="flex-1 h-[26px] rounded-md flex items-center px-3 gap-2 mx-2"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <motion.div
                    className="w-2 h-2 rounded-full shrink-0"
                    animate={{ backgroundColor: active.accentColor, boxShadow: `0 0 6px ${active.accentColor}` }}
                    transition={{ duration: 0.4 }}
                  />
                  <span className="text-[11px] text-white/30 font-mono truncate tracking-tight">
                    {active.isComingSoon ? `${active.id}.dev - in progress` : (active.liveUrl?.replace("https://", "") ?? `${active.id}.internal`)}
                  </span>
                </div>
                {active.liveUrl && !active.isComingSoon && (
                  <a
                    href={active.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[11px] text-white/25 hover:text-white/60 transition-colors shrink-0"
                  >
                    <ExternalLink size={11} />
                    <span className="hidden sm:inline">Open</span>
                  </a>
                )}
              </div>

              {/* Body: sidebar + card */}
              <div className="relative z-10 flex h-[480px] md:h-[540px]">

                {/* Sidebar */}
                <aside
                  className="hidden md:flex w-48 shrink-0 flex-col"
                  style={{
                    borderRight: "1px solid rgba(255,255,255,0.055)",
                    background: "linear-gradient(180deg, rgba(255,255,255,0.018), rgba(0,0,0,0.18))",
                  }}
                >
                  <div className="px-4 py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.045)" }}>
                    <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/20">
                      {tab === "internship" ? "La Rose Noire" : "Personal"}
                    </span>
                  </div>
                  <nav className="flex-1 overflow-y-auto py-1.5">
                    {projects.map((p) => {
                      const PIcon = PROJECT_ICONS[p.id];
                      const isActive = p.id === active.id;
                      return (
                        <motion.button
                          key={p.id}
                          onClick={() => setActive(p)}
                          className="w-full text-left flex items-center gap-2.5 px-3 py-2.5 relative"
                          animate={{
                            background: isActive ? "rgba(255,255,255,0.045)" : "rgba(0,0,0,0)",
                            color: isActive ? "rgba(255,255,255,0.86)" : "rgba(255,255,255,0.34)",
                          }}
                          whileHover={{
                            background: isActive ? "rgba(255,255,255,0.055)" : "rgba(255,255,255,0.025)",
                            color: isActive ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.6)",
                          }}
                          transition={{ duration: 0.15 }}
                        >
                          {isActive && (
                            <motion.span
                              layoutId="activeBorder"
                              className="absolute left-0 top-1.5 bottom-1.5 w-px rounded-full"
                              style={{ backgroundColor: p.accentColor }}
                              transition={{ duration: 0.3, ease: easeEnter }}
                            />
                          )}
                          {PIcon ? (
                            <PIcon size={14} className="shrink-0" style={{ color: isActive ? active.accentColor : "rgba(255,255,255,0.3)" }} />
                          ) : (
                            <span className="text-[14px] shrink-0">{p.icon}</span>
                          )}
                          <span className="text-[12px] font-medium leading-tight">{p.title}</span>
                          <span
                            className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{
                              background: isActive ? p.accentColor : p.videoPath ? "rgba(255,255,255,0.2)" : "transparent",
                              boxShadow: isActive ? `0 0 5px ${p.accentColor}` : "none",
                            }}
                            aria-hidden="true"
                          />
                        </motion.button>
                      );
                    })}
                  </nav>
                </aside>

                {/* Live operations viewport */}
                <div className="flex-1 min-w-0 relative bg-[#0a0a0a]">
                  <LiveOperationsWindow
                    project={active}
                    onPlayVideo={() => active.videoPath && setVideoProject(active)}
                  />
                </div>
              </div>

              {/* Bottom status bar */}
              <div
                className="relative z-10 flex items-center justify-between gap-4 px-4 py-3"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.3)" }}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <motion.span
                    className="w-2 h-2 rounded-full shrink-0"
                    animate={{ backgroundColor: active.accentColor }}
                    transition={{ duration: 0.4 }}
                  />
                  <span className="text-[12px] text-white/35 truncate leading-tight">
                    {active.isComingSoon ? "In active development" : active.description}
                  </span>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  {ActiveIcon && <ActiveIcon size={12} className="text-white/20" />}
                  <span className="hidden sm:block text-[10px] font-mono tracking-widest uppercase text-white/20">
                    {active.category}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mobile project scroller */}
          <div className="md:hidden mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {projects.map((p) => {
              const MIcon = PROJECT_ICONS[p.id];
              const isActive = p.id === active.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setActive(p)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap text-[12px] font-medium shrink-0 transition-all duration-150 border"
                  style={{
                    background: isActive ? `${p.accentColor}22` : "transparent",
                    borderColor: isActive ? `${p.accentColor}55` : "rgba(128,128,128,0.2)",
                    color: isActive ? p.accentColor : "rgba(128,128,128,0.6)",
                  }}
                >
                  {MIcon ? <MIcon size={12} /> : <span>{p.icon}</span>}
                  {p.title}
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* Video modal */}
      {videoProject?.videoPath && (
        <VideoModal
          path={videoProject.videoPath}
          title={videoProject.title}
          onClose={() => setVideoProject(null)}
        />
      )}
    </section>
  );
}
