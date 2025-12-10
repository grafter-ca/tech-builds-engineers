/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html","./**/*.{ts,tsx}", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        manrope: ["Manrope", "sans-serif"],
      },
    },
  },
  plugins: [],
};
