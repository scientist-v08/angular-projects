/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: [
    './packages/shared-ui/src/lib/shared-ui/**/*.{ts,html}',
    './apps/app-32-vedic-astrology-matching/src/**/*.{ts,html}',
    './apps/app-34-crackers/src/**/*.{ts,html}',
  ],
  theme: {
    extend: {
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
