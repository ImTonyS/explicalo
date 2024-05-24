/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/public/**/*.{html,js}",
    "./app.js",
    "./src/public/index.js"],
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

