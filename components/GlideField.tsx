"use client";

import { useEffect, useRef } from "react";

const GLYPHS = ["R", "s", "%", "+", "-", ".", "·"];

type Glyph = {
  x: number;
  y: number;
  ch: string;
  speed: number;
  size: number;
  alpha: number;
  sway: number;
  phase: number;
};

export default function GlideField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let glyphs: Glyph[] = [];
    let raf = 0;
    let visible = true;
    let w = 0;
    let h = 0;

    const seed = () => {
      const count = Math.max(24, Math.min(72, Math.floor((w * h) / 22000)));
      glyphs = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        ch: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
        speed: 0.12 + Math.random() * 0.35,
        size: 10 + Math.random() * 8,
        alpha: 0.25 + Math.random() * 0.55,
        sway: 0.1 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    let t = 0;
    let last = 0;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      if (now - last < 33) return;
      last = now;
      t += 0.016;
      ctx.clearRect(0, 0, w, h);
      ctx.textBaseline = "middle";
      for (const g of glyphs) {
        g.y -= g.speed;
        if (g.y < -20) {
          g.y = h + 20;
          g.x = Math.random() * w;
        }
        const x = g.x + Math.sin(t * 2 + g.phase) * 6 * g.sway;
        ctx.font = `${g.size}px "JetBrains Mono", ui-monospace, monospace`;
        ctx.fillStyle = `rgba(250, 250, 247, ${g.alpha.toFixed(2)})`;
        ctx.fillText(g.ch, x, g.y);
      }
    };

    resize();
    tick(0);

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0 }
    );
    io.observe(wrap);

    const onMq = (e: MediaQueryListEvent) => {
      if (e.matches) {
        cancelAnimationFrame(raf);
        ctx.clearRect(0, 0, w, h);
      }
    };
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", onMq);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      if (typeof mq.removeEventListener === "function") {
        mq.removeEventListener("change", onMq);
      }
    };
  }, []);

  return (
    <div ref={wrapRef} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="glide-blob-a absolute -left-[15%] -top-[25%] aspect-square w-[75%]" />
        <div className="glide-blob-b absolute -bottom-[30%] -right-[12%] aspect-square w-[70%]" />
      </div>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-[0.08]" />
      <style>{`
        .glide-blob-a {
          background: radial-gradient(closest-side, #1B4332 0%, rgba(27, 67, 50, 0.55) 45%, transparent 72%);
          filter: blur(60px);
          animation: glide-drift-a 24s ease-in-out infinite alternate;
          will-change: transform;
        }
        .glide-blob-b {
          background: radial-gradient(closest-side, rgba(74, 222, 128, 0.8) 0%, rgba(27, 67, 50, 0.4) 48%, transparent 72%);
          filter: blur(70px);
          animation: glide-drift-b 24s ease-in-out infinite alternate;
          will-change: transform;
        }
        @keyframes glide-drift-a {
          from { transform: translate3d(-4%, 2%, 0) scale(1); }
          to { transform: translate3d(7%, -5%, 0) scale(1.1); }
        }
        @keyframes glide-drift-b {
          from { transform: translate3d(5%, -3%, 0) scale(1.08); }
          to { transform: translate3d(-6%, 4%, 0) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .glide-blob-a, .glide-blob-b { animation: none; }
        }
      `}</style>
    </div>
  );
}
