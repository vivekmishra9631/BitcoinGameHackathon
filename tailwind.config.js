/** @type {import('tailwindcss').Config} */
const konstaConfig = require("konsta/config");

module.exports = konstaConfig({
  content: [
    "./node_modules/flowbite-react/lib/**/*.js",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
<<<<<<< HEAD
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
=======
>>>>>>> 426d059 (first commit)
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "media", // or 'class'
<<<<<<< HEAD
=======
  theme: {
    extend: {},
  },
>>>>>>> 426d059 (first commit)
  variants: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
});
