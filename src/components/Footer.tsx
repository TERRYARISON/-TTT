import { Link } from 'react-router-dom';
import FlowerMark from './FlowerMark';
import { footerNav, contact } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="relative border-t hairline mt-28 md:mt-40">
      <div className="px-5 md:px-10 lg:px-16 py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <div className="flex items-center gap-3 text-petal">
              <FlowerMark size={30} />
              <span className="font-serif text-2xl md:text-3xl tracking-wide text-pearl">郑超</span>
            </div>
            <p className="mt-4 text-xs tracking-[0.3em] text-faint uppercase">Zheng Chao · Terry Arison</p>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-mist">
              造物、旧物与其他执念。<span className="text-faint">All of this is me. None of it is all of me.</span>
            </p>
          </div>

          <nav aria-label="页脚导航" className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm md:text-right">
            {footerNav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-mist hover:text-pearl transition-colors duration-300 py-1"
              >
                {item.zh}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-14 pt-6 border-t hairline flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <a
            href={`mailto:${contact.email}`}
            className="text-sm text-mist hover:text-petal transition-colors"
          >
            {contact.email}
          </a>
          <p className="text-[11px] tracking-[0.18em] text-faint">
            © {new Date().getFullYear()} Zheng Chao · FreeFrame Studio
          </p>
        </div>
      </div>
    </footer>
  );
}
