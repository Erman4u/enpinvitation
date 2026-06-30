/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        magical: {
          purple: '#4a0e4e',
          'purple-light': '#8E44AD',
          gold: '#D4AF37',
          'gold-light': '#F1C40F',
          blue: '#1a1a2e',
          'blue-deep': '#0f0f1b',
          green: '#1B5E20',
          'forest': '#0a2e0a',
        },
      },
      fontFamily: {
        fairytale: ['"Playfair Display"', 'serif'],
        sans: ['"Montserrat"', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'glow-slow': 'glow 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { opacity: 0.6, filter: 'brightness(1)' },
          '50%': { opacity: 1, filter: 'brightness(1.5)' },
        },
      },
    },
  },
  plugins: [],
}
