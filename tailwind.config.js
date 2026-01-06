/** @type {import('tailwindcss').Config} */
import { colors } from "./src/theme/colour.js";
console.log("Tailwind Config Loaded. Colors keys:", Object.keys(colors));
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
     colors: colors,
    },
  },
  plugins: [],
};
