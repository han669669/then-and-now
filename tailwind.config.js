const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui({
    defaultTheme: "dark",
    themes: {
      dark: {
        colors: {
          background: "#0a0a0a",
          foreground: "#ffffff",
        },
      },
    },
  })],
}
