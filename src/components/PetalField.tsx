import { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  z: number; // depth 0..1 (0 far, 1 near)
  size: number;
  rot: number;
  rotSpeed: number;
  sway: number;
  swaySpeed: number;
  phase: number;
  fall: number;
  hue: number;
  ice: boolean;
}

interface Mote {
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  phase: number;
}

/**
 * Ambient petal & luminous-dust canvas.
 * - Hero variant: medium petal density, three depth layers w/ blur.
 * - Inner-page variant: sparse environmental dust only.
 * - Petals are single-petal silhouettes (bezier), not plain ellipses.
 * - DPR capped at 2; rAF paused while tab hidden;
 *   disabled under reduced-motion; halved density on small screens.
 */
export default function PetalField({
  variant = 'ambient',
  className,
}: {
  variant?: 'hero' | 'ambient';
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;

    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let running = true;
    const mouse = { x: 0.5, y: 0.5 };

    const small = window.innerWidth < 768;
    const petalCount = Math.round((variant === 'hero' ? 26 : 8) * (small ? 0.5 : 1));
    const moteCount = Math.round((variant === 'hero' ? 34 : 10) * (small ? 0.5 : 1));

    const petals: Petal[] = [];
    const motes: Mote[] = [];

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    for (let i = 0; i < petalCount; i++) {
      const z = rand(0.15, 1);
      petals.push({
        x: rand(0, 1),
        y: rand(-0.2, 1.1),
        z,
        size: (variant === 'hero' ? 9 : 7) * (0.5 + z),
        rot: rand(0, Math.PI * 2),
        rotSpeed: rand(-0.5, 0.5),
        sway: rand(18, 60) * z,
        swaySpeed: rand(0.3, 0.9),
        phase: rand(0, Math.PI * 2),
        fall: rand(0.018, 0.05) * (0.4 + z),
        hue: rand(-8, 8),
        ice: Math.random() < 0.12,
      });
    }

    for (let i = 0; i < moteCount; i++) {
      motes.push({
        x: rand(0, 1),
        y: rand(0, 1),
        size: rand(0.6, 1.8),
        speed: rand(0.08, 0.25),
        drift: rand(6, 24),
        phase: rand(0, Math.PI * 2),
      });
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMouse = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth;
      mouse.y = e.clientY / window.innerHeight;
    };

    const drawPetal = (p: Petal, t: number) => {
      const px = p.x * w + Math.sin(t * p.swaySpeed + p.phase) * p.sway + (mouse.x - 0.5) * p.z * -18;
      const py = p.y * h + (mouse.y - 0.5) * p.z * -12;

      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(p.rot + Math.sin(t * p.swaySpeed + p.phase) * 0.4);
      ctx.globalAlpha = 0.14 + p.z * 0.4;

      if (p.ice) {
        ctx.fillStyle = 'rgba(165, 220, 232, 0.5)';
      } else {
        ctx.fillStyle = `rgba(229, 184, 201, ${0.55 + p.hue / 40})`;
      }

      /* single cherry-petal silhouette */
      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(p.size * 0.9, -p.size * 0.55, p.size * 0.75, p.size * 0.5, 0, p.size);
      ctx.bezierCurveTo(-p.size * 0.75, p.size * 0.5, -p.size * 0.9, -p.size * 0.55, 0, -p.size);
      ctx.fill();

      /* notch at petal tip */
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.moveTo(0, p.size);
      ctx.lineTo(-p.size * 0.16, p.size * 0.72);
      ctx.lineTo(p.size * 0.16, p.size * 0.72);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    let last = performance.now();

    const frame = (now: number) => {
      if (!running) return;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const t = now / 1000;

      ctx.clearRect(0, 0, w, h);

      /* luminous dust rising */
      for (const m of motes) {
        m.y -= m.speed * dt * 0.1;
        if (m.y < -0.02) {
          m.y = 1.02;
          m.x = Math.random();
        }
        const mx = m.x * w + Math.sin(t * 0.6 + m.phase) * m.drift;
        const my = m.y * h;
        ctx.beginPath();
        ctx.arc(mx, my, m.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(220, 228, 240, 0.35)';
        ctx.fill();
      }

      /* petals */
      for (const p of petals) {
        p.y += p.fall * dt;
        p.rot += p.rotSpeed * dt;
        if (p.y > 1.12) {
          p.y = -0.12;
          p.x = Math.random();
        }
        drawPetal(p, t);
      }

      raf = requestAnimationFrame(frame);
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };

    resize();
    raf = requestAnimationFrame(frame);
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouse, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full pointer-events-none ${className ?? ''}`}
      aria-hidden="true"
    />
  );
}
