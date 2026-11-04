import { Link } from 'react-router-dom';
import FadeIn from '@/components/base/FadeIn';
import { projects } from '@/mocks/projects';
import { sizedImage } from '@/components/base/sizedImage';

// Typologies with their project counts, most projects first; the preview is
// the cover of the first project in each.
const typologies = Object.values(
  projects.reduce<Record<string, { label: string; count: number; image: string }>>((acc, p) => {
    acc[p.typology] ??= { label: p.typology, count: 0, image: p.imageUrl };
    acc[p.typology].count++;
    return acc;
  }, {}),
).sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));

const TypologySection = () => (
  <section className="w-full px-6 md:px-16 lg:px-24 pb-14 md:pb-28">
    <FadeIn>
      <p className="text-[11px] tracking-[2px] text-[#797979] uppercase mb-4 md:mb-10">
        Typologies
      </p>
    </FadeIn>

    <ul className="border-t border-[#e4e3e2]">
      {typologies.map((t, i) => (
        <li key={t.label}>
          <FadeIn delay={i * 50} direction="none">
            <Link
              to={`/projects?typology=${encodeURIComponent(t.label)}`}
              className="group relative grid grid-cols-[1.25rem_1fr_auto] md:grid-cols-[4rem_1fr_auto] items-center gap-3 md:gap-6 py-4 md:py-6 border-b border-[#e4e3e2]"
            >
              <span className="text-[11px] tracking-[2px] text-[#797979]">
                {i + 1}
              </span>
              <span
                className="font-bold text-[24px] md:text-[38px] lg:text-[44px] leading-none tracking-[-0.03em] text-[#383838] group-hover:translate-x-2 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              >
                {t.label}
              </span>
              <span className="flex items-center gap-4 md:gap-6">
                <span className="text-[10px] md:text-[11px] tracking-[2px] text-[#797979] uppercase whitespace-nowrap">
                  {t.count} {t.count === 1 ? 'project' : 'projects'}
                </span>
                <i className="ri-arrow-right-line text-[16px] text-[#383838] group-hover:translate-x-1 transition-transform duration-300" />
              </span>

              {/* desktop: a glimpse of the work, fading in beside the row */}
              <img
                src={sizedImage(t.image)}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="hidden lg:block absolute right-48 top-1/2 -translate-y-1/2 w-44 aspect-[4/3] object-cover opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none"
              />
            </Link>
          </FadeIn>
        </li>
      ))}
    </ul>
  </section>
);

export default TypologySection;
