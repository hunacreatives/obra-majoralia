import { useState } from 'react';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';

type SortMode = 'date' | 'alpha';

const ObraversePage = () => {
  const [sort, setSort] = useState<SortMode>('date');
  const [search, setSearch] = useState('');

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Spacer to push content below fixed navbar */}
      <div style={{ height: '80px' }} />

      {/* Filter bar — sticky, solid white, stays put when scrolling */}
      <div className="sticky top-0 z-30 bg-white border-b border-[#e4e3e2]">
        <div className="flex items-center justify-between px-6 md:px-10 py-3">

          {/* Left: OBRAverse wordmark */}
          <div className="flex items-baseline">
            <span
              className="text-[42px] md:text-[56px] lg:text-[68px] leading-none tracking-[-2px] text-[#383838] font-bold"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              OBRA
            </span>
            <span
              className="text-[42px] md:text-[56px] lg:text-[68px] leading-none tracking-[-2px] text-[#383838] font-bold"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              verse
            </span>
          </div>

          {/* Right: sort + pill search */}
          <div className="flex items-center gap-5 md:gap-7">
            <button
              onClick={() => setSort('date')}
              className={[
                'text-[9px] tracking-[2.5px] transition-colors duration-200 whitespace-nowrap cursor-pointer',
                sort === 'date' ? 'text-[#383838]' : 'text-[#c8c7c6] hover:text-[#797979]',
              ].join(' ')}
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              DATE &uarr;
            </button>
            <button
              onClick={() => setSort('alpha')}
              className={[
                'text-[9px] tracking-[2.5px] transition-colors duration-200 whitespace-nowrap cursor-pointer',
                sort === 'alpha' ? 'text-[#383838]' : 'text-[#c8c7c6] hover:text-[#797979]',
              ].join(' ')}
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              ALPHABETICAL
            </button>

            {/* Pill search */}
            <div className="flex items-center gap-2 border border-[#e4e3e2] rounded-full px-4 py-[6px]">
              <i className="ri-search-line text-[10px] text-[#aaa]" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="SEARCH"
                className="text-[9px] tracking-[2px] bg-transparent border-none outline-none placeholder-[#c8c7c6] text-[#383838] w-20 md:w-28"
                style={{ fontFamily: 'var(--font-sans)' }}
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="w-4 h-4 flex items-center justify-center text-[#c8c7c6] hover:text-[#383838] transition-colors duration-150 cursor-pointer"
                >
                  <i className="ri-close-line text-[10px]" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <img
        src="/images/obraverse.png"
        alt="OBRAverse map"
        className="w-full h-auto block"
      />

      {/* CTA below map */}
      <div className="w-full bg-[#f7f6f5] border-t border-[#e4e3e2] py-20 px-10 md:px-20">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start lg:items-stretch justify-between gap-10">

          {/* Left — copy */}
          <div className="flex flex-col gap-4 max-w-lg">
            <h2
              className="text-[28px] md:text-[34px] tracking-[-0.5px] text-[#383838] leading-tight"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Work with us — and your project becomes part of <strong>OBRAverse</strong>.
            </h2>
            <p
              className="text-[13px] text-[#797979] leading-relaxed"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Every project on this map was designed by OBRA Majoralia. Commission a project with us and it earns its place here — a permanent record of built work across&nbsp;the&nbsp;Philippines.
            </p>
          </div>

          {/* Right — two buttons stacked, vertically centered to copy block */}
          <div className="flex flex-col gap-3 shrink-0 justify-center">
            <a
              href="/contact"
              className="border border-[#383838] bg-[#383838] text-white px-10 py-3 text-[9px] tracking-[3px] hover:bg-transparent hover:text-[#383838] transition-all duration-300 cursor-pointer text-center rounded-full whitespace-nowrap"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              START A PROJECT
            </a>
            <a
              href="/projects"
              className="border border-[#d4d3d2] text-[#797979] px-10 py-3 text-[9px] tracking-[3px] hover:border-[#383838] hover:text-[#383838] transition-all duration-300 cursor-pointer text-center rounded-full whitespace-nowrap"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              VIEW ALL PROJECTS
            </a>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
};

export default ObraversePage;
