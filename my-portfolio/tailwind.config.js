/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        durer: ['durer', 'serif'],
        prompt: ['prompt', 'sans-serif']
      },
      keyframes: {
        scrollUp: {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(-50%)' }, // scroll only half because we're duplicating
        },
        scrollDown: {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(50%)' }, // opposite direction
        },
      },
      animation: {
        scrollUp: 'scrollUp 20s linear infinite',
        scrollDown: 'scrollDown 20s linear infinite',
      },
    },
  },
  plugins: [],
}

