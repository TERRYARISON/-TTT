import { useEffect, useRef, useState } from 'react';

/**
 * Desktop custom cursor: small inner dot + thin outer ring with
 * lazy lerp follow. Ring grows slightly over links/buttons;
 * shows 查看 only over elements marked data-cursor="view".
 * Enabled only for fine pointers without reduced-motion.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return undefined;

    setEnabled(true);

    const pos = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    let hovering = false;
    let viewing = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const inter = t.closest('a, button, [role="button"], [data-cursor]');
      hovering = !!inter;
      viewing = !!inter?.closest('[data-cursor="view"]');
    };

    const loop = () => {
      ring.x += (pos.x - ring.x) * 0.16;
      ring.y += (pos.y - ring.y) * 0.16;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        const s = hovering ? 1.5 : 1;
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(${s})`;
        ringRef.current.style.borderColor = viewing
          ? 'rgba(142, 123, 255, 0.85)'
          : hovering
            ? 'rgba(229, 184, 201, 0.75)'
            : 'rgba(243, 240, 234, 0.4)';
      }
      if (labelRef.current) {
        labelRef.current.style.opacity = viewing ? '1' : '0';
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 z-[90] pointer-events-none" aria-hidden="true">
      {/* outer ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 rounded-full border will-change-transform transition-[border-color] duration-300"
        style={{ borderColor: 'rgba(243, 240, 234, 0.4)' }}
      >
        <span
          ref={labelRef}
          className="absolute inset-0 flex items-center justify-center text-[9px] tracking-[0.2em] text-violet opacity-0 transition-opacity duration-200"
          style={{ transform: 'scale(0.66)' }}
        >
          查看
        </span>
      </div>
      {/* inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-pearl mix-blend-difference will-change-transform"
      />
    </div>
  );
}
