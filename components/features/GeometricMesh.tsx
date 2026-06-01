"use client";

import { useEffect, useRef } from "react";

// Reads --foreground from :root — adapts to light/dark mode toggle
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

export default function GeometricMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    // Icosahedron-like vertices projected in 2D
    const PHI = (1 + Math.sqrt(5)) / 2;
    const baseVertices3D = [
      [-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0],
      [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI],
      [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1],
    ];

    const edges = [
      [0,1],[0,5],[0,7],[0,10],[0,11],
      [1,5],[1,7],[1,8],[1,9],
      [2,3],[2,4],[2,6],[2,10],[2,11],
      [3,4],[3,6],[3,8],[3,9],
      [4,5],[4,9],[4,11],
      [5,9],[5,11],
      [6,7],[6,8],[6,10],
      [7,8],[7,10],
      [8,9],[10,11],
    ];

    const project = (x: number, y: number, z: number, rotX: number, rotY: number) => {
      // Rotate Y
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const x1 = x * cosY - z * sinY;
      const z1 = x * sinY + z * cosY;
      // Rotate X
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const y2 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;
      // Perspective projection
      const fov = 6;
      const scale = fov / (fov + z2);
      return { sx: x1 * scale, sy: y2 * scale, z: z2 };
    };

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const rotY = time * 0.25;
      const rotX = time * 0.15;
      const radius = Math.min(w, h) * 0.28;
      const cx = w / 2;
      const cy = h / 2;

      // Project vertices
      const projected = baseVertices3D.map(([x, y, z]) => {
        const norm = Math.sqrt(x*x + y*y + z*z);
        return project(x/norm, y/norm, z/norm, rotX, rotY);
      });

      // Theme-aware color (refreshed each frame to handle theme toggle)
      const COLOR = getForegroundRGB();

      // Draw edges
      edges.forEach(([a, b]) => {
        const pA = projected[a];
        const pB = projected[b];
        // Fade back edges
        const depthFactor = ((pA.z + pB.z) / 2 + 1) / 2;
        const alpha = 0.04 + depthFactor * 0.1;
        ctx.beginPath();
        ctx.moveTo(cx + pA.sx * radius, cy - pA.sy * radius);
        ctx.lineTo(cx + pB.sx * radius, cy - pB.sy * radius);
        ctx.strokeStyle = `rgba(${COLOR}, ${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      // Draw vertices
      projected.forEach((p) => {
        const depthFactor = (p.z + 1) / 2;
        const alpha = 0.06 + depthFactor * 0.12;
        ctx.beginPath();
        ctx.arc(cx + p.sx * radius, cy - p.sy * radius, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${COLOR}, ${alpha})`;
        ctx.fill();
      });

      time += 0.004;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 1 }}
    />
  );
}
