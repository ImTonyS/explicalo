/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.{html,js}",
    "./app.js"],
  theme: {
    extend: {
      colors: {
        "primary": "#4D869C",
        "custom-blue-base": "#EEF7FF", 
      }
    },
  },
  plugins: [],
}

