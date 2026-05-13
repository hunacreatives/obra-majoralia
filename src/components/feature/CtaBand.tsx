import { Link } from 'react-router-dom';

const CtaBand = () => (
  <section className="bg-[#1a1a1a]">
    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
      <div className="px-10 md:px-16 lg:px-20 py-14 md:py-20 flex flex-col gap-5">
        <p
          className="text-[40px] md:text-[56px] lg:text-[64px] font-bold leading-[1.0] tracking-[-2px] text-white"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          Have something
          <br />
          <span className="italic font-normal text-white/40">in mind?</span>
        </p>
        <p className="text-base text-white/40 leading-loose max-w-xs" style={{ fontFamily: 'var(--font-sans)' }}>
          We'd love to hear about your project. Reach out and let's start a conversation.
        </p>
        <Link
          to="/contact"
          className="mt-1 flex items-center gap-3 group w-fit cursor-pointer"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          <span className="text-[12px] tracking-[3px] font-bold text-white uppercase whitespace-nowrap group-hover:text-white/50 transition-colors duration-200">
            GET IN TOUCH
          </span>
          <span className="w-8 h-px bg-white/30 group-hover:w-16 transition-all duration-300" />
        </Link>
      </div>

      <div className="px-10 md:px-16 lg:px-20 py-14 md:py-20 flex flex-col gap-5">
        <p
          className="text-[40px] md:text-[56px] lg:text-[64px] font-bold leading-[1.0] tracking-[-2px] text-white"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          Always looking
          <br />
          <span className="italic font-normal text-white/40">for talent.</span>
        </p>
        <p className="text-base text-white/40 leading-loose max-w-xs" style={{ fontFamily: 'var(--font-sans)' }}>
          If you aspire to be part of the team, send your portfolio and let's see where it goes.
        </p>
        <Link
          to="/careers"
          className="mt-1 flex items-center gap-3 group w-fit cursor-pointer"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          <span className="text-[12px] tracking-[3px] font-bold text-white uppercase whitespace-nowrap group-hover:text-white/50 transition-colors duration-200">
            VIEW OPEN POSITIONS
          </span>
          <span className="w-8 h-px bg-white/30 group-hover:w-16 transition-all duration-300" />
        </Link>
      </div>
    </div>
  </section>
);

export default CtaBand;
