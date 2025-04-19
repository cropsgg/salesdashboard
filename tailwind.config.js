/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
        success: {
          light: "#10b981",
          DEFAULT: "#059669",
          dark: "#047857",
        },
        warning: {
          light: "#f59e0b",
          DEFAULT: "#d97706",
          dark: "#b45309",
        },
        danger: {
          light: "#ef4444",
          DEFAULT: "#dc2626",
          dark: "#b91c1c",
        },
        "dashboard-bg": {
          light: "#f9fafb",
          dark: "#111827",
        },
        "card-bg": {
          light: "#ffffff",
          dark: "#1f2937",
        },
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        "card-hover": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        dashboard: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 3s infinite",
      },
      fontSize: {
        "2xs": "0.625rem",
        "3xs": "0.5rem",
      },
      transitionDuration: {
        "400": "400ms",
      },
    },
  },
  plugins: [],
}

