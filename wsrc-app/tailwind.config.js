/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", 
  ],
  theme: {
    extend: {
      //CUSTOM COLOURS GO HERE 
      colors: {
        cGreen: '#37D91E',      // Green
        cDarkBlue: '#12121B',       // Blue
        cBlack: '#05050F',  // Dark Black
        cWhite: '#F2F2F3',   // Off White
        cBlue: '#006EFF', // Strong Blue
        cGrey: '#F2F2F3',       // Grey
      },
      height: {
        '144': '32rem', // Custom height class
        '192': '48rem', // Custom height class
      },
      fontSize: {
        '10xl': '9rem', // Adjust the size as needed
      },
    },
  },
  plugins: [],
}

