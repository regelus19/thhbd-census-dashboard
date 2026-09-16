/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        command: {
          dark: '#0B132B',
          card: '#1C2541',
          border: '#3A506B',
          hover: '#28385e',
          accent: '#5BC0BE',
          text: '#F0F2F5',
          muted: '#8D99AE'
        }
      }
    }
  },
  plugins: []
};
