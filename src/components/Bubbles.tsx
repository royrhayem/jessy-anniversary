"use client";

import { useEffect, useRef } from "react";

/**
 * Soap bubbles, not confetti. Her craft, not a template.
 * ~60 lines of canvas rather than 40 KB of particle library.
 */
export default function BubbleBurst({ count = 46 }: { count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    const bubbles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * canvas.height * 0.6,
      r: (6 + Math.random() * 22) * dpr,
      vy: (0.5 + Math.random() * 1.6) * dpr,
      drift: (Math.random() - 0.5) * 0.9 * dpr,
      phase: Math.random() * Math.PI * 2,
      hue: 170 + Math.random() * 40,
    }));

    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const b of bubbles) {
        b.y -= b.vy;
        b.phase += 0.03;
        b.x += b.drift + Math.sin(b.phase) * 0.6 * dpr;

        // recycle rather than allocate
        if (b.y + b.r < 0) {
          b.y = canvas.height + b.r;
          b.x = Math.random() * canvas.width;
        }

        const g = ctx.createRadialGradient(
          b.x - b.r * 0.35, b.y - b.r * 0.35, b.r * 0.1,
          b.x, b.y, b.r,
        );
        g.addColorStop(0, `hsla(${b.hue}, 70%, 96%, 0.85)`);
        g.addColorStop(0.7, `hsla(${b.hue}, 55%, 80%, 0.20)`);
        g.addColorStop(1, `hsla(${b.hue}, 55%, 70%, 0.06)`);

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(b.x - b.r * 0.3, b.y - b.r * 0.35, b.r * 0.18, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.7)";
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-40 w-full h-full"
    />
  );
}
