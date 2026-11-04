import { useEffect, useRef, useState } from 'react';

interface Item { label: string; formula: string; body: string }

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

// One column: the numeral rises out of a mask, the rule draws across, then
// the text follows. Hover darkens the numeral.
const Column = ({ item, n, on }: { item: Item; n: number; on: boolean }) => (
  <li className="group flex flex-col">
    <span className="block overflow-hidden">
      <span
        className="block text-[48px] md:text-[64px] leading-none tracking-[-0.03em] font-bold text-[#e4e3e2] group-hover:text-[#797979] transition-colors duration-500"
        style={{ transform: on ? 'translateY(0)' : 'translateY(105%)', transition: `transform 600ms ${EASE}, color 500ms ease` }}
      >
        {n}
      </span>
    </span>
    <span
      className="block h-px bg-[#383838] mt-3 md:mt-4 mb-5 md:mb-6 origin-left"
      style={{ transform: on ? 'scaleX(1)' : 'scaleX(0)', transition: `transform 600ms ${EASE} 100ms` }}
    />
    <div
      style={{
        opacity: on ? 1 : 0,
        transform: on ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 450ms ease 200ms, transform 500ms ${EASE} 200ms`,
      }}
    >
      <p className="text-[13px] font-bold tracking-[1.5px] text-[#383838] uppercase">{item.label}</p>
      <p className="mt-2 md:mt-3 font-bold text-[19px] md:text-[22px] leading-[1.2] tracking-[-0.02em] text-[#383838] [text-wrap:balance]">{item.formula}</p>
      <p className="mt-3 md:mt-4 text-[14px] leading-[1.6] text-[#797979] max-w-[34rem]">{item.body}</p>
    </div>
  </li>
);

// "Form follows formula": the columns appear 1 → 2 → 3 on their own, fast, once
// the section reaches mid-screen. Same on every width, so a phone never shows a
// heading above blank space waiting for the next column to be scrolled to.
const FormulaSequence = ({ items }: { items: Item[] }) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) { setShown(items.length); return; }
    const el = outerRef.current;
    if (!el) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      for (let i = 0; i < items.length; i++) timers.push(setTimeout(() => setShown(prev => Math.max(prev, i + 1)), i * 150));
    }, { rootMargin: '0px 0px -50% 0px', threshold: 0 }); // fires when the section's top reaches mid-screen
    io.observe(el);
    return () => { io.disconnect(); timers.forEach(clearTimeout); };
  }, [items.length]);

  const inner = (
    <div className="px-6 md:px-16 lg:px-20 py-16 md:py-24 w-full">
      <h2 className="font-bold text-heading text-[#383838] mb-10 md:mb-14">
        Form follows <span className="text-[#797979]">formula</span>
      </h2>
      <ol className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-14 lg:gap-16">
        {items.map((item, i) => (
          <Column key={item.label} item={item} n={i + 1} on={shown > i} />
        ))}
      </ol>
    </div>
  );

  return <div ref={outerRef} className="border-b border-[#e4e3e2]">{inner}</div>;
};

export default FormulaSequence;
