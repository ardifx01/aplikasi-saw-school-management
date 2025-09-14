/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          900: '#121212',
          800: '#1e1e1e',
          700: '#2d2d2d',
          600: '#4b4b4b',
          500: '#6e6e6e',
          400: '#8a8a8a',
          300: '#b4b4b4',
          200: '#dcdcdc',
          100: '#f5f5f5',
        }
      }
    },
  },
  plugins: [],
}