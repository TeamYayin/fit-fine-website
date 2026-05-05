/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        night: "#0a0a0a",
        gold: "#d4af37",
        "gold-soft": "#f3d77a",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      boxShadow: {
        gold: "0 0 34px rgba(212, 175, 55, 0.34)",
      },
    },
  },
  plugins: [],
};
