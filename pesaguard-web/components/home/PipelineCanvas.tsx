"use client";

import { useEffect, useRef } from "react";

type Particle = {
  /** 0..1 progress along the whole journey. */
  t: number;
  speed: number;
  /** false for the particles that end up flagged. */
  clean: boolean;
  /** Offset across the path width so parallel particles don't overlap. */
  wobble: number;
};

type NodePoint = { x: number; y: number; label: string };

/**
 * Living pipeline visual for the hero.
 *
 * Particles travel sources -> validation -> reconciliation -> risk engine and
 * split into matched / flagged outcomes. Drawn on canvas so the page never
 * mounts dozens of animated DOM nodes. Pauses when offscreen, when the tab is
 * hidden, and renders a single static frame under prefers-reduced-motion.
 */
export function PipelineCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let running = true;
    let visible = true;
    let width = 0;
    let height = 0;

    const particles: Particle[] = [];

    const seed = () => {
      particles.length = 0;
      for (let i = 0; i < 26; i += 1) {
        particles.push({
          t: Math.random(),
          speed: 0.0016 + Math.random() * 0.0014,
          clean: Math.random() > 0.22,
          wobble: (Math.random() - 0.5) * 14,
        });
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Layout is computed from the canvas box so the drawing scales cleanly.
    const layout = (): NodePoint[] => [
      { x: width * 0.16, y: height * 0.14, label: "M-PESA" },
      { x: width * 0.84, y: height * 0.14, label: "BANK · API" },
      { x: width * 0.5, y: height * 0.34, label: "VALIDATE" },
      { x: width * 0.5, y: height * 0.52, label: "RECONCILE" },
      { x: width * 0.5, y: height * 0.7, label: "RISK ENGINE" },
      { x: width * 0.24, y: height * 0.88, label: "MATCHED" },
      { x: width * 0.76, y: height * 0.88, label: "FLAGGED" },
    ];

    let nodes = layout();

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      const [mpesa, bank, validate, reconcile, risk, matched, flagged] = nodes;

      const line = (x1: number, y1: number, x2: number, y2: number) => {
        ctx.strokeStyle = "rgba(18,51,40,0.18)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      };

      line(mpesa.x, mpesa.y + 8, validate.x - 26, validate.y);
      line(bank.x, bank.y + 8, validate.x + 26, validate.y);
      line(validate.x, validate.y + 8, reconcile.x, reconcile.y - 8);
      line(reconcile.x, reconcile.y + 8, risk.x, risk.y - 8);
      line(risk.x - 14, risk.y + 8, matched.x + 18, matched.y - 8);
      line(risk.x + 14, risk.y + 8, flagged.x - 18, flagged.y - 8);

      // Node chips
      ctx.font = "500 10px 'DM Mono', ui-monospace, monospace";
      ctx.textAlign = "center";
      for (const node of nodes) {
        const hot = node.label === "MATCHED" || node.label === "FLAGGED";
        ctx.fillStyle = hot ? "rgba(251,252,247,1)" : "rgba(244,245,239,0.92)";
        const wpx = ctx.measureText(node.label).width + 22;
        ctx.strokeStyle =
          node.label === "MATCHED"
            ? "rgba(110,131,29,0.55)"
            : node.label === "FLAGGED"
              ? "rgba(168,100,28,0.55)"
              : "rgba(18,51,40,0.2)";
        ctx.beginPath();
        ctx.roundRect(node.x - wpx / 2, node.y - 12, wpx, 24, 6);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle =
          node.label === "MATCHED"
            ? "#4d5d12"
            : node.label === "FLAGGED"
              ? "#a8641c"
              : "#5e6a63";
        ctx.fillText(node.label, node.x, node.y + 3.5);
      }

      // Particles: funnel to validate -> reconcile -> risk, then branch.
      const pointAt = (t: number, clean: boolean, wobble: number) => {
        if (t < 0.2) {
          const k = t / 0.2;
          const from = k < 0.5 ? mpesa : bank;
          const kk = k < 0.5 ? k * 2 : (k - 0.5) * 2;
          return { x: from.x + (validate.x - from.x) * kk, y: from.y + (validate.y - from.y) * k + wobble * 0.2 };
        }
        if (t < 0.45) {
          const k = (t - 0.2) / 0.25;
          return { x: validate.x + wobble * 0.4, y: validate.y + (reconcile.y - validate.y) * k };
        }
        if (t < 0.7) {
          const k = (t - 0.45) / 0.25;
          return { x: reconcile.x + wobble * 0.4, y: reconcile.y + (risk.y - reconcile.y) * k };
        }
        const k = (t - 0.7) / 0.3;
        const target = clean ? matched : flagged;
        const startX = risk.x + (clean ? -14 : 14);
        return {
          x: startX + (target.x + (clean ? 18 : -18) - startX) * k,
          y: risk.y + (target.y - risk.y) * k,
        };
      };

      for (const p of particles) {
        if (!reduceMotion) p.t += p.speed;
        if (p.t > 1) {
          p.t = 0;
          p.clean = Math.random() > 0.22;
        }
        const pt = pointAt(Math.min(p.t, 0.999), p.clean, p.wobble);
        const flash = 0.55 + 0.45 * Math.sin(time * 0.004 + p.t * 9);
        ctx.fillStyle = p.clean
          ? `rgba(110,131,29,${(0.9 * flash).toFixed(3)})`
          : `rgba(168,100,28,${(0.95 * flash).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 2.1, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (time: number) => {
      if (running && visible) draw(time);
      raf = window.requestAnimationFrame(loop);
    };

    resize();
    nodes = layout();
    seed();

    if (reduceMotion) {
      draw(0);
    } else {
      raf = window.requestAnimationFrame(loop);
    }

    const onResize = () => {
      resize();
      nodes = layout();
      if (reduceMotion) draw(0);
    };
    const onVisibility = () => {
      running = document.visibilityState === "visible";
    };

    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries.some((entry) => entry.isIntersecting);
      },
      { threshold: 0.05 },
    );
    observer.observe(canvas);

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      aria-label="Diagram: payment sources flow through validation, reconciliation and the risk engine into matched or flagged outcomes."
      className="pg-pipeline-canvas"
      ref={canvasRef}
      role="img"
    />
  );
}
