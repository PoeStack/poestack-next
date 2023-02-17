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
  plugins: [require("flowbite/plugin")],
  theme: {
    // "skin" is a key for tailwind theme-ing
    // possible change skin to 'content' to fulfill material ui design philosophy
    // base/inverted used for text
    // primary/secondary, etc used for colors & backgrounds
    extend: {
      textColor: {
        content: {
          base: "var(--color-text-base)",
          inverted: "var(--color-text-inverted)",
          accent: "var(--color-accent)",
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
        },
      },
      // colors: {
      //   "theme-color-0": "#060F2F",
      //   "theme-color-1": "#1B2240",
      //   "theme-color-2": "#383D5B",
      //   "theme-color-3": "#1054A1",
      //   "theme-color-4": "#99A6DB",
      // },
    },
  },
};
