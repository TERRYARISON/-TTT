import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PetalField from './PetalField';
import { heroVisual, manifestoLines, manifestoZh } from '@/lib/data';
import { useIsMobile, useReducedMotion } from '@/lib/hooks';

gsap.registerPlugin(ScrollTrigger);

/* ——— Scene B discipline cards ——— */
const disciplines = [
  {
    to: '/app',
    en: 'BUILD',
    zh: '造物',
    desc: '数字产品与界面概念',
    glyph: (
      <>
        <rect x="7" y="7" width="10" height="10" rx="1" />
        <path d="M10 10.5h4M10 13.5h2.5" />
      </>
    ),
  },
  {
    to: '/books',
    en: 'WRITE',
    zh: '写作',
    desc: '长篇小说与短篇随笔',
    glyph: (
      <>
        <path d="M6 6.5c3 0 3-1.5 6-1.5s6 0 6 1.5v11c0-1.5-3-1.5-6-1.5s-3 1.5-6 1.5z" />
        <path d="M12 5v11.5" />
      </>
    ),
  },
  {
    to: '/studio',
    en: 'PRODUCE',
    zh: '制作',
    desc: 'FreeFrame Studio 制作实践',
    glyph: (
      <>
        <circle cx="12" cy="12" r="5" />
        <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      </>
    ),
  },
];

/** Gold neural hairline filigree overlay for the living frame. */
function NeuralLines() {
  return (
    <svg
      viewBox="0 0 1000 620"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    >
      <g fill="none" stroke="#D8C08F" strokeWidth="0.7" opacity="0.55">
        <path d="M120 520 C 260 430, 300 300, 470 250 S 700 210, 860 120" />
        <path d="M180 610 C 330 520, 420 470, 560 400 S 760 300, 950 260" />
        <path d="M60 380 C 200 340, 330 240, 520 210 S 780 150, 920 60" />
        <path d="M300 620 C 380 500, 520 460, 640 380 S 820 260, 900 140" />
      </g>
      <g fill="#A5DCE8">
        {[
          [470, 250],
          [560, 400],
          [520, 210],
          [640, 380],
          [860, 120],
          [300, 300],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 2 ? 2.4 : 1.6} opacity="0.75" />
        ))}
      </g>
    </svg>
  );
}

/** Identity copy — shared by cinematic scene A and the static hero. */
function IdentityBlock({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? '' : 'max-w-xl'}>
      <p className="text-[10px] md:text-[11px] tracking-[0.34em] text-mist uppercase mb-5">
        Build · Write · Produce · Antiques & Thai Amulets Collect
      </p>
      <h1 className={`font-serif font-light leading-[1.08] ${compact ? 'text-4xl' : 'text-4xl md:text-6xl'}`}>
        All of this is me.
        <br />
        <span className="text-mist">None of it is</span>{' '}
        <span className="inline-block align-baseline rounded-full bg-violet/15 border border-violet/40 px-4 py-0.5 text-pearl">
          all of me.
        </span>
      </h1>
      <p className="mt-5 text-sm md:text-base text-mist tracking-wide">造物、旧物与其他执念</p>

      <div className="mt-8 flex items-center gap-7">
        <Link
          to="/studio"
          className="group inline-flex items-center gap-3 min-h-[44px]"
          aria-label="进入工作室"
        >
          <span className="w-12 h-12 rounded-full bg-violet text-void flex items-center justify-center transition-transform duration-500 ease-out group-hover:translate-x-1">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M3 9h11M9.5 4.5L14 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </span>
          <span className="text-sm tracking-[0.2em] text-pearl">进入工作室</span>
        </Link>
        <Link
          to="/about"
          className="text-sm tracking-[0.2em] text-mist hover:text-pearl transition-colors duration-300 min-h-[44px] inline-flex items-center"
        >
          关于我
        </Link>
      </div>
    </div>
  );
}

/** Manifesto copy — shared by cinematic scene C and the flow section. */
function ManifestoBlock() {
  return (
    <div className="max-w-3xl">
      {manifestoLines.map((line, i) => (
        <p key={line} className="font-serif font-light text-3xl md:text-5xl leading-[1.25]">
          {i === 3 ? (
            <>
              I{' '}
              <span className="inline-block rounded-full bg-violet/15 border border-violet/40 px-4 py-0.5">
                collect
              </span>{' '}
              antiques & Thai amulets.
            </>
          ) : (
            line
          )}
        </p>
      ))}
      <p className="mt-7 text-sm md:text-base leading-loose text-mist max-w-xl">{manifestoZh}</p>
    </div>
  );
}

/**
 * Hero — a scroll-driven cinematic sequence in three scenes
 * (Identity → Disciplines → Manifesto) on desktop; a static
 * hero + flow sections on mobile / reduced-motion.
 */
export default function HeroCinematic({ introDelay = 0.15 }: { introDelay?: number }) {
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const cinematic = !reduced && !mobile;

  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const darkRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const sceneARef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const mfsRef = useRef<HTMLDivElement>(null);
  const petalsWrapRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  /* ——— entrance (after preloader) ——— */
  useEffect(() => {
    if (!cinematic) return undefined;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: introDelay, defaults: { ease: 'power3.out' } });
      tl.fromTo(
        imgWrapRef.current,
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 1.6 },
      )
        .fromTo(
          sceneARef.current,
          { opacity: 0, y: 46 },
          { opacity: 1, y: 0, duration: 1.1 },
          0.35,
        )
        .fromTo(hintRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8 }, 1.1);
    }, wrapRef);

    return () => ctx.revert();
  }, [cinematic, introDelay]);

  /* ——— pinned scroll timeline ——— */
  useEffect(() => {
    if (!cinematic) return undefined;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 769px) and (prefers-reduced-motion: no-preference)', () => {
      const cards = cardsRef.current;
      const cardEls = cards?.querySelectorAll('.hero-card') ?? [];

      gsap.set(imgWrapRef.current, { transformOrigin: '68% 30%' });
      /* autoAlpha = opacity + visibility → hidden scenes can't steal clicks. */
      gsap.set(cards, { autoAlpha: 0, y: 70 });
      gsap.set(cardEls, { y: 42 });
      gsap.set(mfsRef.current, { autoAlpha: 0, y: 55 });
      gsap.set(linesRef.current, { opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.85,
        },
      });

      tl
        // A → B : identity fades, camera pushes into the neural/blossom detail
        .to(hintRef.current, { opacity: 0, duration: 0.05 }, 0.02)
        .to(sceneARef.current, { opacity: 0, y: -46, duration: 0.16 }, 0.06)
        .to(imgWrapRef.current, { scale: 1.32, xPercent: 5, yPercent: -6, duration: 0.5 }, 0)
        .to(linesRef.current, { opacity: 0.75, duration: 0.28 }, 0.16)
        // B : three discipline cards
        .to(cards, { autoAlpha: 1, y: 0, duration: 0.17 }, 0.3)
        .to(cardEls, { y: 0, duration: 0.16, stagger: 0.05 }, 0.3)
        .to(cards, { autoAlpha: 0, y: -44, duration: 0.13 }, 0.6)
        // B → C : the frame calms and deepens, petals thicken slightly
        .to(imgWrapRef.current, { scale: 1.12, xPercent: 0, yPercent: 0, duration: 0.3 }, 0.56)
        .to(darkRef.current, { opacity: 0.5, duration: 0.3 }, 0.56)
        .to(linesRef.current, { opacity: 0.3, duration: 0.24 }, 0.62)
        .to(petalsWrapRef.current, { opacity: 1, duration: 0.24 }, 0.64)
        // C : manifesto
        .to(mfsRef.current, { autoAlpha: 1, y: 0, duration: 0.2 }, 0.74)
        .to({}, { duration: 0.06 }, 0.94);

      /* ——— feather-light mouse parallax on the frame ——— */
      const qx = gsap.quickTo(imgWrapRef.current, 'x', { duration: 1.2, ease: 'power3.out' });
      const qy = gsap.quickTo(imgWrapRef.current, 'y', { duration: 1.2, ease: 'power3.out' });
      const onMove = (e: MouseEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        qx(nx * 14);
        qy(ny * 10);
      };
      window.addEventListener('mousemove', onMove, { passive: true });

      return () => window.removeEventListener('mousemove', onMove);
    });

    return () => mm.revert();
  }, [cinematic]);

  /* ————————————————————— static hero (mobile / reduced-motion) ————————————————————— */

  if (!cinematic) {
    return (
      <section className="relative">
        <div className="relative min-h-[100svh] flex items-end overflow-hidden">
          <picture>
            <source media="(min-width: 769px)" srcSet={heroVisual.desktop} />
            <img
              src={heroVisual.mobile}
              alt="郑超 — 有机未来主义肖像：樱花与金色神经网络共生"
              className="absolute inset-0 w-full h-full object-cover object-[50%_28%]"
              decoding="async"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-void/20" />
          <div className="absolute inset-0 opacity-40">
            <NeuralLines />
          </div>
          <div className="absolute inset-0 opacity-80">
            <PetalField variant="hero" />
          </div>
          <div className="relative w-full px-5 pb-14 pt-32 glass-deep border-x-0 border-b-0" style={{ paddingBottom: 'max(3.5rem, env(safe-area-inset-bottom))' }}>
            <IdentityBlock compact />
          </div>
        </div>

        {/* simplified flow: cards + manifesto */}
        <div className="px-5 py-16 flex flex-col gap-4">
          {disciplines.map((d) => (
            <Link
              key={d.en}
              to={d.to}
              className="glass rounded-xl p-6 flex items-center gap-5 min-h-[44px]"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D8C08F" strokeWidth="1" aria-hidden="true">
                {d.glyph}
              </svg>
              <span className="flex-1">
                <span className="block text-[10px] tracking-[0.34em] text-faint">{d.en}</span>
                <span className="block font-serif text-2xl">{d.zh}</span>
                <span className="block text-xs text-mist mt-1">{d.desc}</span>
              </span>
            </Link>
          ))}
        </div>
        <div className="px-5 pb-8">
          <ManifestoBlock />
        </div>
      </section>
    );
  }

  /* ————————————————————— desktop pinned cinematic ————————————————————— */

  return (
    <section ref={wrapRef} className="relative" aria-label="首页主视觉">
      <div className="relative h-[340vh]">
        <div ref={stageRef} className="sticky top-0 h-screen overflow-hidden">
          {/* the living frame */}
          <div className="absolute inset-0 flex items-center justify-center pt-20 pb-6">
            <div
              ref={imgWrapRef}
              className="relative w-[93%] h-[82%] rounded-2xl overflow-hidden will-change-transform"
            >
              <picture>
                <source media="(min-width: 769px)" srcSet={heroVisual.desktop} />
                <img
                  src={heroVisual.desktop}
                  alt="郑超 — 有机未来主义肖像：樱花与金色神经网络共生"
                  className="w-full h-full object-cover"
                  decoding="async"
                />
              </picture>
              <div
                ref={darkRef}
                className="absolute inset-0 bg-gradient-to-t from-void/85 via-void/20 to-void/35 opacity-0"
              />
              <div ref={linesRef} className="absolute inset-0">
                <NeuralLines />
              </div>
              {/* frame hairline */}
              <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none" />
            </div>
          </div>

          {/* ambient petals */}
          <div ref={petalsWrapRef} className="absolute inset-0 opacity-70">
            <PetalField variant="hero" />
          </div>

          {/* Scene A — identity */}
          <div ref={sceneARef} className="absolute inset-0 pointer-events-none">
            <div className="absolute left-[6%] bottom-[9%] pointer-events-auto">
              <div className="glass rounded-xl px-8 py-8">
                <IdentityBlock />
              </div>
            </div>
          </div>

          {/* Scene B — disciplines */}
          <div ref={cardsRef} className="absolute inset-0 flex items-center justify-center">
            <div className="flex gap-6">
              {disciplines.map((d) => (
                <Link
                  key={d.en}
                  to={d.to}
                  className="hero-card glass rounded-xl w-60 px-7 py-8 flex flex-col gap-4 min-h-[260px] hover:border-petal/30 transition-colors duration-500"
                >
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D8C08F" strokeWidth="0.9" aria-hidden="true">
                    {d.glyph}
                  </svg>
                  <div className="mt-auto">
                    <p className="text-[10px] tracking-[0.34em] text-faint">{d.en}</p>
                    <p className="font-serif text-3xl mt-1">{d.zh}</p>
                    <p className="text-xs text-mist mt-3 leading-relaxed">{d.desc}</p>
                  </div>
                  <span className="text-[10px] tracking-[0.3em] text-petal/80 mt-2">ENTER →</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Scene C — manifesto */}
          <div ref={mfsRef} className="absolute inset-0 flex items-center justify-center">
            <ManifestoBlock />
          </div>

          {/* scroll hint */}
          <div
            ref={hintRef}
            className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
            aria-hidden="true"
          >
            <span className="text-[9px] tracking-[0.4em] text-faint">SCROLL</span>
            <span className="block w-px h-10 bg-white/10 overflow-hidden">
              <span
                className="block w-full h-1/2 bg-petal/80"
                style={{ animation: 'scrollhint 2.2s cubic-bezier(0.65,0,0.35,1) infinite' }}
              />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
