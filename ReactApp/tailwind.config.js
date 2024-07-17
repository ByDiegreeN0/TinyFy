/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [
    /* eslint-disable no-undef, global-require */
    // Contenido de tu archivo tailwind.config.js
    require('tailwindcss-animated')
  ]
};
