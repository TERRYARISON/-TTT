import { useEffect, useState } from 'react';

/** Track prefers-reduced-motion. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const fn = () => setReduced(mq.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);

  return reduced;
}

/** True below the md breakpoint (mobile layout). */
export function useIsMobile(breakpoint = 768): boolean {
  const [mobile, setMobile] = useState<boolean>(
    () => typeof window !== 'undefined' && window.innerWidth < breakpoint,
  );

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const fn = () => setMobile(mq.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, [breakpoint]);

  return mobile;
}
