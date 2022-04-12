module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,html}",
    "./components/**/*.{js,ts,jsx,tsx,html}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  plugins: [require("tw-elements/dist/plugin")],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {},
  },
};
