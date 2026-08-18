import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FlowerMark from './FlowerMark';

const SEEN_KEY = 'zc-preloader-seen';

/**
 * First-visit-only preloader (per browser session).
 * Black stage, flower outline drawing in, hairline progress.
 * Exit is an iris (clip-path circle) reveal of the hero beneath.
 * Cached sessions finish quickly; reduced-motion skips entirely.
 */
export default function Preloader() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const startRef = useRef(0);
  const durRef = useRef(2000);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const seen = sessionStorage.getItem(SEEN_KEY);

    if (seen || reduced) {
      sessionStorage.setItem(SEEN_KEY, '1');
      return;
    }

    sessionStorage.setItem(SEEN_KEY, '1');
    setVisible(true);

    /* Cached loads (fast navigation timing) finish much faster. */
    const nav = performance.getEntriesByType('navigation')[0] as
      | PerformanceNavigationTiming
      | undefined;
    const cached = nav ? nav.responseStart - nav.startTime < 120 : false;
    durRef.current = cached ? 900 : 2100;

    startRef.current = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - startRef.current) / durRef.current);
      /* ease-out so the line slows near the end */
      setProgress(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setVisible(false), 220);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] bg-void flex flex-col items-center justify-center"
          initial={{ clipPath: 'circle(150% at 50% 50%)' }}
          exit={{ clipPath: 'circle(0% at 50% 50%)', transition: { duration: 0.85, ease: [0.65, 0, 0.35, 1] } }}
          aria-hidden="true"
        >
          {/* flower outline draws in */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 0.61, 0.36, 1] }}
            className="text-petal"
          >
            <FlowerMark size={64} />
          </motion.div>

          {/* name */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: 'easeOut' }}
            className="mt-7 font-serif text-sm tracking-[0.42em] text-mist"
          >
            郑超 <span className="text-faint">ZHENG CHAO</span>
          </motion.p>

          {/* hairline progress + percentage */}
          <div className="mt-9 w-40 h-px bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-gold/70 via-petal/80 to-violet/70"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-3 text-[10px] tracking-[0.34em] text-faint tabular-nums">
            {String(progress).padStart(3, '0')}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
