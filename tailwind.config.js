/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand :'#FF7D0C'
      },
      fontFamily: {
        baloo: ['Baloo', 'cursive'], // nom que tu veux utiliser
      },
    },
  },
  plugins: [],
}


