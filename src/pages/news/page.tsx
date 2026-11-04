import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import FadeIn from '@/components/base/FadeIn';
import { newsItems } from '@/mocks/news';

// The story that leads the page, with one of the studio's own images (not a
// hotlinked press photo). Everything else is listed newest first below it.
const FEATURED_ID = 'house-of-song-loboc';
const FEATURED_IMAGE = '/images/thumbs-1600/loboc-performing-arts/perspective-20.webp';

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
// "NOV 3, 2024" → sortable number
const dateValue = (d: string) => {
  const [mon, day, year] = d.replace(',', '').split(' ');
  return Number(year) * 10000 + (MONTHS.indexOf(mon.toUpperCase()) + 1) * 100 + Number(day);
};

const source = (url?: string) => {
  if (!url) return '';
  const host = new URL(url).hostname.replace(/^www\./, '');
  return host === 'instagram.com' ? 'Instagram' : host;
};

const featured = newsItems.find(n => n.id === FEATURED_ID);
const rest = newsItems
  .filter(n => n.id !== FEATURED_ID)
  .sort((a, b) => dateValue(b.date) - dateValue(a.date));

const NewsPage = () => (
  <main className="min-h-screen bg-white">
    <Navbar />
    <div style={{ height: '80px' }} />

    <div className="px-6 md:px-16 lg:px-20 pt-10 pb-6 border-b border-[#e4e3e2]">
      <h1 className="font-bold text-title text-[#383838]">News</h1>
    </div>

    {/* Feature story */}
    {featured && (
      <FadeIn>
        <a
          href={featured.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group grid grid-cols-1 lg:grid-cols-[7fr_5fr] border-b border-[#e4e3e2]"
        >
          <div className="overflow-hidden aspect-[16/10] lg:aspect-auto lg:min-h-[560px] bg-[#e4e3e2]">
            <img
              src={FEATURED_IMAGE}
              alt={featured.title}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.03]"
            />
          </div>
          <div className="flex flex-col justify-between gap-8 md:gap-10 px-6 md:px-16 lg:px-14 pt-8 pb-10 md:py-14">
            <div className="flex flex-col gap-4 md:gap-6">
              <p className="text-[11px] tracking-[2px] text-[#797979] uppercase">
                {featured.category} · {featured.date}
              </p>
              <h2 className="font-bold text-[24px] leading-[1.1] tracking-[-0.02em] md:text-heading text-[#383838] [text-wrap:balance]">
                {featured.title}
              </h2>
              <p className="text-[14px] md:text-[15px] leading-[1.6] text-[#797979]">
                {featured.excerpt}
              </p>
            </div>
            <span className="flex items-center gap-3 min-h-[44px] text-[11px] tracking-[2px] text-[#383838] uppercase">
              Read on {source(featured.url)}
              <span className="block h-px bg-[#383838] w-6 group-hover:w-12 transition-all duration-500 ease-out" />
            </span>
          </div>
        </a>
      </FadeIn>
    )}

    {/* Everything else, newest first */}
    <section className="px-6 md:px-16 lg:px-20 pt-2 md:pt-6 pb-16 md:pb-28">
      <ul>
        {rest.map((item, i) => (
          <li key={item.id}>
            <FadeIn delay={i * 40}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-1 md:grid-cols-[8rem_1fr] lg:grid-cols-[10rem_1fr_auto] gap-2 md:gap-x-8 lg:gap-x-10 items-baseline py-6 md:py-9 border-b border-[#e4e3e2]"
              >
                <span className="text-[11px] tracking-[2px] text-[#797979] uppercase">
                  {item.date}
                </span>
                <span className="flex flex-col gap-2">
                  <span className="font-bold text-[20px] md:text-[28px] leading-[1.2] tracking-[-0.015em] [text-wrap:balance] text-[#383838] group-hover:text-[#797979] transition-colors duration-300">
                    {item.title}
                  </span>
                  <span className="text-[14px] md:text-[15px] leading-[1.55] text-[#797979] max-w-2xl">
                    {item.excerpt}
                  </span>
                </span>
                <span className="flex items-center gap-3 text-[10px] md:text-[11px] tracking-[2px] text-[#797979] uppercase lg:whitespace-nowrap mt-2 lg:mt-0 md:col-start-2 lg:col-start-auto">
                  {item.category} · {source(item.url)}
                  <i className="ri-arrow-right-up-line text-[14px] text-[#383838] group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-transform duration-300" />
                </span>
              </a>
            </FadeIn>
          </li>
        ))}
      </ul>
    </section>

    <Footer />
  </main>
);

export default NewsPage;
