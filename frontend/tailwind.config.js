module.exports = {
  purge: ["pages/**/*.tsx"],
  theme: {
    colors: {
      gray: {
        10: "#F8F8F8"
      },
      white: "#FFFFFF",
      turqoise: {
        10: "#E7FDFE",
        50: "#09cdda",
        70: "#1298A1"
      }
    },
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
      serif: ["Playfair Display", "serif"]
    },
    fontSize: {
      DEFAULT: "1rem",
      md: "1.2rem",
      lg: "1.6rem",
      xl: "2rem",
      "2xl": "2.4rem",
      "3xl": "3.2rem"
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    }
  },
  plugins: [],
};
