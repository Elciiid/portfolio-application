"use client";

import { useEffect, useRef, useCallback } from "react";

// ─── Configuration ────────────────────────────────────────────────────────────
// Tweak these values to adjust density, speed, and feel.
const CONFIG = {
  // Number of nodes in the graph. Keep between 18–32 for clarity.
  NODE_COUNT: 24,

  // How far apart (in px) two nodes can be before they stop being connected.
  CONNECTION_RADIUS: 180,

  // Base speed multiplier. Keep between 0.2 – 0.8.
  SPEED: 0.35,

  // Mouse parallax intensity. 0 = none, 1 = strong.
  PARALLAX_STRENGTH: 0.018,

  // Node visual sizes (px)
  NODE_MIN_RADIUS: 1.5,
  NODE_MAX_RADIUS: 3.5,

  NODE_OPACITY_MIN: 0.2,
  NODE_OPACITY_MAX: 0.75,
  EDGE_OPACITY_MAX: 0.12,

  // Pulse: a slow breathing opacity animation per node
  PULSE_SPEED: 0.0008,
};

// ─── Types ────────────────────────────────────────────────────────────────────
interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
  opacity: number;
}

// Reads --foreground from :root to adapt to light / dark mode.
// Returns an RGB string like "17, 17, 17" (light) or "237, 237, 237" (dark).
function getForegroundRGB(): string {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--foreground")
    .trim();
  if (raw.startsWith("#")) {
    const hex = raw.slice(1);
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `${r}, ${g}, ${b}`;
  }
  return "200, 200, 200";
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function dist(a: Node, b: Node): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function SystemGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number>(0);
  const timeRef = useRef(0);
  // Cached theme color — refreshed on each frame to react to theme toggles
  const colorRef = useRef("200, 200, 200");

  // ── Initialize nodes in a structured, non-random layout ─────────────────
  const initNodes = useCallback((w: number, h: number) => {
    const nodes: Node[] = [];

    // We distribute nodes across a grid with slight jitter — this creates
    // "engineered" structure rather than chaotic randomness.
    const cols = Math.ceil(Math.sqrt(CONFIG.NODE_COUNT * (w / h)));
    const rows = Math.ceil(CONFIG.NODE_COUNT / cols);
    const cellW = w / cols;
    const cellH = h / rows;

    let count = 0;
    for (let r = 0; r < rows && count < CONFIG.NODE_COUNT; r++) {
      for (let c = 0; c < cols && count < CONFIG.NODE_COUNT; c++) {
        // Jitter within cell — controlled, not random scatter
        const jitterX = (Math.random() - 0.5) * cellW * 0.55;
        const jitterY = (Math.random() - 0.5) * cellH * 0.55;

        const angle = Math.random() * Math.PI * 2;
        const speed = CONFIG.SPEED * (0.3 + Math.random() * 0.7);

        nodes.push({
          x: cellW * (c + 0.5) + jitterX,
          y: cellH * (r + 0.5) + jitterY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: lerp(
            CONFIG.NODE_MIN_RADIUS,
            CONFIG.NODE_MAX_RADIUS,
            Math.random()
          ),
          phase: Math.random() * Math.PI * 2,
          opacity: lerp(CONFIG.NODE_OPACITY_MIN, CONFIG.NODE_OPACITY_MAX, Math.random()),
        });
        count++;
      }
    }
    nodesRef.current = nodes;
  }, []);

  // ── Main render loop ─────────────────────────────────────────────────────
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    timeRef.current += 1;

    // Refresh theme color every frame (cheap string op, handles theme toggle)
    colorRef.current = getForegroundRGB();
    const COLOR = colorRef.current;

    // Smooth mouse tracking
    mouseRef.current.x = lerp(mouseRef.current.x, targetMouseRef.current.x, 0.05);
    mouseRef.current.y = lerp(mouseRef.current.y, targetMouseRef.current.y, 0.05);

    const paralX = (mouseRef.current.x - w / 2) * CONFIG.PARALLAX_STRENGTH;
    const paralY = (mouseRef.current.y - h / 2) * CONFIG.PARALLAX_STRENGTH;

    // Clear
    ctx.clearRect(0, 0, w, h);

    const nodes = nodesRef.current;

    // ── Update node positions ──────────────────────────────────────────────
    for (const node of nodes) {
      node.x += node.vx;
      node.y += node.vy;

      // Soft boundary bounce — no teleport, smooth reflection
      if (node.x < 0 || node.x > w) node.vx *= -1;
      if (node.y < 0 || node.y > h) node.vy *= -1;

      // Clamp to canvas
      node.x = Math.max(0, Math.min(w, node.x));
      node.y = Math.max(0, Math.min(h, node.y));
    }

    // ── Draw edges ────────────────────────────────────────────────────────
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const d = dist(nodes[i], nodes[j]);
        if (d < CONFIG.CONNECTION_RADIUS) {
          const t = 1 - d / CONFIG.CONNECTION_RADIUS;
          const edgeOpacity = t * t * CONFIG.EDGE_OPACITY_MAX;

          ctx.beginPath();
          ctx.moveTo(nodes[i].x + paralX, nodes[i].y + paralY);
          ctx.lineTo(nodes[j].x + paralX, nodes[j].y + paralY);
          ctx.strokeStyle = `rgba(${COLOR}, ${edgeOpacity})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    // ── Draw nodes ────────────────────────────────────────────────────────
    for (const node of nodes) {
      const pulse = Math.sin(timeRef.current * CONFIG.PULSE_SPEED * 1000 + node.phase);
      const nodeOpacity = node.opacity + pulse * 0.12;

      const nx = node.x + paralX;
      const ny = node.y + paralY;

      ctx.save();
      ctx.shadowColor = `rgba(${COLOR}, 0.12)`;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(nx, ny, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${COLOR}, ${Math.max(0, Math.min(1, nodeOpacity))})`;
      ctx.fill();
      ctx.restore();
    }

    animFrameRef.current = requestAnimationFrame(animate);
  }, []);

  // ── Setup ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      // Use devicePixelRatio for crisp rendering on HiDPI screens
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
      initNodes(rect.width, rect.height);
    };

    handleResize();

    const ro = new ResizeObserver(handleResize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseRef.current.x = e.clientX - rect.left;
      targetMouseRef.current.y = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      ro.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [animate, initNodes]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        display: "block",
        background: "transparent",
      }}
    />
  );
}
