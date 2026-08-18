import { useState } from 'react';
import PageShell from '@/components/PageShell';
import Reveal from '@/components/Reveal';
import Lightbox from '@/components/Lightbox';
import { appExhibits, appNotes } from '@/lib/data';

export default function AppPage() {
  const [lightbox, setLightbox] = useState<{ src: string; caption: string } | null>(null);

  return (
    <PageShell>
      <Reveal>
        <p className="text-[10px] md:text-[11px] tracking-[0.4em] text-faint uppercase mb-6">
          App — 数字产品概念
        </p>
        <h1 className="font-serif font-light text-5xl md:text-7xl leading-[1.05] max-w-3xl">
          界面应该退后，
          <br />
          让内容站在光里。
        </h1>
        <p className="mt-8 max-w-xl text-sm md:text-base leading-loose text-mist">
          关于阅读、收藏与工具的数字产品概念。目前处于概念与原型阶段——没有宏大的数据故事，只有对界面上每一寸呼吸感的执念。
        </p>
      </Reveal>

      {/* exhibits — museum presentation */}
      <div className="mt-20 md:mt-28 space-y-20 md:space-y-28">
        {appExhibits.map((ex, i) => (
          <Reveal key={ex.src} delay={0.04}>
            <div
              className={`grid md:grid-cols-2 gap-8 md:gap-16 items-center ${
                i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
              }`}
            >
              <figure
                className="group relative rounded-xl overflow-hidden border border-white/8 cursor-pointer mx-auto w-full max-w-sm"
                onClick={() => setLightbox(ex)}
                data-cursor="view"
              >
                <img
                  src={ex.src}
                  alt={ex.caption}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="w-full aspect-[3/4] object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-700"
                />
                <span className="absolute inset-0 rounded-xl ring-0 ring-ice/0 group-hover:ring-1 group-hover:ring-ice/30 transition-all duration-500 pointer-events-none" />
              </figure>
              <div className={i % 2 === 1 ? 'md:text-right' : ''}>
                <p className="text-[10px] tracking-[0.34em] text-faint uppercase">
                  Exhibit 0{i + 1}
                </p>
                <h2 className="font-serif text-3xl md:text-4xl font-light mt-3">{ex.caption}</h2>
                <p className={`mt-5 text-sm md:text-base leading-loose text-mist max-w-sm ${i % 2 === 1 ? 'md:ml-auto' : ''}`}>
                  {ex.desc}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* notes */}
      <div className="mt-24 md:mt-36">
        <Reveal>
          <p className="text-[10px] md:text-[11px] tracking-[0.4em] text-faint uppercase mb-10">
            Notes — 产品手记
          </p>
        </Reveal>
        {appNotes.map((n, i) => (
          <Reveal key={n.num} delay={i * 0.05}>
            <div className="grid md:grid-cols-[80px_1fr_1.4fr] gap-4 md:gap-10 py-7 md:py-8 border-b hairline">
              <span className="text-xs text-faint tabular-nums tracking-[0.2em] pt-2">{n.num}</span>
              <h3 className="font-serif text-2xl md:text-3xl font-light">{n.zh}</h3>
              <div className="md:pt-1.5">
                <p className="text-[10px] tracking-[0.3em] text-faint uppercase">{n.en}</p>
                <p className="mt-2 text-sm leading-loose text-mist">{n.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Lightbox
        src={lightbox?.src ?? null}
        caption={lightbox?.caption}
        onClose={() => setLightbox(null)}
      />
    </PageShell>
  );
}
