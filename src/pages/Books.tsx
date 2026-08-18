import { Link } from 'react-router-dom';
import PageShell from '@/components/PageShell';
import Reveal from '@/components/Reveal';
import { books } from '@/lib/data';

export default function Books() {
  const featured = books.find((b) => b.featured) ?? books[0];
  const rest = books.filter((b) => !b.featured);

  const Cover = ({
    book,
    className,
    eager = false,
  }: {
    book: (typeof books)[number];
    className?: string;
    eager?: boolean;
  }) => {
    const inner = (
      <img
        src={book.cover}
        alt={`${book.title} 封面`}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className="w-full h-full object-cover"
      />
    );

    if (book.to) {
      return (
        <Link
          to={book.to}
          data-cursor="view"
          className={`block relative rounded-md overflow-hidden border border-white/8 group ${className ?? ''}`}
        >
          {inner}
          <span className="absolute inset-0 bg-void/0 group-hover:bg-void/0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>
      );
    }
    return (
      <div className={`relative rounded-md overflow-hidden border border-white/8 ${className ?? ''}`}>
        {inner}
      </div>
    );
  };

  return (
    <PageShell>
      <Reveal>
        <p className="text-[10px] md:text-[11px] tracking-[0.4em] text-faint uppercase mb-6">
          Books — 长篇书籍
        </p>
        <h1 className="font-serif font-light text-5xl md:text-7xl leading-[1.05]">
          以年为单位的
          <br />
          长跑
        </h1>
      </Reveal>

      {/* featured editorial */}
      <div className="mt-20 md:mt-28 grid md:grid-cols-[minmax(0,420px)_1fr] gap-12 md:gap-20 items-center">
        <Reveal>
          <div className="group relative">
            <Cover book={featured} className="aspect-[3/4] w-full max-w-sm group-hover:-translate-y-2 transition-transform duration-700 ease-out" eager />
            <span
              aria-hidden="true"
              className="absolute -inset-2 rounded-lg border border-petal/0 group-hover:border-petal/20 transition-colors duration-700 -z-10"
            />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-[10px] tracking-[0.3em] text-violet uppercase mb-5">
            {featured.status}
          </p>
          <h2 className="font-serif text-4xl md:text-6xl font-light leading-tight">
            {featured.title}
          </h2>
          <p className="mt-2 text-xs tracking-[0.24em] text-faint uppercase">{featured.titleEn}</p>
          <p className="mt-8 max-w-lg text-sm md:text-base leading-loose text-mist">
            {featured.desc}
          </p>
          <Link
            to={featured.to ?? '/works'}
            className="group inline-flex items-center gap-3 mt-10 min-h-[44px]"
          >
            <span className="w-12 h-12 rounded-full bg-violet text-void flex items-center justify-center transition-transform duration-500 ease-out group-hover:translate-x-1">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M3 9h11M9.5 4.5L14 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </span>
            <span className="text-sm tracking-[0.2em] text-pearl">阅读手记</span>
          </Link>
        </Reveal>
      </div>

      {/* the rest — different rhythm */}
      <div className="mt-24 md:mt-36">
        <Reveal>
          <p className="text-[10px] md:text-[11px] tracking-[0.4em] text-faint uppercase mb-10">
            Also on the shelf — 书架上
          </p>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-10 md:gap-16">
          {rest.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.07}>
              <div className="flex gap-7 md:gap-9">
                <Cover book={b} className="w-32 md:w-40 shrink-0 aspect-[3/4] hover:-translate-y-1.5 transition-transform duration-700 ease-out" />
                <div className="pt-2">
                  <p className="text-[10px] tracking-[0.26em] text-faint uppercase mb-3">
                    {b.status}
                  </p>
                  <h3 className="font-serif text-2xl md:text-3xl font-light">{b.title}</h3>
                  <p className="mt-1 text-[10px] tracking-[0.2em] text-faint uppercase">
                    {b.titleEn}
                  </p>
                  <p className="mt-5 text-sm leading-loose text-mist max-w-xs">{b.desc}</p>
                  {b.to && (
                    <Link
                      to={b.to}
                      className="inline-flex items-center gap-2 mt-5 text-xs tracking-[0.22em] text-petal/90 hover:text-petal transition-colors min-h-[44px]"
                    >
                      手记 <span aria-hidden="true">→</span>
                    </Link>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
