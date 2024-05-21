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
        "custom-blue": "#7AB2B2"
      }
    },
  },
  plugins: [],
}

