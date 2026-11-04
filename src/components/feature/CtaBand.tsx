import { Link } from 'react-router-dom';

// #1a1a1a by client request: a step darker than the #383838 footer below it
const CtaBand = () => (
  <section className="bg-[#1a1a1a]">
    <div className="grid grid-cols-1 min-[560px]:grid-cols-2 divide-y min-[560px]:divide-y-0 min-[560px]:divide-x divide-white/10">
      <div className="px-6 min-[560px]:px-8 md:px-16 lg:px-20 py-8 min-[560px]:py-10 md:py-20 flex flex-col gap-3 md:gap-5">
        <p
          className="font-bold text-white text-[24px] leading-[1.1] tracking-[-0.025em] sm:text-[26px] md:text-heading"
        >
          Have something
          <br />
          <span className="text-[#e4e3e2]">in mind?</span>
        </p>
        <p className="text-[13px] sm:text-sm md:text-base text-[#e4e3e2] leading-[1.6] max-w-xs [text-wrap:pretty]">
          We'd love to hear about your project. Reach out and let's start a conversation.
        </p>
        <Link
          to="/contact"
          className="-mt-2 -mb-3 py-3 flex items-center gap-3 group w-fit cursor-pointer"
        >
          <span className="text-[12px] tracking-[2px] font-bold text-white uppercase whitespace-nowrap group-hover:text-[#e4e3e2] transition-colors duration-200">
            GET IN TOUCH
          </span>
          <span className="w-8 h-px bg-white/30 group-hover:w-16 transition-all duration-300" />
        </Link>
      </div>

      <div className="px-6 min-[560px]:px-8 md:px-16 lg:px-20 py-8 min-[560px]:py-10 md:py-20 flex flex-col gap-3 md:gap-5">
        <p
          className="font-bold text-white text-[24px] leading-[1.1] tracking-[-0.025em] sm:text-[26px] md:text-heading"
        >
          Always looking
          <br />
          <span className="text-[#e4e3e2]">for talent.</span>
        </p>
        <p className="text-[13px] sm:text-sm md:text-base text-[#e4e3e2] leading-[1.6] max-w-xs [text-wrap:pretty]">
          If you aspire to be part of the team, send your portfolio and let's see where it goes.
        </p>
        <Link
          to="/careers"
          className="-mt-2 -mb-3 py-3 flex items-center gap-3 group w-fit cursor-pointer"
        >
          <span className="text-[12px] tracking-[2px] font-bold text-white uppercase whitespace-nowrap group-hover:text-[#e4e3e2] transition-colors duration-200">
            VIEW OPEN POSITIONS
          </span>
          <span className="w-8 h-px bg-white/30 group-hover:w-16 transition-all duration-300" />
        </Link>
      </div>
    </div>
  </section>
);

export default CtaBand;
