/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#0a0f1f',
        'brand-blue': '#2a6cf1',
        'brand-red': '#ff2a4d',
        'brand-gold': '#f2c14e',
      },
    },
  },
  plugins: [],
};
