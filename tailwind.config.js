/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      gridTemplateColumns:{
        '20': 'repeat(20,minmax(0,1fr))',
        'layout': '200px minmax(900px, 1fr) 100px'
      }
    },
  },
  plugins: [],
}

