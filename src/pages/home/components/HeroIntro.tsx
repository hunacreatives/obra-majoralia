import { useEffect, useState } from 'react';
import { Project } from '@/mocks/projects';
import CinematicHero from './CinematicHero';
import HeroSlideshow from './HeroSlideshow';

interface HeroIntroProps {
  projects: Project[];
}

// Let the cinematic intro's own animations (title, tagline, callout, awards)
// fully settle — and actually be read — before it dissolves into the
// slideshow underneath.
const HERO_HOLD_MS = 4800;
const HERO_FADE_MS = 2000;

/**
 * The homepage hero: CinematicHero plays its full intro once, then fades
 * away to reveal HeroSlideshow already running beneath it — so what looks
 * like one continuous opening becomes the first browsable slide.
 */
const HeroIntro = ({ projects }: HeroIntroProps) => {
  const [introVisible, setIntroVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIntroVisible(false), HERO_HOLD_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative isolate w-full h-[100svh] overflow-hidden">
      <HeroSlideshow projects={projects} autoplay={!introVisible} />

      <div
        className="absolute inset-0 z-50"
        style={{
          opacity: introVisible ? 1 : 0,
          transition: `opacity ${HERO_FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
          pointerEvents: introVisible ? 'auto' : 'none',
        }}
      >
        <CinematicHero />
      </div>
    </div>
  );
};

export default HeroIntro;
