import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageShell from '@/components/PageShell';
import Reveal from '@/components/Reveal';
import Lightbox from '@/components/Lightbox';
import { works } from '@/lib/data';
import NotFound from './NotFound';

gsap.registerPlugin(ScrollTrigger);

export default function WorkDetail() {
  const { slug } = useParams();
  const work = works.find((w) => w.slug === slug);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);

  /* gentle hero parallax */
  useEffect(() => {
    if (!work) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroImgRef.current,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        },
      );
    });

    return () => ctx.revert();
  }, [work]);

  if (!work) return <NotFound />;

  const idx = works.findIndex((w) => w.slug === slug);
  const next = works[(idx + 1) % works.length];

  return (
    <PageShell className="!px-0">
      {/* header */}
      <div className="px-5 md:px-10 lg:px-16">
        <Reveal>
          <p className="text-[10px] md:text-[11px] tracking-[0.4em] text-faint uppercase mb-6">
            {work.streamLabel} — {work.status}
          </p>
          <h1 className="font-serif font-light text-5xl md:text-7xl leading-[1.05]">
            {work.title}
          </h1>
          <p className="mt-3 text-xs tracking-[0.3em] text-faint uppercase">{work.titleEn}</p>
        </Reveal>
      </div>

      {/* hero with parallax */}
      <div ref={heroRef} className="relative mt-12 md:mt-16 overflow-hidden">
        <div className="relative h-[52vh] md:h-[76vh] overflow-hidden">
          <img
            ref={heroImgRef}
            src={work.hero}
            alt={`${work.title} 主视觉`}
            className="absolute inset-0 w-full h-[118%] object-cover -translate-y-[9%] will-change-transform"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/40" />
        </div>
      </div>

      {/* overview */}
      <div className="px-5 md:px-10 lg:px-16 mt-16 md:mt-24 grid md:grid-cols-[minmax(0,320px)_1fr] gap-10 md:gap-20">
        <Reveal>
          <div>
            <p className="text-[10px] tracking-[0.3em] text-faint uppercase mb-4">Overview</p>
            <p className="font-serif text-xl md:text-2xl leading-relaxed text-pearl/90">
              {work.summary}
            </p>
            <p className="mt-4 text-sm leading-loose text-faint">{work.summaryEn}</p>
          </div>
        </Reveal>
        <div className="space-y-7">
          {work.overview.map((p, i) => (
            <Reveal key={i} delay={0.06 + i * 0.05}>
              <p className="max-w-2xl text-sm md:text-base leading-loose text-mist">{p}</p>
            </Reveal>
          ))}
        </div>
      </div>

      {/* gallery */}
      <div className="px-5 md:px-10 lg:px-16 mt-20 md:mt-28">
        <Reveal>
          <p className="text-[10px] md:text-[11px] tracking-[0.4em] text-faint uppercase mb-10">
            Gallery — 图像
          </p>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-5 md:gap-7">
          {work.gallery.map((g, i) => (
            <Reveal key={g.src} delay={i * 0.06}>
              <figure
                className="group relative rounded-lg overflow-hidden border border-white/8 cursor-pointer"
                onClick={() => setLightbox(g.src)}
                data-cursor="view"
              >
                <img
                  src={g.src}
                  alt={g.caption}
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-[4/3] object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.015] transition-all duration-700 ease-out"
                />
                <figcaption className="absolute bottom-0 inset-x-0 px-4 py-3 text-[10px] tracking-[0.26em] text-pearl/90 bg-gradient-to-t from-void/85 to-transparent">
                  {g.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>

      {/* quote */}
      <div className="px-5 md:px-10 lg:px-16 mt-24 md:mt-36">
        <Reveal>
          <blockquote className="max-w-3xl">
            <p className="font-serif font-light italic text-3xl md:text-5xl leading-snug">
              「{work.quote}」
            </p>
          </blockquote>
        </Reveal>
      </div>

      {/* next project */}
      <div className="px-5 md:px-10 lg:px-16 mt-24 md:mt-36">
        <Reveal>
          <Link
            to={`/work/${next.slug}`}
            className="group block border-t hairline pt-10 md:pt-14 pb-4"
          >
            <p className="text-[10px] tracking-[0.3em] text-faint uppercase mb-5">
              Next Project — 下一个项目
            </p>
            <div className="flex items-baseline gap-6 md:gap-10">
              <span className="font-serif text-4xl md:text-6xl font-light text-pearl group-hover:text-petal transition-colors duration-500">
                {next.title}
              </span>
              <span
                aria-hidden="true"
                className="text-mist group-hover:translate-x-2 group-hover:text-petal transition-all duration-500 ease-out"
              >
                →
              </span>
            </div>
            <p className="mt-4 text-sm text-mist">{next.summary}</p>
          </Link>
        </Reveal>
      </div>

      <Lightbox src={lightbox} onClose={() => setLightbox(null)} />
    </PageShell>
  );
}
