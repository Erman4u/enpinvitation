/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        swan: {
          white: '#FFFFFF',
          silver: '#C0C0C0',
          blue: '#E6F3F7',
          gold: '#D4AF37',
          gray: '#F5F5F5',
          deep: '#1A2A3A'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
        accent: ['"Great Vibes"', 'cursive'],
      },
      animation: {
        'ripple': 'ripple 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'mist': 'mist 20s linear infinite',
      },
      keyframes: {
        ripple: {
          '0%': { transform: 'scale(1)', opacity: '0.4' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        mist: {
          '0%': { transform: 'translateX(-10%)' },
          '100%': { transform: 'translateX(10%)' },
        }
      }
    },
  },
  plugins: [],
}
