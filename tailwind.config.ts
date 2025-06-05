import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "480px",
      sm: "576px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
      "2xl": "1536px",
    },
    container: {
      center: "true",
      padding: "1rem",
      screens: {
        xs: "100%",
        sm: "100%",
        md: "100%",
        lg: "100%",
        xl: "1332px",
        "2xl": "1332px",
      },
    },
    extend: {
      backgroundImage: {
        "custom-image": "url('/main0.jpg')",
        "card-image": "url('/card11.jpeg')",
        "card-image2": "url('/card12.jpg')",
        "card-image3": "url('/card13.jpg')",
        "card-image4": "url('/card14.jpg')",
        "card-image5": "url('/card15.jpg')",
        "card-image6": "url('/card16.jpg')",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
