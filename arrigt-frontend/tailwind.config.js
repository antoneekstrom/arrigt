module.exports = {
  content: ["pages/**/*.tsx", "src/**/*.tsx"],
  theme: {
    extend: {
      screens: {
        "3xl": "2000px",
      }
    },
    colors: ({ colors: { emerald, red } }) => ({
      emerald,
      red,
      gray: {
        0: "#ffffff",
        100: "#f8f8f8",
        200: "#f2f2f2",
        300: "#ebebeb",
        400: "#d8d8d8",
        500: "#c8c8c8",
        600: "#b8b8b8",
        700: "#a8a8a8",
        800: "#979797",
        900: "#878787",
      },
      black: {
        0: "#000000",
      },
      turquoise: {
        100: "#e7fdfe",
        200: "#c7f5f5",
        300: "#a7ebeb",
        400: "#0ae5f5",
        500: "#09cdda",
        600: "#08b7c4",
        700: "#1298a1",
        800: "#0e7f7f",
        900: "#0c6b6b",
      },
      transparent: "transparent",
      intent: {
        0: "var(--intent-color-0)",
        100: "var(--intent-color-100)",
        300: "var(--intent-color-300)",
        500: "var(--intent-color-500)",
        700: "var(--intent-color-700)",
        "focus-300": "var(--intent-color-focus-300)",
        "focus-500": "var(--intent-color-focus-500)",
        "focus-700": "var(--intent-color-focus-700)",
      },
    }),
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
      serif: ["Playfair Display", "serif"],
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.9rem",
      base: "1rem",
      md: "1.25rem",
      lg: "2rem",
      xl: "3rem",
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
};
