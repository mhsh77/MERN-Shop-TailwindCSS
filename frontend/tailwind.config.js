/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html","./src/**/*.{js,jsx}",'./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontSize: {
        'sm': '0.8rem',
        'base': '1rem',
        'xl': '1.25rem',
        '2xl': '1.563rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
      },
      colors:{
        'bgcolor':"#27292D",
        'primary':"#35363A",
        'btn': "#1C64EC",
        'btnsecondary':"#0C9A56",
        'subtitlecol':"#E9E1DE"
      }
    },
    
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
