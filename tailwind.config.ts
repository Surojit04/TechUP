import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#E04A00",
          amber: "#F57C00",
        },
        ink: {
          DEFAULT: "#0B0B0F",
          soft: "#17171D",
        },
        paper: "#FFFFFF",
        mist: "#F5F5F7",
        muted: "#6B6B76",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(180deg, #E04A00 0%, #F57C00 100%)",
        "brand-gradient-h": "linear-gradient(90deg, #E04A00 0%, #F57C00 100%)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        card: "20px",
      },
      maxWidth: {
        content: "1200px",
      },
      boxShadow: {
        "brand-glow": "0 8px 30px rgba(224, 74, 0, 0.25)",
        "brand-glow-lg": "0 12px 40px rgba(224, 74, 0, 0.35)",
      },
      spacing: {
        "section-desktop": "120px",
        "section-mobile": "72px",
      },
    },
  },
  plugins: [],
};

export default config;
