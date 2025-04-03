/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // Reduce the base font size
    fontSize: {
      xs: "0.68rem",
      sm: "0.77rem",
      base: "0.85rem",
      lg: "1.02rem",
      xl: "1.19rem",
      "2xl": "1.36rem",
      "3xl": "1.7rem",
      "4xl": "2.04rem",
      "5xl": "2.55rem",
      "6xl": "3.4rem",
    },
    // Reduce spacing scale
    spacing: {
      px: "1px",
      0: "0",
      0.5: "0.1rem",
      1: "0.2rem",
      1.5: "0.3rem",
      2: "0.4rem",
      2.5: "0.5rem",
      3: "0.6rem",
      3.5: "0.7rem",
      4: "0.85rem",
      5: "1.05rem",
      6: "1.3rem",
      7: "1.5rem",
      8: "1.7rem",
      9: "1.9rem",
      10: "2.1rem",
      11: "2.3rem",
      12: "2.55rem",
      14: "3rem",
      16: "3.4rem",
      20: "4.25rem",
      24: "5.1rem",
      28: "6rem",
      32: "6.8rem",
      36: "7.65rem",
      40: "8.5rem",
      44: "9.35rem",
      48: "10.2rem",
      52: "11.05rem",
      56: "11.9rem",
      60: "12.75rem",
      64: "13.6rem",
      72: "15.3rem",
      80: "17rem",
      96: "20.4rem",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "0.85rem",
        sm: "1.25rem",
        lg: "1.7rem",
      },
      screens: {
        sm: "540px", // Reduced from 640px
        md: "650px", // Reduced from 768px
        lg: "870px", // Reduced from 1024px
        xl: "1090px", // Reduced from 1280px
        "2xl": "1300px", // Reduced from 1400px
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  corePlugins: {
    preflight: true,
  },
  important: true,
}

