/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#001F5B', // Primary
          light: '#003380',
          dark: '#001233',
        },
        bronze: {
          DEFAULT: '#D1B07A', // Secondary
          dark: '#9D774D',
          light: '#E6CC98',
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}