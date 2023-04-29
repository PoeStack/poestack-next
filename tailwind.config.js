/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    "./pages/**/*.{ts,tsx}",
    "./public/**/*.html",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
  ],
  safelist: [
    { pattern: /col-start-./ },
    { pattern: /row-start-./ },
    { pattern: /col-span-./ },
    { pattern: /row-span-./ },
  ],
  plugins: [require("flowbite/plugin")],
  theme: {
    // Theme Design Principles and Distinctions:
    // - Color (primary, secondary &  variants)
    // - Surfaces (backgrounds and components)
    // - States (such as error states)
    // - Content (typography and iconography)
    extend: {
      colors: {
        primary: "var(--color-primary)",
      },
      textColor: {
        content: {
          base: "var(--color-text-base)",
          inverted: "var(--color-text-inverted)",
          accent: "var(--color-accent)",
          red: "var(--color-red)",
          normal: "var(--color-normal)",
          magic: "var(--color-magic)",
          rare: "var(--color-rare)",
          unique: "var(--color-unique)",
          gem: "var(--color-gem)",
        },
      },
      backgroundColor: {
        // colors
        color: {
          primary: "var(--color-primary)",
          "primary-variant": "var(--color-primary-variant)",
          secondary: "var(--color-secondary)",
          "secondary-variant": "var(--color-secondary-variant)",
          accent: "var(--color-accent)",
          "accent-variant": "var(--color-accent-variant)",
          red: "var(--color-red)",
        },
        // surfaces
        surface: {
          primary: "var(--color-background-primary)",
          "primary-variant": "var(--color-background-primary-variant)",
          secondary: "var(--color-background-secondary)",
          "secondary-variant": "var(--color-background-secondary-variant)",
        },
      },
      borderColor: {
        color: {
          base: "var(--color-text-base)",
          inverted: "var(--color-text-inverted)",
          primary: "var(--color-primary)",
          "primary-variant": "var(--color-color-primary-variant)",
          secondary: "var(--color-background-secondary)",
          "secondary-variant": "var(--color-background-secondary-variant)",
          accent: "var(--color-accent)",
          normal: "var(--color-normal)",
          magic: "var(--color-magic)",
          rare: "var(--color-rare)",
          unique: "var(--color-unique)",
        },
      },
      backgroundImage: {
        kekw: 'url("/KEKW.png")',
        atlasbg: 'url("/AtlasPassiveBackground-min.png")',
      },

      gridTemplateColumns: {
        24: "repeat(24, minmax(24, 24))",
      },
      gridColumnStart: {
        13: "13",
        14: "14",
        15: "15",
        16: "16",
        17: "17",
        18: "18",
        19: "19",
        20: "20",
        21: "21",
        22: "22",
        23: "23",
        24: "24",
      },
      gridColumnEnd: {
        13: "13",
        14: "14",
        15: "15",
        16: "16",
        17: "17",
        18: "18",
        19: "19",
        20: "20",
        21: "21",
        22: "22",
        23: "23",
        24: "24",
      },
    },
  },
};
