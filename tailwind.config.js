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
      animation: {
      'fade-in': 'fadeIn 0.6s ease-out',
      'shake': 'shake 0.4s cubic-bezier(.36,.07,.19,.97) both',
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0', transform: 'translateY(20px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
      shake: {
        '10%, 90%': { transform: 'translateX(-5px)' },
        '20%, 80%': { transform: 'translateX(5px)' },
        '30%, 50%, 70%': { transform: 'translateX(-5px)' },
        '40%, 60%': { transform: 'translateX(5px)' },
      },
    },
  },
  plugins: [],
}
};
