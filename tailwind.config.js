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
<<<<<<< HEAD
=======
>>>>>>> a20bb59 (Modified chatbot wiith Questions, will fix color scheme for site later. If needed can add prepopulated questions as drop down options as opposed to the way it is now)
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
<<<<<<< HEAD
=======
>>>>>>> 426d059 (first commit)
=======
>>>>>>> a20bb59 (Modified chatbot wiith Questions, will fix color scheme for site later. If needed can add prepopulated questions as drop down options as opposed to the way it is now)
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "media", // or 'class'
<<<<<<< HEAD
<<<<<<< HEAD
=======
  theme: {
    extend: {},
  },
>>>>>>> 426d059 (first commit)
=======
>>>>>>> a20bb59 (Modified chatbot wiith Questions, will fix color scheme for site later. If needed can add prepopulated questions as drop down options as opposed to the way it is now)
  variants: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
});
