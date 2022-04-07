module.exports = {
  content: ["pages/**/*.tsx", "src/**/*.tsx"],
  theme: {
    colors: ({ colors: { emerald, red } }) => ({
      gray: {
        10: "#F8F8F8",
      },
      white: "#FFFFFF",
      turquoise: {
        10: "#E7FDFE",
        40: "#0ae5f5",
        50: "#09cdda",
        60: "#08b7c4",
        70: "#1298A1",
      },
      emerald: {
        10: emerald[50],
        20: emerald[100],
        30: emerald[200],
        40: emerald[300],
        50: emerald[400],
        60: emerald[500],
        70: emerald[600],
      },
      red: {
        10: red[50],
        20: red[100],
        30: red[200],
        40: red[300],
        50: red[400],
        60: red[500],
        70: red[600],
      }
    }),
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
      serif: ["Playfair Display", "serif"],
    },
    fontSize: {
      DEFAULT: "1rem",
      md: "1.2rem",
      lg: "1.6rem",
      xl: "2rem",
      "2xl": "2.4rem",
      "3xl": "3.2rem",
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  plugins: [],
};
