const nativewind = require('nativewind/tailwind/css');
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", 
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/**/**/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.8rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.4rem',
        '5xl': '3rem',
      },
      colors: {
          'grayC': {
            500: '#313131',
            400: '#414141',
            300: '#525252'
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
          },
          transparent: 'transparent',
          current: 'currentColor',
          black: colors.black,
          blue: colors.blue,
          cyan: colors.cyan,
          emerald: colors.emerald,
          fuchsia: colors.fuchsia,
          slate: colors.slate,
          gray: colors.gray,
          neutral: colors.neutral,
          stone: colors.stone,
          green: colors.green,
          indigo: colors.indigo,
          lime: colors.lime,
          orange: colors.orange,
          pink: colors.pink,
          purple: colors.purple,
          red: colors.red,
          rose: colors.rose,
          sky: colors.sky,
          teal: colors.teal,
          violet: colors.violet,
          yellow: colors.amber,
          white: colors.white,
      },
    },
    plugins: [nativewind],
  }
}