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
      }
    },
  },
  plugins: [],
}

