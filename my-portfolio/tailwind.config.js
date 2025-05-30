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
  safelist: [
    'bg-red-100',
    'bg-orange-100',
    'bg-amber-100',
    'bg-yellow-100',
    'bg-lime-100',
    'bg-green-100',
    'bg-emerald-100',
    'bg-teal-100',
    'bg-cyan-100',
    'bg-sky-100',
    'bg-blue-100',
    'bg-indigo-100',
    'bg-violet-100',
    'bg-purple-100',
    'bg-fuchsia-100',
    'bg-pink-100',
    'bg-rose-100',
    'bg-slate-100',
    'bg-gray-100',
    'bg-zinc-100',
    'bg-neutral-100',
    'bg-stone-100',

    'text-red-900',
    'text-orange-900',
    'text-amber-900',
    'text-yellow-900',
    'text-lime-900',
    'text-green-900',
    'text-emerald-900',
    'text-teal-900',
    'text-cyan-900',
    'text-sky-900',
    'text-blue-900',
    'text-indigo-900',
    'text-violet-900',
    'text-purple-900',
    'text-fuchsia-900',
    'text-pink-900',
    'text-rose-900',
    'text-slate-900',
    'text-gray-900',
    'text-zinc-900',
    'text-neutral-900',
    'text-stone-900',
  ],
  plugins: [],
}

