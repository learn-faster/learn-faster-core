// tailwind.config.js
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eefaf7',
          100: '#d9f6ef',
          200: '#b5efe2',
          300: '#7fe3d2',
          400: '#49d6c2',
          500: '#2ec4b6',
          600: '#1aa394',
          700: '#128074',
          800: '#0f635a',
          900: '#0d4e47',
          950: '#062c29',
        },
        dark: {
          50: '#f7f5fb',
          100: '#e8e5f2',
          200: '#d2cde2',
          300: '#b5b0c4',
          400: '#8f8aa0',
          500: '#6d687a',
          600: '#504b5d',
          700: '#3a3546',
          800: '#262231',
          900: '#161321',
          950: '#0b0b0f',
        }
      }
    }
  },
  plugins: [
    typography
  ]
};
