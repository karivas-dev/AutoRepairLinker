const defaultTheme = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", 
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
          sans: ['Nunito', ...defaultTheme.fontFamily.sans],
         
      },
      colors: {
          'grayC': {
              500: '#313131',
              400: '#414141',
              300: '#525252'
          },
          'pinkC': {
              100: '#F4A5A3',
              200: '#F78C94',
              300: '#EF7876',
              400: '#EC625F',
          },
          'whiteC': {
              500: '#EEEEEE',
              400: '#F1F6F5',
          },
          'blueC': {             
              100: '#4475B8',
              200: '#6987B7',
              300: '#374A7A',
              500: '#2C3B64',
              600: '#22325B',
          }
      },
  },
  plugins: [],
  }
}