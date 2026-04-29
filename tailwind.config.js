/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,jsx}",
  ],
  theme: {
    extend: {
      /* ─── Color Palette: Obsidian Black + Architectural Gold ─── */
      colors: {
        obsidian: {
          950: '#050506',
          900: '#0B0B0C',
          800: '#151518',
          700: '#1F1F24',
          600: '#2A2A30',
          500: '#3A3A42',
        },
        gold: {
          50:  '#FDF8EF',
          100: '#F9EEDB',
          200: '#F0D9A8',
          300: '#E6C98A',
          400: '#D4AD5E',
          500: '#C5A059',
          600: '#A88440',
          700: '#8B6B32',
          800: '#6E5428',
          900: '#523E1D',
        },
      },

      /* ─── Typography: Luxury Pairing ─── */
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['"Inter"', 'system-ui', 'sans-serif'],
      },

      /* ─── Spacing & Sizing ─── */
      maxWidth: {
        'content': '1280px',
      },

      /* ─── Z-Index Scale (ui-ux-pro-max guideline) ─── */
      zIndex: {
        'navbar':  '50',
        'overlay': '40',
        'modal':   '60',
        'toast':   '70',
      },

      /* ─── Animations ─── */
      keyframes: {
        'gold-shimmer': {
          '0%, 100%': { backgroundPosition: '200% center' },
          '50%':      { backgroundPosition: '-200% center' },
        },
        'fade-in-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(197, 160, 89, 0.4)' },
          '50%':      { boxShadow: '0 0 24px 8px rgba(197, 160, 89, 0.1)' },
        },
      },
      animation: {
        'gold-shimmer': 'gold-shimmer 6s ease-in-out infinite',
        'fade-in-up':   'fade-in-up 0.8s ease-out forwards',
        'pulse-gold':   'pulse-gold 3s ease-in-out infinite',
      },

      /* ─── Backdrop Blur ─── */
      backdropBlur: {
        'xs': '2px',
      },

      /* ─── Line Height (ui-ux-pro-max: 1.5-1.75 for body) ─── */
      lineHeight: {
        'relaxed': '1.65',
      },
    },
  },
  plugins: [],
}
