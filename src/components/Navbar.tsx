import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import FlowerMark from './FlowerMark';
import { navItems } from '@/lib/data';
import { useLenisInstance } from './SmoothScroll';

/**
 * Site-wide fixed nav.
 * - Near-transparent over the hero; smoked-glass after leaving it.
 * - Hides while scrolling down, returns instantly on scroll up.
 * - Active route marked with a tiny petal-coloured dot.
 * - Mobile: fullscreen dark-glass menu with scroll lock, Esc to close,
 *   auto-close on route change, aria-expanded state.
 */
export default function Navbar() {
  const lenis = useLenisInstance();
  const location = useLocation();
  const [hidden, setHidden] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  /* ——— scroll behaviour (Lenis when available, native otherwise) ——— */
  useEffect(() => {
    const handle = (y: number, dir: number) => {
      setScrolledPastHero(y > window.innerHeight * 0.6);
      if (dir === 1 && y > 160) setHidden(true);
      else if (dir === -1 || y <= 160) setHidden(false);
    };

    if (lenis) {
      const fn = (e: { scroll: number; direction: number }) => handle(e.scroll, e.direction);
      lenis.on('scroll', fn);
      return () => lenis.off('scroll', fn);
    }

    const fn = () => {
      const y = window.scrollY;
      const dir = y > lastY.current ? 1 : -1;
      lastY.current = y;
      handle(y, dir);
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, [lenis]);

  /* ——— close the mobile menu on route change ——— */
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  /* ——— scroll lock + Esc + focus management while the menu is open ——— */
  useEffect(() => {
    if (open) {
      lenis?.stop();
      document.body.style.overflow = 'hidden';
      menuRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();

      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setOpen(false);
          burgerRef.current?.focus();
        }
      };
      window.addEventListener('keydown', onKey);
      return () => {
        window.removeEventListener('keydown', onKey);
        document.body.style.overflow = '';
        lenis?.start();
      };
    }
    return undefined;
  }, [open, lenis]);

  const glassOn = scrolledPastHero && !open;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-[transform,background-color,border-color,backdrop-filter] duration-500 ease-out ${
          hidden && !open ? '-translate-y-full' : 'translate-y-0'
        } ${glassOn ? 'glass border-x-0 border-t-0' : 'border-transparent bg-transparent backdrop-blur-0'}`}
      >
        <nav
          aria-label="主导航"
          className="flex items-center justify-between px-5 md:px-10 lg:px-16 h-16 md:h-20"
        >
          <Link to="/" className="flex items-center gap-3 min-h-[44px]" aria-label="郑超 Zheng Chao — 返回首页">
            <FlowerMark size={26} />
            <span className="leading-tight">
              <span className="block font-serif text-base md:text-lg tracking-wide">郑超</span>
              <span className="block text-[10px] tracking-[0.3em] text-mist uppercase">Zheng Chao</span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-9">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `group relative inline-flex flex-col items-center py-2 text-[13px] tracking-[0.18em] transition-colors duration-300 ${
                      isActive ? 'text-pearl' : 'text-mist hover:text-pearl'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{item.zh}</span>
                      <span className="text-[9px] tracking-[0.3em] uppercase text-faint group-hover:text-mist transition-colors">
                        {item.en}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`absolute -bottom-0.5 w-1 h-1 rounded-full bg-petal transition-opacity duration-300 ${
                          isActive ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Mobile burger — 44px touch target */}
          <button
            ref={burgerRef}
            type="button"
            className="md:hidden relative w-11 h-11 flex flex-col items-center justify-center gap-[7px]"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? '关闭菜单' : '打开菜单'}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`block w-6 h-px bg-pearl transition-transform duration-300 ${
                open ? 'translate-y-[4px] rotate-45' : ''
              }`}
            />
            <span
              className={`block w-6 h-px bg-pearl transition-transform duration-300 ${
                open ? '-translate-y-[4px] -rotate-45' : ''
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="菜单"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="fixed inset-0 z-40 md:hidden glass-deep flex flex-col justify-between pt-28 pb-10 px-8"
            style={{ paddingTop: 'max(7rem, env(safe-area-inset-top))' }}
          >
            <ul className="flex flex-col gap-1">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.to}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.06, duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
                >
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-baseline gap-4 py-4 min-h-[44px] ${isActive ? 'text-petal' : 'text-pearl'}`
                    }
                  >
                    <span className="text-[10px] tracking-[0.3em] text-faint">0{i + 1}</span>
                    <span className="font-serif text-4xl font-light">{item.zh}</span>
                    <span className="text-[10px] tracking-[0.3em] text-faint uppercase">{item.en}</span>
                  </NavLink>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex items-end justify-between"
            >
              <div>
                <p className="text-[10px] tracking-[0.3em] text-faint uppercase mb-2">Also</p>
                <div className="flex gap-5 text-sm text-mist">
                  <Link to="/books" className="py-2">
                    书籍 Books
                  </Link>
                  <Link to="/app" className="py-2">
                    App
                  </Link>
                </div>
              </div>
              <FlowerMark size={30} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
