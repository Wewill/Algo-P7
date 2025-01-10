/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Anton: ["Anton", "sans-serif"],
        Manrope: ["Manrope", "sans-serif"],
      },
      boxShadow: {
        smooth: "0px 4px 34px 30px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [],
};
