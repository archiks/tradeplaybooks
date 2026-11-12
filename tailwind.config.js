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
        forest: { DEFAULT: '#103B2C', deep: '#0A2A1F', soft: '#1B5440' }, // brand green
        lime: { DEFAULT: '#D4F26A', soft: '#E8F8A9' },                   // accent
        tangerine: '#FF7A3D',                                            // small pops only
        sage: '#EEF3EA',                                                 // soft section background
        mist: '#DDE5D8',                                                 // borders on light
        ink: '#0C1A14',      // text
        press: '#17694B',    // action colour on white (links, focus, buttons)
        kraft: '#B8875A',
        paper: '#F5F7F2',    // page background
        board: '#DDE5D8',    // rules / borders
        // Legacy names remapped so the admin follows the theme
        brand: { navy: '#0C1A14', teal: '#17694B', purple: '#B8875A', light: '#F5F7F2', white: '#FFFFFF' },
        solana: { green: '#17694B', purple: '#0C1A14', dark: '#F5F7F2' },
      },
      fontFamily: {
        sans: ['"Geist"', 'system-ui', 'sans-serif'],
        display: ['"Bricolage Grotesque"', '"Geist"', 'system-ui', 'sans-serif'],
        serif: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
      },
      borderRadius: { '4xl': '2rem', '5xl': '2.75rem' },
      boxShadow: {
        soft: '0 1px 2px rgba(12,26,20,.04), 0 12px 32px -12px rgba(12,26,20,.14)',
        lift: '0 2px 4px rgba(12,26,20,.05), 0 28px 60px -20px rgba(12,26,20,.28)',
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
      },
      animation: { marquee: 'marquee 38s linear infinite' },
    },
  },
  plugins: [],
}
