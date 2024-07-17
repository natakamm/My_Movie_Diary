/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "journal.html", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#E31059",
        secondary: "#F6744B",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
