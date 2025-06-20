/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadein: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scalein: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        fadein: 'fadein 0.3s ease-out forwards',
        scalein: 'scalein 0.3s ease-out forwards',
      },
      colors: {
        // Use flat structure for gradient utilities
        'background-start': '#1a1a2e',
        'background-end': '#16213e',
        'panel-bg': 'rgba(44, 44, 84, 0.5)',
        'panel-border': 'rgba(255, 255, 255, 0.2)',
        'glow': 'rgba(0, 255, 255, 0.3)',
        'text-primary': '#e0e0e0',
        'text-secondary': '#a0a0a0',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
