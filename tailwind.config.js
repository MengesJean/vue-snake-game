/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'snake': '#22c55e',
        'food': '#ef4444',
        'primary': '#4f46e5',
        'primary-hover': '#4338ca',
      }
    },
  },
  plugins: [],
} 