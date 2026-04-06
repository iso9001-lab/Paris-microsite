/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#fbf7f2',
        parchment: '#f4ede4',
        champagne: '#d2bf9b',
        blush: '#e7d7d8',
        charcoal: '#211d1b',
        ink: '#44403c',
        navy: '#273142'
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Iowan Old Style"', 'Baskerville', 'Georgia', 'serif'],
        sans: ['"Manrope"', '"SF Pro Display"', '"SF Pro Text"', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        luxury: '0 24px 60px rgba(30, 24, 18, 0.12)',
        'luxury-lg': '0 40px 100px rgba(30, 24, 18, 0.16)',
        innerGlow: 'inset 0 1px 0 rgba(255, 255, 255, 0.8)'
      },
      backgroundImage: {
        passport: 'radial-gradient(circle at 1px 1px, rgba(33, 29, 27, 0.14) 1px, transparent 0)'
      }
    }
  },
  plugins: []
};
