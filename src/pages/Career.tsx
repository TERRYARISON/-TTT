import { Link } from 'react-router-dom';
import PageShell from '@/components/PageShell';
import Reveal from '@/components/Reveal';
import { careerPhases } from '@/lib/data';

export default function Career() {
  return (
    <PageShell>
      <Reveal>
        <p className="text-[10px] md:text-[11px] tracking-[0.4em] text-faint uppercase mb-6">
          Career — 履历
        </p>
        <h1 className="font-serif font-light text-5xl md:text-7xl leading-[1.05] max-w-3xl">
          四条并行的时间线
        </h1>
        <p className="mt-8 max-w-xl text-sm md:text-base leading-loose text-mist">
          建造、写作、制作与收藏——它们不是阶段，而是同时生长的四条根。
        </p>
      </Reveal>

      {/* timeline */}
      <div className="relative mt-20 md:mt-28">
        {/* vertical hairline */}
        <div
          aria-hidden="true"
          className="absolute left-[7px] md:left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-gold/40 via-white/10 to-transparent"
        />

        {careerPhases.map((p, i) => (
          <Reveal key={p.key} delay={i * 0.07}>
            <div className="relative pl-10 md:pl-16 pb-16 md:pb-24">
              {/* node */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-2.5 w-[15px] h-[15px] md:w-[19px] md:h-[19px] rounded-full border border-gold/50 bg-void flex items-center justify-center"
              >
                <span className="w-1 h-1 rounded-full bg-gold" />
              </span>

              <div className="flex flex-wrap items-baseline gap-x-8 gap-y-2">
                <h2 className="font-serif text-4xl md:text-6xl font-light">{p.en}</h2>
                <span className="font-serif text-2xl md:text-3xl text-mist font-light">{p.zh}</span>
                <span className="text-[10px] tracking-[0.28em] text-faint uppercase">
                  {p.years}
                </span>
              </div>

              <p className="mt-6 max-w-xl text-sm md:text-base leading-loose text-mist">{p.desc}</p>

              <Link
                to={p.link.to}
                className="group inline-flex items-center gap-2 mt-5 text-xs tracking-[0.24em] text-petal/90 hover:text-petal transition-colors duration-300 min-h-[44px]"
              >
                {p.link.label}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-500 ease-out group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
    </PageShell>
  );
}
