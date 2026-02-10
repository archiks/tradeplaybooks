/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#002E25', // Deep Green/Navy for high contrast text
          teal: '#008060', // Shopify Green (Primary)
          purple: '#5E8EBD', // Accents (Soft Blue)
          light: '#F6F6F7', // Light Gray background
          white: '#FFFFFF',
        },
        solana: {
          // Kept for legacy compatibility if needed, but we are moving away
          green: '#008060',
          purple: '#002E25',
          dark: '#F6F6F7',
        },
        slate: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          800: '#1E293B',
          900: '#0F172A',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}