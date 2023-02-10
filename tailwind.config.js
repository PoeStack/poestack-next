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
      // Trying to use the exact same utility class for everything. Using a single "key" that encompasses all the different possible themes.
      // --color-text-base: #ffffff;
      // --color-text-inverted: #000;
      // --color-primary: #49558c;
      // --color-primary-light:#7184D9;
      // --color-primary-dark:#2E3659;
      // --color-secondary: #1054A1;
      // --color-secondary-light: #5FA1ED;
      // --color-secondary-dark: #0B396E;
      // --color-tertiary: #060F2F;
      // --color-tertiary-light: #1B2240;
      // --color-accent: #d9b445;
      // --color-accent-light: #F0D641;
      // --color-accent-dark: #E6973E;

      // colors: {
      //   "theme-color-0": "#060F2F",
      //   "theme-color-1": "#1B2240",
      //   "theme-color-2": "#383D5B",
      //   "theme-color-3": "#1054A1",
      //   "theme-color-4": "#99A6DB",
      // },

      textColor: {
        // "skin" is an example of a key
        skin: {
          base: "var(--color-text-base)",
          inverted: "var(--color-text-inverted)",
          primary: "var(--color-primary)",
          accent: "var(--color-accent)",
        },
      },
      backgroundColor: {
        skin: {
          primary: "var(--color-primary)",
          "primary-dark": "var(--color-primary-dark)",
          secondary: "var(--color-secondary)",
          "secondary-dark": "var(--color-secondary-dark)",
          tertiary: "var(--color-tertiary)",
          "tertiary-light": "var(--color-tertiary-light)",
          accent: "var(--color--accent)",
        },
      },
      borderColor: {
        skin: {
          base: "var(--color-text-base)",
          inverted: "var(--color-text-inverted)",
          primary: "var(--color-primary)",
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
