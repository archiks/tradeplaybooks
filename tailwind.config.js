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
        // Print-shop palette
        ink: '#141833',      // deep blue-black process ink
        press: '#2433FF',    // ultramarine spot colour (primary)
        kraft: '#B8875A',    // corrugated board
        paper: '#F3F4F1',    // cool board white
        board: '#E3E5E0',    // grey board / rules
        // Legacy names remapped so admin + legal pages follow the new theme
        brand: {
          navy: '#141833',
          teal: '#2433FF',
          purple: '#B8875A',
          light: '#F3F4F1',
          white: '#FFFFFF',
        },
        solana: { green: '#2433FF', purple: '#141833', dark: '#F3F4F1' },
      },
      fontFamily: {
        sans: ['"Archivo"', 'system-ui', 'sans-serif'],
        serif: ['"Archivo"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
