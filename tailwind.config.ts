import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        Inter: ["var(--font-inter)", ...fontFamily.sans],
        jakarta_sans: ["var(--font-jakarta_sans)", ...fontFamily.sans],
        playfair: ["var(--font-playfair)", ...fontFamily.sans],
      },
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        paragraph: {
          DEFAULT: "rgb(var(--color-paragraph) / <alpha-value>)",
          light: "rgb(var(--color-paragraph-light) / <alpha-value>)",
        },
        borderColour: {
          DEFAULT: "rgb(var(--color-border) / <alpha-value>)",
          dark: "rgb(var(--color-border-dark) / <alpha-value>)",
        },
        dark: {
          DEFAULT: "rgb(var(--color-dark) / <alpha-value>)",
          200: "rgb(var(--color-dark-200) / <alpha-value>)",
          300: "rgb(var(--color-dark-300) / <alpha-value>)",
        },
        gray: {
          DEFAULT: "rgb(var(--color-gray) / <alpha-value>)",
          100: "rgb(var(--color-gray-100) / <alpha-value>)",
        },
      },
      boxShadow: {
        default:
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        nav: "0px 0px 30px rgba(0, 0, 0, 0.05)",
        box: "0px 5px 50px 0px rgba(0, 0, 0, 0.07)",
      },
      borderRadius: {
        large: "40px",
      },
    },
  },
  plugins: [],
} satisfies Config;
