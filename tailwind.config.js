/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['Syne', 'Kanit', 'sans-serif'],
        kanit: ['Kanit', 'sans-serif'],
      },
      colors: {
        dark: {
          950: '#060608',
          900: '#0C0C0C',
          850: '#111216',
          800: '#17181F',
          700: '#22242D',
        },
        accent: {
          DEFAULT: '#D7E2EA',
          emerald: '#10B981',
          slate: '#94A3B8',
        },
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.06), transparent 70%)',
        'grid-pattern': 'radial-gradient(rgba(215, 226, 234, 0.08) 1px, transparent 0)',
      },
    },
  },
  plugins: [],
}
