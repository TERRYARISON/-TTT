import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * Fullscreen image viewer.
 * Close via button, backdrop click or Escape. Focus returns to opener.
 */
export default function Lightbox({
  src,
  caption,
  onClose,
}: {
  src: string | null;
  caption?: string;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!src) return undefined;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [src, onClose]);

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={caption ?? '查看图片'}
          className="fixed inset-0 z-[95] bg-void/95 backdrop-blur-md flex items-center justify-center p-5 md:p-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={onClose}
        >
          <motion.figure
            initial={{ scale: 0.965, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.42, ease: [0.22, 0.61, 0.36, 1] }}
            className="relative max-w-[92vw] md:max-w-5xl max-h-[86vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={src}
              alt={caption ?? ''}
              className="max-h-[76vh] md:max-h-[80vh] max-w-full object-contain rounded-sm"
            />
            {caption && (
              <figcaption className="mt-5 text-xs tracking-[0.24em] text-mist">{caption}</figcaption>
            )}
          </motion.figure>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="关闭"
            className="absolute top-5 right-5 md:top-8 md:right-8 w-11 h-11 flex items-center justify-center rounded-full glass text-mist hover:text-pearl transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
