/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        doctorsThem: {
          "primary": "#0FCFEC",
          "base-100": "#faf7f5",
          "secondary":"#00f7c6",
          "accent": "#3A4256",
          "neutral": "#291334",
        }
      }
    ]
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

