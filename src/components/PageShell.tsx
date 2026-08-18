import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Common inner-page shell: top spacing for the fixed nav,
 * consistent horizontal rhythm, and the site-wide 200–450ms
 * black fade-in on route entry.
 */
export default function PageShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.main
      initial={reduced ? undefined : { opacity: 0 }}
      animate={reduced ? undefined : { opacity: 1 }}
      transition={{ duration: 0.38, ease: 'easeOut' }}
      className={`pt-28 md:pt-36 px-5 md:px-10 lg:px-16 ${className ?? ''}`}
    >
      {children}
    </motion.main>
  );
}
