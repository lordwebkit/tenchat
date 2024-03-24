/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        "auth-left": "#F5F8FF",
        "auth-right": "#6172f3 ",
        "auth-element": "#8098F9",
      },
    },
  },
  plugins: [],
};
