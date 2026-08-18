import { Link } from 'react-router-dom';
import PageShell from '@/components/PageShell';
import FlowerMark from '@/components/FlowerMark';
import Reveal from '@/components/Reveal';

export default function NotFound() {
  return (
    <PageShell className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <Reveal>
        <div className="flex flex-col items-center gap-6">
          <span className="text-petal">
            <FlowerMark size={52} />
          </span>
          <h1 className="font-serif font-light text-6xl md:text-7xl">404</h1>
          <p className="text-mist tracking-[0.2em] text-sm">这一页还没有生长出来。</p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-3 min-h-[44px] text-sm tracking-[0.2em] text-pearl hover:text-petal transition-colors"
          >
            返回首页 <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Reveal>
    </PageShell>
  );
}
