import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#333333",
        "yellow-gold": "#f0be14",
        grey: "#cccccc",
        "grey-light": "#f9f9f9",
        blue: "#64b4fa",
        "blue-light": "#c1e1fd",
      },
      fontFamily: {
        averta: ['var(--font-averta-regular)', 'sans-serif'],
        avertaExtraBold: ['var(--font-averta-extrabold)', 'sans-serif'],
        noeDisplay: ['var(--font-noe-display-bold)', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
