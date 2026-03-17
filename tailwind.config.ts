import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-heading)', 'serif'],
        sans: ['var(--font-body)', 'sans-serif'],
      },
      colors: {
        primary: "#1a1a1a",
        secondary: "#f5f5dc",
        accent: "#ff9900",
      },
      animation: {
        'slide-left': 'slide-left 40s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;