/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#11120f',
        paper: '#e9e8e2',
        muted: '#969790',
        acid: '#d8ff36',
      },
      fontFamily: {
        sans: ['Manrope', 'Arial', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
