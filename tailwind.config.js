/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // REQUIRED for dark mode toggle
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.css"
  ],
  theme: {
    extend: {
      fontFamily: {
        // Body text: Google Sans with robust fallbacks
        sans: [
          "Google Sans",
          "Roboto",
          "Segoe UI",
          "Helvetica Neue",
          "Arial",
          "sans-serif"
        ],
        // Headings: Bricolage Grotesque with fallbacks
        display: [
          "Bricolage Grotesque",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif"
        ],
      },
    },
  },
  plugins: [],
}
