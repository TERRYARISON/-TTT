import PageShell from '@/components/PageShell';
import Reveal from '@/components/Reveal';
import { aboutPortrait, aboutBioZh, identityMarquee, collectionImages, nowItems } from '@/lib/data';

const dotColor: Record<string, string> = {
  petal: 'bg-petal',
  ice: 'bg-ice',
  gold: 'bg-gold',
  mist: 'bg-mist',
};

export default function About() {
  return (
    <PageShell>
      {/* portrait + bio */}
      <div className="grid md:grid-cols-[minmax(0,440px)_1fr] gap-12 md:gap-20 items-start">
        <Reveal>
          <figure className="group relative rounded-xl overflow-hidden border border-white/8 grain">
            <img
              src={aboutPortrait}
              alt="郑超 — 有机未来主义编辑肖像"
              loading="eager"
              decoding="async"
              className="w-full aspect-[3/4] object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
            />
          </figure>
        </Reveal>

        <div className="md:pt-6">
          <Reveal>
            <p className="text-[10px] md:text-[11px] tracking-[0.4em] text-faint uppercase mb-6">
              About — 关于我
            </p>
            <h1 className="font-serif font-light text-5xl md:text-6xl leading-[1.08]">
              郑超
              <span className="ml-4 text-lg md:text-xl tracking-[0.3em] text-mist font-sans">
                ZHENG CHAO
              </span>
            </h1>
          </Reveal>

          <div className="mt-10 space-y-7">
            {aboutBioZh.map((p, i) => (
              <Reveal key={i} delay={0.08 + i * 0.06}>
                <p className="max-w-xl text-sm md:text-base leading-loose text-mist">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* identity marquee */}
      <div className="mt-20 md:mt-28 -mx-5 md:-mx-10 lg:-mx-16 border-y hairline py-6 md:py-8 marquee" aria-label="身份关键词滚动条">
        <div className="marquee-track font-serif text-3xl md:text-5xl font-light text-pearl/25">
          <span className="pr-8">{identityMarquee}</span>
          <span className="pr-8" aria-hidden="true">
            {identityMarquee}
          </span>
        </div>
      </div>

      {/* collection + now */}
      <div className="mt-20 md:mt-28 grid md:grid-cols-2 gap-16 md:gap-10">
        <div>
          <Reveal>
            <p className="text-[10px] md:text-[11px] tracking-[0.4em] text-faint uppercase mb-8">
              Collection — 收藏
            </p>
          </Reveal>
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {collectionImages.map((img, i) => (
              <Reveal key={img.src} delay={i * 0.06}>
                <figure className="group relative rounded-lg overflow-hidden border border-white/8 aspect-[3/4]">
                  <img
                    src={img.src}
                    alt={img.caption}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity duration-700"
                  />
                  <figcaption className="absolute bottom-0 inset-x-0 px-2.5 py-2 text-[9px] tracking-[0.2em] text-pearl/85 bg-gradient-to-t from-void/85 to-transparent">
                    {img.caption}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>

        <div>
          <Reveal>
            <p className="text-[10px] md:text-[11px] tracking-[0.4em] text-faint uppercase mb-8">
              Now — 正在做
            </p>
          </Reveal>
          {nowItems.map((n, i) => (
            <Reveal key={n.label} delay={i * 0.05}>
              <div className="flex items-center gap-4 py-5 border-b hairline">
                <span className={`w-1.5 h-1.5 rounded-full ${dotColor[n.dot]}`} aria-hidden="true" />
                <span className="text-sm md:text-base text-pearl">{n.label}</span>
                <span className="ml-auto text-[10px] tracking-[0.24em] text-faint">{n.status}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
