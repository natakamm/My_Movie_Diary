// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#e31059",
        secondary: "#ff9a8b",
      },
      backgroundImage: {
        "gradient-primary-secondary":
          "linear-gradient(to right, #e31059, #ff9a8b)",
      },
    },
  },
  plugins: [],
};
