/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          // Brand: Nexa for headings, text and UI; Agrandir only for the small wordmark-style lines
          sans: ['Nexa', 'sans-serif'],
          display: ['Agrandir', 'Nexa', 'sans-serif'],
        },
        colors: {
          // The only four brand colours
          ink: '#383838',
          stone: '#797979',
          mist: '#e4e3e2',
        },
        fontSize: {
          // Heading scale (Nexa Bold, tight leading — matches the studio's proposal deck)
          display: ['clamp(40px, 6vw, 96px)', { lineHeight: '1', letterSpacing: '-0.03em' }],
          title:   ['clamp(36px, 4.6vw, 68px)', { lineHeight: '1', letterSpacing: '-0.03em' }],
          heading: ['clamp(28px, 2.9vw, 44px)', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
          subhead: ['clamp(20px, 1.7vw, 26px)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
          quote:   ['clamp(20px, 2vw, 30px)', { lineHeight: '1.25', letterSpacing: '-0.015em' }],
        },
      },
    },
    plugins: [],
  }
