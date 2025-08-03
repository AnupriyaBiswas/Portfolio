/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Sora", "sans-serif"],
        sora: ["Sora", "sans-serif"],
      },
      keyframes: {
        floatUp: {
          "0%": { transform: "translateY(100vh) rotate(0deg)" },
          "10%": { transform: "translateY(85vh) rotate(1deg)" },
          "20%": { transform: "translateY(70vh) rotate(-0.5deg)" },
          "30%": { transform: "translateY(50vh) rotate(1.5deg)" },
          "40%": { transform: "translateY(35vh) rotate(-1deg)" },
          "50%": { transform: "translateY(20vh) rotate(0.5deg)" },
          "60%": { transform: "translateY(10vh) rotate(-1.5deg)" },
          "70%": { transform: "translateY(-5vh) rotate(1deg)" },
          "80%": { transform: "translateY(-20vh) rotate(-0.5deg)" },
          "90%": { transform: "translateY(-100vh) rotate(0deg)" },
          "100%": { transform: "translateY(-100vh) rotate(0deg)" },
        },
        subtleGlowPulse: {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(249, 115, 22, 0.8)",
          },
          "50%": {
            boxShadow: "0 0 40px rgba(249, 115, 22, 1)",
          },
        },
        highlightStream: {
          "0%": {
            transform: "translateX(-100%)",
            opacity: "0",
          },
          "50%": {
            opacity: "0.5",
          },
          "100%": {
            transform: "translateX(0%)",
            opacity: "0",
          },
        },
        pulseFast: {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0.4",
          },
        },
      },
      animation: {
        floatUp: "floatUp 30s ease-in-out infinite",
        subtleGlowPulse: "subtleGlowPulse 2s infinite ease-in-out",
        highlightStream: "highlightStream 1.5s ease-out infinite alternate",
        pulseFast: "pulseFast 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'), // for clamping text in Research cards
    require('@tailwindcss/aspect-ratio'), // safe responsive images
  ],
};
