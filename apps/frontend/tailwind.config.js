/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#012d5a",
        secondary: "#e4e4e4",
        tertiary: "#f6bd39",
      },
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
        helvetica: ["helvetica"],
        Garamond: ["Garamond"],
      },
      animation: {
        "dash-path": "dash 1s infinite reverse linear",
      },
      keyframes: {
        dash: {
          to: { strokeDashoffset: 40 },
        },
      },
    },
  },
  plugins: [],
};
