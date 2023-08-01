/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      'primary': '#210A40',
      'secondary': '#120521',
      'purple': '#AE70FF',
      'skin': '#FFBDA3',
      'yellow': '#FFFC70',
      'lightblue': '#96b3ff',
    }
  },
  plugins: [
  ],
}

