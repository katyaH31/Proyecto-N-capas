/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './pages/**/*.{html,js}',
    './components/**/*.{html,js}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FFFFFF', //primary color
        'secondary': '#3C6E71', //secondary color
        'tertiary': '#54A8AE', //tertiary color
        
      },
    }

  },
  plugins: [],
}

