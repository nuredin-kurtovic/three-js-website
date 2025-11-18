module.exports = {
  content: [
    "./index.html",
    "./*.html",
    "./script.js",
    "./src/**/*.{js,ts,vue}"
  ],
  theme: {
    extend: {
      colors: {
        bhx: "#02364D",
      },
      fontFamily: {
        albert: ['Albert Sans', 'sans-serif'], 
      },
      cursor: {
        'dot-circle-xl': "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64'><circle cx='32' cy='32' r='25' fill='none' stroke='white' stroke-width='2'/><circle cx='32' cy='32' r='5' fill='white'/></svg>\") 32 32, crosshair",
      },
    },
  },
  plugins: [],
};


