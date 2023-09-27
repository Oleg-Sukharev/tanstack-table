/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        sm: "0 4px 4px 0 rgba(0, 0, 0, 0.25)",
      },
      colors: {
        state: {
          900: "#202932",
          800: "#5F6E7C",
          700: "#687684",
        },
        gray: {
          300: "#F8F8F8",
          400: "#20293208",
          500: "#F8F9F9",
          600: "#EAEDF0",
          700: "#C8CFD5",
          800: "#DFDFDF",
          900: "#DEDEDE",
        },
        green: "#D2FFCE",
        yellow: "#FEF0DB",
        rose: "#FEDBDB",
        blue: {
          800: "#55A2EE",
          900: "#005CB2",
        },
      },
      fontSize: {
        ss: "0.65rem",
        sm: "0.8rem",
      },
      fontFamily: {
        sans: ["IbmPlexSans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
