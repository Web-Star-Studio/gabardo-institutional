/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'accent': {
          DEFAULT: '#c42723',
          50: '#fdf2f2',
          100: '#fce7e6',
          200: '#f9d2d1',
          300: '#f4aeac',
          400: '#ec7d7a',
          500: '#e04e4a',
          600: '#cd2e2a',
          700: '#c42723',
          800: '#a01e1b',
          900: '#851c1a',
        },
        'secondary': {
          DEFAULT: '#fdca40',
          50: '#fffef7',
          100: '#fffbeb',
          200: '#fef5c7',
          300: '#feea98',
          400: '#fdda63',
          500: '#fdca40',
          600: '#fcb916',
          700: '#e09f10',
          800: '#b7810f',
          900: '#946914',
        }
      }
    },
  },
  plugins: [],
}

