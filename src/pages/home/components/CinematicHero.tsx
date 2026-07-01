import { useEffect, useState } from 'react';

const AwardBadge = ({
  src,
  alt,
  delay,
  masterReady,
}: {
  src: string;
  alt: string;
  delay: number;
  masterReady: boolean;
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!masterReady) return;
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [masterReady, delay]);

  return (
    <div
      className="relative group"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1) translateY(0px)' : 'scale(0.75) translateY(16px)',
        transition:
          'opacity 600ms cubic-bezier(0.34, 1.4, 0.64, 1), transform 600ms cubic-bezier(0.34, 1.4, 0.64, 1)',
      }}
    >
      <img
        src={src}
        alt={alt}
        className="w-14 h-14 md:w-36 md:h-36 object-contain opacity-95 transition-transform duration-300 group-hover:scale-110"
      />
    </div>
  );
};

const CinematicHero = () => {
  const [curtainLifted, setCurtainLifted] = useState(false);
  const [heroReady, setHeroReady] = useState(false);
  const [titleIn, setTitleIn] = useState(false);
  const [taglineIn, setTaglineIn] = useState(false);
  const [calloutIn, setCalloutIn] = useState(false);
  const [awardsIn, setAwardsIn] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setCurtainLifted(true), 80),
      setTimeout(() => setHeroReady(true), 200),
      setTimeout(() => setTitleIn(true), 500),
      setTimeout(() => setTaglineIn(true), 800),
      setTimeout(() => setCalloutIn(true), 900),
      setTimeout(() => setAwardsIn(true), 1400),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <>
      <div
        className="fixed inset-0 z-[999] pointer-events-none bg-[#1a1a1a]"
        style={{
          opacity: curtainLifted ? 0 : 1,
          transition: 'opacity 1200ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />

      <section className="relative w-full h-screen overflow-hidden" data-theme="dark">
        <img
          src="/images/about-hero.webp"
          alt="Obra Majoralia"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{
            transform: heroReady ? 'scale(1)' : 'scale(1.08)',
            transition: 'transform 2200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/70" />

        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 lg:px-20 pb-6 md:pb-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-3 md:gap-8">
          <div
            style={{
              opacity: titleIn ? 1 : 0,
              transform: titleIn ? 'translateY(0px)' : 'translateY(60px)',
              transition:
                'opacity 1000ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 1000ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            <h1
              className="text-[44px] md:text-[80px] lg:text-[100px] font-bold leading-none tracking-[-2px] md:tracking-[-3px] text-white flex-shrink-0"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              OBRA
              <br />
              MAJORALIA
            </h1>
          </div>

          <div
            style={{
              opacity: taglineIn ? 1 : 0,
              transform: taglineIn ? 'translateY(0px)' : 'translateY(40px)',
              transition:
                'opacity 900ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 900ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            <p
              className="text-[14px] md:text-[19px] text-white/75 leading-[1.7] md:leading-[1.9] tracking-[0.2px] text-justify md:text-right mb-0 md:mb-6"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              A future-driven architecture studio
              <br />
              designing meaningful spaces
              <br />
              rooted in place, culture, and human experience.
            </p>
          </div>
        </div>

        <div className="absolute top-[18%] right-[4%] flex items-start gap-0 z-10">
          <div className="flex flex-col items-start">
            <div
              className="w-16 md:w-48 h-px bg-white/50 mt-[14px] md:mt-[18px] origin-right"
              style={{
                transform: calloutIn ? 'scaleX(1)' : 'scaleX(0)',
                transition: 'transform 600ms cubic-bezier(0.4, 0, 0.2, 1) 900ms',
              }}
            />
            <div
              className="w-px h-16 bg-white/50 relative origin-top"
              style={{
                transform: calloutIn ? 'scaleY(1)' : 'scaleY(0)',
                transition: 'transform 400ms cubic-bezier(0.4, 0, 0.2, 1) 1480ms',
              }}
            >
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-white/70 rounded-full"
                style={{
                  opacity: calloutIn ? 1 : 0,
                  transition: 'opacity 300ms ease 1900ms',
                }}
              />
            </div>
          </div>

          <div className="ml-5 flex flex-col gap-2">
            <p
              className="text-sm md:text-2xl font-bold tracking-[-0.5px] text-white leading-tight"
              style={{
                fontFamily: 'var(--font-sans)',
                opacity: calloutIn ? 1 : 0,
                transform: calloutIn ? 'translateY(0px)' : 'translateY(10px)',
                transition: 'opacity 500ms ease 1050ms, transform 500ms ease 1050ms',
              }}
            >
              House of Song
            </p>
            <p
              className="text-xs md:text-[17px] text-white/60 mb-2 md:mb-4"
              style={{
                fontFamily: 'var(--font-sans)',
                opacity: calloutIn ? 1 : 0,
                transform: calloutIn ? 'translateY(0px)' : 'translateY(8px)',
                transition: 'opacity 500ms ease 1200ms, transform 500ms ease 1200ms',
              }}
            >
              Loboc Performing Arts Center
            </p>

            <div className="flex flex-col gap-3">
              <AwardBadge src="/images/award-1.webp" alt="WAF Award" delay={0} masterReady={awardsIn} />
              <AwardBadge src="/images/award-2.webp" alt="Award 2" delay={160} masterReady={awardsIn} />
              <AwardBadge src="/images/award-3.webp" alt="Award 3" delay={320} masterReady={awardsIn} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CinematicHero;
