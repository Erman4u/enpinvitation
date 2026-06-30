/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'neo-yellow': 'var(--neo-yellow, #FDE047)',
        'neo-red': 'var(--neo-red, #FF5C5C)',
        'neo-blue': 'var(--neo-blue, #3B82F6)',
        'neo-black': 'var(--text-main, #212121)',
        'neo-white': 'var(--bg-main, #FAFAFA)',
        'neo-green': '#34D399',
      },
      fontFamily: {
        'brutal': ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'neo': '4px 4px 0px var(--border-main, #212121)',
        'neo-lg': '6px 6px 0px var(--border-main, #212121)',
        'neo-xl': '8px 8px 0px var(--border-main, #212121)',
        'neo-red': '4px 4px 0px var(--neo-red, #FF5C5C)',
        'neo-blue': '4px 4px 0px var(--neo-blue, #3B82F6)',
        'neo-yellow': '4px 4px 0px var(--neo-yellow, #FDE047)',
        'neo-inv': '-4px 4px 0px var(--border-main, #212121)',
      },
      borderWidth: {
        '3': '3px',
      },
      animation: {
        'slide-in': 'slideIn 0.15s ease-out',
        'pop-in': 'popIn 0.1s ease-out',
        'tick': 'tick 0.1s ease-out',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        popIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        tick: {
          '0%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
