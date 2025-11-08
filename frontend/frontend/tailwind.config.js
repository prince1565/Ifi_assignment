/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0f172a", // deep slate for header
        accent: "#06b6d4",  // cyan accent
      },
      boxShadow: {
        card: "0 6px 20px rgba(2,6,23,0.08)"
      }
    }
  },
  plugins: [],
}
