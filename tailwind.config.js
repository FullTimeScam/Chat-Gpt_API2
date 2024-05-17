/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        DOSBlue: "rgb(0, 0, 170)",
        DOSPurple: "rgb(128, 0, 128)",
      },
    },
  },
  plugins: [],
};
