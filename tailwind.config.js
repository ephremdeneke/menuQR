/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Light theme (Coffee)
        cream: '#F6F1E8',
        espresso: '#241A16',
        roast: '#6B4A36',
        gold: '#B88A52',
        card: '#FFFDF8',
        sand: '#EAE0CE',
        'sand-dark': '#D8CBB4',
        // Dark theme (nighttime coffee shop)
        night: '#17110D',
        nightsoft: '#221A14',
        nightcard: '#2A211A',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        ethiopic: ['"Noto Sans Ethiopic"', 'sans-serif'],
      },
      letterSpacing: {
        display: '0.02em',
        wide2: '0.25em',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(36,26,22,0.04), 0 8px 24px rgba(36,26,22,0.06)',
        lift: '0 2px 4px rgba(36,26,22,0.05), 0 18px 44px rgba(36,26,22,0.12)',
        ringgold: '0 0 0 1px rgba(184,138,82,0.35)',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) both',
        'fade-in': 'fadeIn 0.6s ease both',
        'zoom-slow': 'zoomSlow 22s ease-in-out infinite alternate',
        'spin-slow': 'spin 22s linear infinite',
        shimmer: 'shimmer 1.6s linear infinite',
        'pop-badge': 'popBadge 0.5s cubic-bezier(0.34,1.56,0.64,1) both',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        zoomSlow: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
        popBadge: {
          '0%': { opacity: '0', transform: 'scale(0.6)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
