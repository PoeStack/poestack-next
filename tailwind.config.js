/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    "./pages/**/*.{ts,tsx}",
    "./public/**/*.html",
  ],
  plugins: [require("flowbite/plugin")],
  theme: {
    extend: {
      textColor: {
        // "skin" is an example of a key
        skin: {
          base: "var(--color-text-base)",
          inverted: "var(--color-text-inverted)",
          first: "var(--color-first)",
          second: "var(--color-second)",
          third: "var(--color-third)",
          accent: "var(--color-accent)",
        },
      },
      backgroundColor: {
        skin: {
          first: "var(--color-first)",
          "first-light": "var(--color-first-light)",
          "first-dark": "var(--color-first-dark)",
          second: "var(--color-second)",
          "second-light": "var(--color-second-light)",
          "second-dark": "var(--color-second-dark)",
          third: "var(--color-third)",
          "third-light": "var(--color-third-light)",
          "third-dark": "var(--color-third-dark)",
          accent: "var(--color--accent)",
        },
      },
      borderColor: {
        skin: {
          base: "var(--color-text-base)",
          inverted: "var(--color-text-inverted)",
          first: "var(--color-first)",
          accent: "var(--color-accent)",
        },
      },
      colors: {
        "theme-color-0": "#060F2F",
        "theme-color-1": "#1B2240",
        "theme-color-2": "#383D5B",
        "theme-color-3": "#1054A1",
        "theme-color-4": "#99A6DB",
      },
    },
    gridTemplateColumns: {
      // Simple 16 column grid
      skillSidebar: "6fr 1fr",
    },
  },
};
