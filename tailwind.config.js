/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "520px",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
