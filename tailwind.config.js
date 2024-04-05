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
      },
      animation:{
        'pulse': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1)',
        'appear': 'appear 0.5s ease-in-out forwards'
      },
      keyframes:{
        pulse:{
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        appear:{
          '0%': 
          {
            height: 0, 
            opacity: 0 
          },
          '100%': 
          { 
            opacity: 1 
          },
        }
      }
    },
  },
  plugins: [],
}

