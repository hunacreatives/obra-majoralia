import { Link, useLocation } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';

export default function NotFound() {
  const location = useLocation();

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="relative w-full h-[100svh] overflow-hidden" data-theme="dark">
        <img
          src="/images/thumbs-1600/loboc-performing-arts/perspective-20.webp"
          alt="House of Song, Loboc Performing Arts Center"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#383838]/80 via-[#383838]/25 to-[#383838]/10" />

        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 pb-[max(2.5rem,env(safe-area-inset-bottom))] md:pb-16">
          <p
            className="text-[11px] tracking-[2px] text-[#e4e3e2] uppercase mb-5"
          >
            404 · {location.pathname}
          </p>
          <h1
            className="font-bold text-display text-white mb-8 md:mb-10"
          >
            This page
            <br />
            doesn&apos;t exist.
          </h1>
          <div className="flex items-center gap-8 -my-3">
            <Link
              to="/projects"
              className="group flex items-center gap-3 py-3 text-[12px] md:text-[13px] tracking-[2px] text-white uppercase"
            >
              See the projects
              <span className="block h-px bg-white/60 w-6 group-hover:w-12 transition-all duration-500 ease-out" />
            </Link>
            <Link
              to="/home"
              className="py-3 text-[12px] md:text-[13px] tracking-[2px] text-[#e4e3e2] hover:text-white uppercase transition-colors duration-300"
            >
              Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
