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
        cGrey: '#B7B7B7',       // Grey
        cDarkGrey: '#C1CDC4',
        cDarkGradientGrey:'#2D2D2D',
        cLightGradientGrey:'#181818',
        cBorderGrey: '#4A4B4C'

       },
      height: {
        '144': '32rem', // Custom height class
        '192': '48rem', // Custom height class
      },
      fontSize: {
        '10xl': '9rem', // Adjust the size as needed
      },
       fontFamily: {
        roboto: ['Roboto', 'sans-serif'],            // Default Roboto
        'roboto-condensed': ['Roboto Condensed', 'sans-serif'], // Condensed version
        porscha: ['porscha', 'sans-serif']
      },
     
    },
  },
  plugins: [
   
  ],
}

