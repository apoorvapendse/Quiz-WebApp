/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'light-purple': '#635985',
        'purple': '#443C68',
        'dark-purple': '#393053',
        'background': '#18122B',
      },
      },
  },
  plugins: [],
};
