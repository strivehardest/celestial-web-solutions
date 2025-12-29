/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // REQUIRED for dark mode toggle
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.css"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
