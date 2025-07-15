/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@aceternity/ui/**/*.{js,ts,jsx,tsx}', // Added for Aceternity UI
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
