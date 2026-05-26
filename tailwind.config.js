/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B35',
        salmon: '#FF8C69',
        warm: '#FFFAF5',
      },
    },
  },
  plugins: [],
}
