import { type Config } from "tailwindcss";
import {
  scopedPreflightStyles,
  isolateInsideOfContainer,
} from "tailwindcss-scoped-preflight";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.html",
    "./src/**/*.js",
    "./src/**/*.tsx",
    "./*.ts",
    "./blog/**/*.mdx",
    "./docs/**/*.mdx",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  important: true,
  plugins: [
    require("@tailwindcss/typography"),
    scopedPreflightStyles({
      isolationStrategy: isolateInsideOfContainer(".twp", {
        except: ".no-twp",
      }),
    }),
    require("@tailwindcss/container-queries"),
  ],
} satisfies Config;
