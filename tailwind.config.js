/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#0f1e33",
          900: "#152a45",
          800: "#1e3a5f",
          700: "#2a4d78",
        },
        gold: {
          500: "#c9a227",
          400: "#d9b94a",
        },
        cream: "#faf9f5",
      },
      fontFamily: {
        sans: ["var(--font-noto)", "sans-serif"],
        serif: ["var(--font-shippori)", "serif"],
      },
      maxWidth: {
        content: "1180px",
      },
    },
  },
  plugins: [],
};
