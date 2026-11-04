import { Link } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import FadeIn from '@/components/base/FadeIn';
import HeroIntro from './components/HeroIntro';
import ProjectGrid from './components/ProjectGrid';
import TypologySection from './components/TypologySection';
import CtaBand from '@/components/feature/CtaBand';
import DrawingToRender from '@/components/feature/DrawingToRender';
import { heroProjects } from './featured';

const HomePage = () => (
  <main className="min-h-screen bg-white">
    <Navbar />

    {/* 1. Cinematic intro, then it dissolves into the flagship slideshow */}
    <HeroIntro projects={heroProjects} />

    {/* 2. Studio statement — card: copy on the left, House of Song on the right,
        developing from line drawing to render */}
    <section className="w-full px-6 md:px-16 lg:px-24 py-10 md:py-24">
      <FadeIn direction="none">
        <Link
          to="/about"
          className="group flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(56,56,56,0.10)] hover:shadow-[0_16px_48px_rgba(56,56,56,0.16)] transition-shadow duration-500 md:h-[480px]"
        >
          <div className="flex flex-col justify-between gap-6 md:gap-10 px-6 md:px-9 lg:px-14 py-7 md:py-12 lg:py-14 md:w-[55%] lg:w-1/2 shrink-0">
            <div className="flex flex-col gap-4 md:gap-5">
              <p className="font-bold text-[#383838] text-[clamp(24px,2.5vw,38px)] leading-[1.08] tracking-[-0.025em] [text-wrap:balance]">
                Architecture is for the <span className="text-[#797979] whitespace-nowrap">End Users,</span> not for the Designers.
              </p>
              <p className="text-[15px] leading-[1.6] text-[#797979] [text-wrap:pretty]">
                Rooted in a deep understanding of context — the culture, history, and aspirations
                of the people and places they design for.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 text-[13px] tracking-[2px] text-[#383838] uppercase">
              About the studio
              <i className="ri-arrow-right-line text-[15px] transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>

          {/* the drawing develops into the actual render as the card reaches mid-screen */}
          <DrawingToRender
            drawing="/images/about/loboc-drawing-card.webp"
            render="/images/about/loboc-render-card.webp"
            alt="House of Song, Loboc — from line drawing to render"
            focusX={0.5}
            focusY={0.9}
            small={{
              drawing: '/images/about/loboc-drawing-card-sm.webp',
              render: '/images/about/loboc-render-card-sm.webp',
              focusX: 0.42,
              focusY: 0.7,
            }}
            className="aspect-[16/9] md:aspect-auto md:flex-1"
          />
        </Link>
      </FadeIn>
    </section>

    {/* 3. Selected work */}
    <ProjectGrid />

    {/* 4. Typologies */}
    <TypologySection />

    {/* 5. OBRAverse — full bleed */}
    <Link to="/obraverse" className="group relative block w-full overflow-hidden aspect-[4/3] md:aspect-[21/9]" data-theme="dark">
      <img
        src="/images/obraverse/cta.webp"
        alt="OBRAverse map"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
      />
      {/* darker overall, darkest behind the text, so "Interactive map" and OBRAverse read clearly */}
      <div className="absolute inset-0 bg-[#383838]/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#383838]/90 via-[#383838]/45 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 lg:px-24 pb-6 md:pb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-3 md:gap-5">
        <div className="flex flex-col gap-3">
          <p className="text-[12px] md:text-[13px] font-bold tracking-[2px] text-white uppercase">Interactive map</p>
          <h2 className="text-heading text-white" style={{ fontFamily: 'var(--font-display)' }}>
            <span className="font-bold">OBRA</span><span className="font-thin">verse</span>
          </h2>
          <p className="hidden md:block text-[15px] text-[#e4e3e2] max-w-sm leading-relaxed">
            Discover our work on an interactive map.
          </p>
        </div>
        <span className="flex items-center gap-3 text-[12px] tracking-[2px] text-white uppercase whitespace-nowrap">
          Explore the map
          <span className="block h-px bg-white w-6 group-hover:w-12 transition-all duration-500 ease-out" />
        </span>
      </div>
    </Link>

    {/* 6. CTA band */}
    <CtaBand />

    <Footer />
  </main>
);

export default HomePage;
