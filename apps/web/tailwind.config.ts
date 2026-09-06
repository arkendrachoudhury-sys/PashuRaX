/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#15803d', // green-700
        },
        secondary: {
          DEFAULT: '#d97706', // amber-600
        },
        danger: {
          DEFAULT: '#dc2626', // red-600
        },
        success: {
          DEFAULT: '#10b981', // emerald-500
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
