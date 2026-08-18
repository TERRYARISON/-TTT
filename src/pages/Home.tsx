import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Preloader from '@/components/Preloader';
import HeroCinematic from '@/components/HeroCinematic';
import Reveal from '@/components/Reveal';
import { indexItems, works } from '@/lib/data';

/* ————————————————— Index ————————————————— */

function IndexSection() {
  return (
    <section className="px-5 md:px-10 lg:px-16 py-24 md:py-36" aria-label="索引">
      <Reveal>
        <p className="text-[10px] md:text-[11px] tracking-[0.4em] text-faint uppercase mb-12">
          Index — 索引
        </p>
      </Reveal>

      <div>
        {indexItems.map((item, i) => (
          <Reveal key={item.to} delay={i * 0.06}>
            <Link
              to={item.to}
              className="group relative flex items-baseline gap-6 md:gap-10 py-7 md:py-9 border-b hairline hover:bg-white/[0.025] transition-colors duration-500 px-2 md:px-4 -mx-2 md:-mx-4 rounded-sm"
            >
              <span className="text-xs md:text-sm text-faint tabular-nums tracking-[0.2em]">
                {item.num}
              </span>
              <span className="font-serif text-3xl md:text-5xl font-light text-pearl group-hover:text-petal transition-colors duration-500">
                {item.en}
              </span>
              <span className="text-sm md:text-base text-mist">{item.zh}</span>
              <span className="ml-auto hidden md:block text-xs text-faint group-hover:text-mist transition-colors duration-500">
                {item.desc}
              </span>
              <span
                aria-hidden="true"
                className="text-mist group-hover:translate-x-1.5 group-hover:text-petal transition-all duration-500 ease-out"
              >
                →
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ————————————————— Selected Work ————————————————— */

function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const [active, setActive] = useState<number | null>(null);

  /* inertial thumbnail follow — desktop pointer only */
  const onMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    target.current.x = e.clientX - rect.left;
    target.current.y = e.clientY - rect.top;
  };

  const tick = useCallback(() => {
    const p = pos.current;
    const t = target.current;
    p.x += (t.x - p.x) * 0.12;
    p.y += (t.y - p.y) * 0.12;
    if (previewRef.current) {
      previewRef.current.style.transform = `translate3d(${p.x + 28}px, ${p.y - 90}px, 0)`;
    }
  }, []);

  const startPreview = (i: number) => {
    if (window.matchMedia('(pointer: fine)').matches) setActive(i);
  };

  return (
    <section
      ref={sectionRef}
      className="relative px-5 md:px-10 lg:px-16 py-24 md:py-36"
      aria-label="精选作品"
      onMouseMove={onMouseMove}
    >
      <Reveal>
        <div className="flex items-baseline justify-between mb-12">
          <p className="text-[10px] md:text-[11px] tracking-[0.4em] text-faint uppercase">
            Selected Work — 精选作品
          </p>
          <Link to="/works" className="text-xs text-mist hover:text-petal transition-colors duration-300">
            全部作品 →
          </Link>
        </div>
      </Reveal>

      {/* floating preview (desktop hover) */}
      <div
        ref={previewRef}
        aria-hidden="true"
        className={`hidden md:block absolute top-0 left-0 w-72 aspect-[4/3] rounded-lg overflow-hidden pointer-events-none z-20 border border-white/10 transition-opacity duration-300 ${
          active !== null ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ willChange: 'transform' }}
      >
        {active !== null && (
          <img src={works[active].hero} alt="" className="w-full h-full object-cover" />
        )}
      </div>

      <div>
        {works.map((w, i) => (
          <Reveal key={w.slug} delay={i * 0.05}>
            <Link
              to={`/work/${w.slug}`}
              className="group flex md:hidden flex-col gap-2 py-6 border-b hairline"
              onMouseEnter={() => startPreview(i)}
              onMouseLeave={() => setActive(null)}
            >
              <span className="text-[10px] tracking-[0.3em] text-faint">{w.streamLabel}</span>
              <span className="font-serif text-2xl text-pearl">{w.title}</span>
              <span className="text-xs text-mist">{w.summary}</span>
            </Link>
            <Link
              to={`/work/${w.slug}`}
              className="group hidden md:flex items-baseline gap-10 py-8 border-b hairline px-4 -mx-4 rounded-sm hover:bg-white/[0.025] transition-colors duration-500"
              onMouseEnter={() => startPreview(i)}
              onMouseLeave={() => setActive(null)}
            >
              <span className="text-xs text-faint tabular-nums tracking-[0.2em]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="font-serif text-4xl font-light text-pearl group-hover:text-petal transition-colors duration-500">
                {w.title}
              </span>
              <span className="text-xs tracking-[0.2em] text-faint uppercase">{w.titleEn}</span>
              <span className="ml-auto text-xs text-mist">{w.streamLabel}</span>
              <span className="text-[10px] tracking-[0.24em] text-faint">{w.status}</span>
              <span
                aria-hidden="true"
                className="text-mist group-hover:translate-x-1.5 group-hover:text-petal transition-all duration-500 ease-out"
              >
                →
              </span>
            </Link>
          </Reveal>
        ))}
      </div>

      {/* preview rAF loop */}
      <PreviewLoop active={active} tick={tick} />
    </section>
  );
}

/** Runs the preview lerp only while a row is hovered. */
function PreviewLoop({ active, tick }: { active: number | null; tick: () => void }) {
  useEffect(() => {
    if (active === null) return undefined;
    let raf = 0;
    const loop = () => {
      tick();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [active, tick]);
  return null;
}

/* ————————————————— Page ————————————————— */

export default function Home() {
  /* Repeat visits skip the preloader → hero enters immediately. */
  const [introDelay] = useState(
    () => (sessionStorage.getItem('zc-preloader-seen') ? 0.15 : 2.75),
  );

  return (
    <>
      <Preloader />
      <HeroCinematic introDelay={introDelay} />
      <IndexSection />
      <SelectedWork />
    </>
  );
}
