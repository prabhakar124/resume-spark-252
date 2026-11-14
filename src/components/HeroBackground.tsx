import { useEffect, useRef } from "react";

/**
 * "Embedding field" — a dot matrix that ripples like a vector space.
 * Dots near the query point (the cursor, or an auto-drifting point on touch
 * devices) light up in the accent colour, and the TOP_K nearest are linked
 * to it, echoing a vector-search retrieval.
 */
const SPACING = 28;
const RADIUS = 170;
const TOP_K = 5;

const readColor = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

export const HeroBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let raf = 0;
    let visible = true;
    let pointer: { x: number; y: number } | null = null;
    let fg = readColor("--foreground");
    let primary = readColor("--primary");

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduceMotion) draw(0);
    };

    const draw = (time: number) => {
      const t = time / 1000;
      ctx.clearRect(0, 0, width, height);

      // Query point: real cursor, or a slow Lissajous drift when there is none
      const q =
        pointer ??
        (reduceMotion
          ? null
          : {
              x: width * (0.68 + 0.2 * Math.sin(t * 0.23)),
              y: height * (0.38 + 0.22 * Math.sin(t * 0.31 + 1.3)),
            });

      const near: { x: number; y: number; d: number }[] = [];
      const offsetX = (width % SPACING) / 2;
      const offsetY = (height % SPACING) / 2;

      for (let y = offsetY; y < height; y += SPACING) {
        for (let x = offsetX; x < width; x += SPACING) {
          const wave =
            (Math.sin(x * 0.011 + t * 0.6) * Math.cos(y * 0.014 - t * 0.45) + 1) / 2;
          let r = 0.7 + wave * 0.8;
          let alpha = 0.08 + wave * 0.16;
          let color = fg;

          if (q) {
            const d = Math.hypot(x - q.x, y - q.y);
            if (d < RADIUS) {
              const f = 1 - d / RADIUS;
              r += f * 1.8;
              alpha = 0.2 + f * 0.7;
              color = primary;
              near.push({ x, y, d });
            }
          }

          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle = `hsl(${color} / ${alpha})`;
          ctx.fill();
        }
      }

      if (q && near.length) {
        near.sort((a, b) => a.d - b.d);
        ctx.lineWidth = 1;
        for (const n of near.slice(0, TOP_K)) {
          ctx.beginPath();
          ctx.moveTo(q.x, q.y);
          ctx.lineTo(n.x, n.y);
          ctx.strokeStyle = `hsl(${primary} / ${0.55 * (1 - n.d / RADIUS)})`;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(n.x, n.y, 4, 0, Math.PI * 2);
          ctx.strokeStyle = `hsl(${primary} / 0.6)`;
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(q.x, q.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${primary})`;
        ctx.fill();
      }
    };

    const loop = (time: number) => {
      draw(time);
      if (visible) raf = requestAnimationFrame(loop);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      pointer = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height ? { x, y } : null;
      if (reduceMotion) draw(0);
    };
    const onPointerLeave = () => {
      pointer = null;
      if (reduceMotion) draw(0);
    };

    // Re-read theme colours when the dark class toggles
    const themeObserver = new MutationObserver(() => {
      fg = readColor("--foreground");
      primary = readColor("--primary");
      if (reduceMotion) draw(0);
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // Pause animation while the hero is off-screen
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      const wasVisible = visible;
      visible = entry.isIntersecting;
      if (visible && !wasVisible && !reduceMotion) raf = requestAnimationFrame(loop);
    });
    visibilityObserver.observe(canvas);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);
    if (!reduceMotion) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      themeObserver.disconnect();
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 top-16 [mask-image:radial-gradient(ellipse_90%_75%_at_55%_35%,#000_45%,transparent_100%)]"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
};
