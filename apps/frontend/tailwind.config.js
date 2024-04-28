/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#012d5a",
        secondary: "#e4e4e4",
        tertiary: "#f6bd39",
        translucentGrey: "rgb(103,124,143, 0.6)",
        teal: "#009CA6",
      },
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
        helvetica: ["helvetica"],
        Garamond: ["Garamond"],
      },
      animation: {
        "dash-path": "dash infinite reverse linear " + "1s", // 1s duration. This controls speed of animation. Higher is slower.
      },
      keyframes: {
        dash: {
          to: { strokeDashoffset: 40 }, //needs to be double of strokeDasharray
        },
      },
    },
  },
  plugins: [],
};
