/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        'dvh': '100dvh',
        'svh': '100svh',
        'lvh': '100lvh',
      },
      minHeight: {
        'dvh': '100dvh',
        'svh': '100svh',
        'lvh': '100lvh',
      },
      colors: {
        'sas-background-dark': '#22272e', // Custom color name and its hex value
        'sas-background-light': '#37404c',
        'sas-green': '#3AA675',
        'sas-text-grey': '#8B9EB0',
        'sas-white': '#999999',
      },
      fontFamily: {
        logo: ['Righteous', 'sans-serif'],
        teko: ['Teko','sans-serif'],
        bahianita: ['Bahianita', 'sans-serif'],
        rye: ['Rye', 'cursive'],
      },
      fontSize: {
        'xxs': '.625rem', // This is an example size, you can set it as needed
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: 0.5 },
          '50%': { opacity: 1 },
        },
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}