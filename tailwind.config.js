/** @type {import('tailwindcss').Config} */

const round = (num) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, "$1")
    .replace(/\.0$/, "");
const rem = (px) => `${round(px / 16)}rem`;

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontSize: {
        headingDesktop: "2rem",
        headingMobile: "1.5rem",
        bodyL: "1rem"
      },
      colors: {
        primary: "#022959",
        secondary: "#9699aa",
        accent: "#483eff",
        background: "#eff5ff",
        lightblue: "#abbcff",
        grey: "#d6d9e6",
        orange: "#ffaf7e",
        pink: "#f9818e",
        skyblue: "#bee2fd",
        lightgrey: "#f8f9ff",
        error: "#EE374A",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            //Heading
            h1: {
              fontSize: theme("fontSize.headingMobile"),
              marginBottom: "0.5rem",
              color: theme("colors.primary"),
              "@screen sm": {
                fontSize: theme("fontSize.headingDesktop"),
                marginBottom: "0.75rem",
              },
            },
            //Paragraph
            p: {
              color: theme("colors.secondary"),
              marginTop: 0,
              fontSize: theme("fontSize.bodyL"),
              lineHeight: "25px",
            },
            //
            label: {
              fontSize: "0.75rem",
              color: theme("colors.primary"),
              "@screen sm": {
                fontSize: "0.875rem",
              },
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
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
