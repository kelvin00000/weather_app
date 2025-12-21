/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./*.html"],
  theme: {
    extend: {
      colors: {
        'light_main': "#FFF2F0",
        'light_sec': "#E0D3D3",
        'dark_main': "#131324",
        'dark_sec': "#21214A"
      },
      fontFamily: {
        'primary': "Roboto"
      },
      animation: {
        'spin-f': 'spin 0.5s linear infinite',
        'custom-infinite': 'customlinear 40s linear infinite',
        'custom-slide-in': 'customlinear2 10s linear',
        'custom-slide-in2': 'customlinear3 12s linear'
      },
      keyframes: {
        customlinear: {
          '0%': { transform: 'translateX(-300%)' },
          '100%': { transform: 'translateX(1500%)' },
        },
        customlinear2: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        customlinear3: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(5%)' },
        }
      }
    },
  },
  plugins: [],
}

