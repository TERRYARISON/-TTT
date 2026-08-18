import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import Lenis from 'lenis';

const LenisContext = createContext<Lenis | null>(null);

/** Access the shared Lenis instance (null before init / when reduced-motion). */
export const useLenisInstance = () => useContext(LenisContext);

/**
 * Site-wide Lenis smooth scrolling.
 * Disabled under prefers-reduced-motion — native scroll then.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const instance = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    setLenis(instance);

    let raf = 0;
    const loop = (time: number) => {
      instance.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
