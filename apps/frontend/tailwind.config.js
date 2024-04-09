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
    },
  },
  plugins: [],
};
