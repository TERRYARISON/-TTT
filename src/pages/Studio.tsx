import { useState } from 'react';
import PageShell from '@/components/PageShell';
import Reveal from '@/components/Reveal';
import Lightbox from '@/components/Lightbox';
import { studioCapabilities, studioRail } from '@/lib/data';

export default function Studio() {
  const [lightbox, setLightbox] = useState<{ src: string; caption: string } | null>(null);

  return (
    <PageShell>
      {/* header */}
      <Reveal>
        <p className="text-[10px] md:text-[11px] tracking-[0.4em] text-faint uppercase mb-6">
          FreeFrame Studio — 工作室
        </p>
        <h1 className="font-serif font-light text-5xl md:text-7xl leading-[1.05] max-w-3xl">
          把想法变成画面，
          <br />
          把画面变成作品。
        </h1>
        <p className="mt-8 max-w-xl text-sm md:text-base leading-loose text-mist">
          FreeFrame Studio 是郑超的制作实践：内容生产、场地与摄制协调、KOL
          协作与品牌视觉。它把「造物」扩展成一群人的协作。
        </p>
      </Reveal>

      {/* capabilities — open editorial list, not a card wall */}
      <div className="mt-20 md:mt-28">
        {studioCapabilities.map((c, i) => (
          <Reveal key={c.num} delay={i * 0.05}>
            <div className="group grid md:grid-cols-[80px_1fr_1.2fr] gap-4 md:gap-10 py-8 md:py-10 border-b hairline">
              <span className="text-xs text-faint tabular-nums tracking-[0.2em] pt-2">{c.num}</span>
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-light group-hover:text-petal transition-colors duration-500">
                  {c.zh}
                </h2>
                <p className="mt-1 text-[10px] tracking-[0.3em] text-faint uppercase">{c.en}</p>
              </div>
              <p className="text-sm md:text-base leading-loose text-mist md:pt-3">{c.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* image rail */}
      <div className="mt-20 md:mt-28">
        <Reveal>
          <p className="text-[10px] md:text-[11px] tracking-[0.4em] text-faint uppercase mb-8">
            Field Notes — 现场手记
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <div
            className="flex gap-5 overflow-x-auto pb-4 -mx-5 px-5 md:mx-0 md:px-0 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'thin' }}
          >
            {studioRail.map((img, i) => (
              <figure
                key={img.src}
                className="group relative shrink-0 w-[78vw] sm:w-72 md:w-80 aspect-[4/3] rounded-lg overflow-hidden border border-white/8 snap-start cursor-pointer"
                onClick={() => setLightbox(img)}
                data-cursor="view"
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700 ease-out"
                />
                <figcaption className="absolute bottom-0 inset-x-0 px-4 py-3 text-[10px] tracking-[0.26em] text-pearl/90 bg-gradient-to-t from-void/80 to-transparent">
                  {img.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
        <p className="mt-3 text-[10px] tracking-[0.24em] text-faint">← 横向滑动 · swipe →</p>
      </div>

      <Lightbox
        src={lightbox?.src ?? null}
        caption={lightbox?.caption}
        onClose={() => setLightbox(null)}
      />
    </PageShell>
  );
}
