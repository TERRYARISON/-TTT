import { Link } from 'react-router-dom';
import PageShell from '@/components/PageShell';
import Reveal from '@/components/Reveal';
import { works, streamImages } from '@/lib/data';

const streams: { key: 'write' | 'build'; en: string; zh: string; desc: string }[] = [
  {
    key: 'write',
    en: 'Write',
    zh: '写作',
    desc: '长篇小说与短篇随笔——以年为单位的长跑，以页为单位的呼吸。',
  },
  {
    key: 'build',
    en: 'Build',
    zh: '造物',
    desc: '数字产品与界面概念——把想法变成可以呼吸的秩序。',
  },
];

export default function Works() {
  return (
    <PageShell>
      <Reveal>
        <p className="text-[10px] md:text-[11px] tracking-[0.4em] text-faint uppercase mb-6">
          Works — 作品
        </p>
        <h1 className="font-serif font-light text-5xl md:text-7xl leading-[1.05]">
          两条河流
        </h1>
        <p className="mt-8 max-w-xl text-sm md:text-base leading-loose text-mist">
          写作与造物。它们气质不同——一条缓慢、私人；一条精确、公共——却从同一种执念里流出来。
        </p>
      </Reveal>

      {/* two streams */}
      <div className="mt-20 md:mt-28 grid md:grid-cols-2 gap-16 md:gap-10">
        {streams.map((s, i) => {
          const list = works.filter((w) => w.stream === s.key);
          return (
            <Reveal key={s.key} delay={i * 0.08}>
              <div className="group relative rounded-xl overflow-hidden border border-white/8">
                <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden">
                  <img
                    src={streamImages[s.key]}
                    alt={`${s.zh} ${s.en}`}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-95 transition-opacity duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-void/30 to-transparent" />
                </div>
                <div className="relative -mt-32 md:-mt-40 px-7 md:px-9 pb-9">
                  <p className="text-[10px] tracking-[0.4em] text-faint uppercase">{s.en}</p>
                  <h2 className="font-serif text-4xl md:text-5xl font-light mt-2">{s.zh}</h2>
                  <p className="mt-4 text-sm leading-loose text-mist max-w-sm">{s.desc}</p>

                  <div className="mt-8 flex flex-col">
                    {list.map((w) => (
                      <Link
                        key={w.slug}
                        to={`/work/${w.slug}`}
                        className="group/row flex items-baseline gap-4 py-4 border-t hairline min-h-[44px]"
                      >
                        <span className="font-serif text-xl md:text-2xl text-pearl group-hover/row:text-petal transition-colors duration-400">
                          {w.title}
                        </span>
                        <span className="ml-auto text-[10px] tracking-[0.2em] text-faint">
                          {w.status}
                        </span>
                        <span
                          aria-hidden="true"
                          className="text-mist group-hover/row:translate-x-1 group-hover/row:text-petal transition-all duration-400"
                        >
                          →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* other streams link out */}
      <Reveal delay={0.1}>
        <div className="mt-16 md:mt-20 flex flex-wrap gap-x-12 gap-y-4 border-t hairline pt-8">
          <span className="text-[10px] tracking-[0.3em] text-faint uppercase pt-2">Also —</span>
          <Link to="/work/freeframe-studio" className="text-sm text-mist hover:text-petal transition-colors min-h-[44px] inline-flex items-center">
            Produce · FreeFrame Studio →
          </Link>
          <Link to="/work/collection" className="text-sm text-mist hover:text-petal transition-colors min-h-[44px] inline-flex items-center">
            Collect · 旧物收藏档案 →
          </Link>
        </div>
      </Reveal>
    </PageShell>
  );
}
