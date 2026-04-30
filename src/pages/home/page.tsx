import { Link } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import FadeIn from '@/components/base/FadeIn';
import HeroSlideshow from './components/HeroSlideshow';
import ProjectGrid from './components/ProjectGrid';
import TypologySection from './components/TypologySection';
import { projects } from '@/mocks/projects';

const HomePage = () => (
  <main className="min-h-screen bg-white">
    <Navbar />

    {/* 1. Full-screen hero slideshow — all projects */}
    <HeroSlideshow projects={projects} />

    {/* 2. Studio intro — white section */}
    <section className="w-full px-6 md:px-16 lg:px-24 py-12 md:py-20">
      <FadeIn>
        <div className="max-w-2xl mx-auto text-center">
          <p
            className="text-lg md:text-2xl text-[#383838] leading-[1.8] md:leading-[2] tracking-[0.2px]"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            A future-driven architecture studio,{' '}
            <strong>Obra Majoralia</strong> designs meaningful spaces rooted in
            place, culture, and human experience.
          </p>
        </div>
      </FadeIn>
    </section>

    {/* 3. Typology section */}
    <TypologySection />

    {/* 4. Project grid */}
    <ProjectGrid />

    {/* 5. OBRAverse teaser */}
    <section className="px-8 md:px-14 py-6 md:py-8">
      <FadeIn direction="none">
        <Link
          to="/obraverse"
          className="group flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.13)] transition-shadow duration-500"
          style={{ height: '480px' }}
        >
          {/* Left — text */}
          <div className="flex flex-col justify-between px-10 md:px-14 py-12 md:py-14 md:w-[28%] shrink-0 bg-white">
            <div className="flex flex-col gap-4">
              <div className="flex items-baseline leading-none">
                <span
                  className="text-[36px] md:text-[44px] tracking-[-1.5px] text-[#383838] font-bold"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  OBRA
                </span>
                <span
                  className="text-[36px] md:text-[44px] tracking-[-1.5px] text-[#383838] font-bold italic"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  verse
                </span>
              </div>
              <p
                className="text-[13px] tracking-[0.5px] text-[#797979] leading-relaxed max-w-[200px]"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Discover our built work on an interactive map of the Philippines.
              </p>
            </div>
            <span
              className="inline-flex items-center gap-2 text-[11px] tracking-[3px] text-[#383838] uppercase border-b border-transparent group-hover:border-[#383838] transition-all duration-300"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              EXPLORE
              <svg className="w-3 h-3 translate-x-0 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 12 12" fill="none">
                <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>

          {/* Right — map image */}
          <div className="flex-1 overflow-hidden h-full">
            <img
              src="/images/obraverse.png"
              alt="OBRAverse map"
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.02]"
            />
          </div>
        </Link>
      </FadeIn>
    </section>

    <Footer />
  </main>
);

export default HomePage;