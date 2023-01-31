/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "theme-color-0": "#060F2F",
        "theme-color-1": "#1B2240",
        "theme-color-2": "#383D5B",
        "theme-color-3": "#1054A1",
        "theme-color-4": "#99A6DB",
      },
    },
  },
  plugins: [],
};
