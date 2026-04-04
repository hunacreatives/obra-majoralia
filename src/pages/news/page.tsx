import { useState } from 'react';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import FadeIn from '@/components/base/FadeIn';
import { newsItems, NewsCategory } from '@/mocks/news';

type Filter = 'All' | NewsCategory;

const FILTERS: Filter[] = ['All', 'Recognition', 'Event', 'Awards', 'Talk'];

const NewsPage = () => {
  const [active, setActive] = useState<Filter>('All');

  const filtered = active === 'All'
    ? newsItems
    : newsItems.filter(n => n.category === active);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div style={{ height: '80px' }} />

      {/* Page title */}
      <div className="px-10 md:px-16 lg:px-20 pt-10 pb-6 border-b border-[#e4e3e2]">
        <h1
          className="text-[42px] md:text-[56px] lg:text-[68px] leading-none tracking-[-2px] text-[#383838] font-bold"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          News
        </h1>
      </div>

      {/* Filter bar — same padding as title */}
      <div className="border-b border-[#e4e3e2] px-10 md:px-16 lg:px-20 py-4 flex justify-end">
        <div className="flex items-center gap-6 md:gap-8 flex-wrap">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={[
                'text-[11px] tracking-[2px] transition-colors duration-200 whitespace-nowrap cursor-pointer pb-[2px]',
                active === f
                  ? 'text-[#383838] border-b border-[#383838]'
                  : 'text-[#c8c7c6] hover:text-[#797979]',
              ].join(' ')}
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {f === 'All' ? 'ALL NEWS' : f.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* News grid — 2 columns, aligned with title */}
      <section className="px-10 md:px-16 lg:px-20 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-0">
          {filtered.map((item, i) => (
            <FadeIn key={item.id} delay={i * 40}>
              <article className="flex gap-6 py-8 border-b border-[#e4e3e2] group cursor-pointer">

                {/* Thumbnail */}
                <div className="shrink-0 w-[160px] h-[120px] overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between flex-1 min-w-0">
                  <div>
                    {/* Category + Date */}
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="text-[11px] tracking-[2px] text-[#797979] uppercase font-medium"
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        {item.category}
                      </span>
                      <span
                        className="text-[11px] tracking-[1px] text-[#c8c7c6]"
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        {item.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h2
                      className="text-[17px] md:text-[19px] text-[#383838] leading-[1.5] tracking-[-0.2px] group-hover:text-[#797979] transition-colors duration-200 font-semibold"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {item.title}
                    </h2>
                  </div>

                  {/* Read More */}
                  <div className="mt-4">
                    <span
                      className="inline-block text-[10px] tracking-[2px] text-[#797979] group-hover:text-[#383838] group-hover:border-[#383838] transition-colors duration-200 uppercase border border-[#d0d0d0] rounded-full px-4 py-[6px] whitespace-nowrap"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      Read More
                    </span>
                  </div>
                </div>

              </article>
            </FadeIn>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-24 text-center">
            <p
              className="text-[11px] tracking-[3px] text-[#c8c7c6]"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              NO ARTICLES IN THIS CATEGORY
            </p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
};

export default NewsPage;
