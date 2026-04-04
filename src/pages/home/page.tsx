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

    <Footer />
  </main>
);

export default HomePage;