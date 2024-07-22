/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#022959",
        secondary: "#9699aa",
        accent: "#483eff",
        background: "#eff5ff",
        lightblue: "#abbcff",
        lightgrey: "#d6d9e6",
        orange: "#ffaf7e",
        pink: "#f9818e",
        skyblue: "#bee2fd",
        lightgrey: "#f8f9ff",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        main: {
          primary: "#022959",
          secondary: "#9699aa",
          accent: "#483eff",
          background: "#eff5ff",
          lightblue: "#abbcff",
          lightgrey: "#d6d9e6",
          orange: "#ffaf7e",
          pink: "#f9818e",
          skyblue: "#bee2fd",
          lightgrey: "#f8f9ff",
        },
      },
    ],
  },
};
