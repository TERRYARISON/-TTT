import { useRef, useState } from 'react';
import PageShell from '@/components/PageShell';
import Reveal from '@/components/Reveal';
import { contact } from '@/lib/data';

/** Copy-to-clipboard row with ~2s 「已复制」 feedback. */
function CopyRow({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      /* clipboard unavailable — select-based fallback */
      const ta = document.createElement('textarea');
      ta.value = value;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3 py-8 md:py-10 border-b hairline">
      <span className="w-28 text-[10px] tracking-[0.3em] text-faint uppercase pt-2">{label}</span>
      <span className="font-serif text-2xl md:text-4xl font-light text-pearl">{value}</span>
      <button
        type="button"
        onClick={copy}
        className="ml-auto text-[11px] tracking-[0.24em] text-mist hover:text-petal transition-colors duration-300 border border-white/12 rounded-full px-5 py-2.5 min-h-[44px]"
        aria-live="polite"
      >
        {copied ? (
          <span className="text-petal">已复制 ✓</span>
        ) : (
          '复制'
        )}
      </button>
    </div>
  );
}

export default function Contact() {
  return (
    <PageShell className="max-w-5xl">
      <Reveal>
        <p className="text-[10px] md:text-[11px] tracking-[0.4em] text-faint uppercase mb-6">
          Contact — 联系
        </p>
        <h1 className="font-serif font-light text-5xl md:text-7xl leading-[1.05]">
          期待与你共事
        </h1>
        <p className="mt-8 max-w-xl text-sm md:text-base leading-loose text-mist">
          {contact.collabNote}
        </p>
      </Reveal>

      <div className="mt-16 md:mt-24">
        <Reveal delay={0.05}>
          <a
            href={`mailto:${contact.email}`}
            className="group flex flex-wrap items-baseline gap-x-8 gap-y-3 py-8 md:py-10 border-b hairline"
          >
            <span className="w-28 text-[10px] tracking-[0.3em] text-faint uppercase pt-2">Email</span>
            <span className="font-serif text-2xl md:text-4xl font-light text-pearl group-hover:text-petal transition-colors duration-500">
              {contact.email}
            </span>
            <span
              aria-hidden="true"
              className="ml-auto text-mist group-hover:translate-x-1 group-hover:text-petal transition-all duration-500"
            >
              →
            </span>
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <CopyRow label="WeChat 微信" value={contact.wechat} />
        </Reveal>
        <Reveal delay={0.14}>
          <CopyRow label="Line" value={contact.line} />
        </Reveal>

        <Reveal delay={0.18}>
          <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3 py-8 md:py-10 border-b hairline">
            <span className="w-28 text-[10px] tracking-[0.3em] text-faint uppercase pt-2">
              Location
            </span>
            <span className="font-serif text-2xl md:text-4xl font-light text-pearl">
              {contact.location}
            </span>
            <span className="ml-auto text-[11px] tracking-[0.2em] text-faint">
              {contact.locationEn}
            </span>
          </div>
        </Reveal>
      </div>
    </PageShell>
  );
}
