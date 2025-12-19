/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        'prompt-bg': '#FDFBF7', // Warm white / Eggshell base
        'prompt-card': '#FFFFFF',
        'prompt-heading': '#2D1B18', // Very dark brown for headings (High contrast)
        'prompt-text': '#5D4037', // Softer brown for body text (Reading comfort)
        'prompt-text-muted': '#A1887F', // Muted brown/gray for secondary text
        'prompt-accent': '#8D6E63', // Primary Earthy Brown
        'prompt-accent-dark': '#5D4037', // Darker interaction state
        'prompt-border': '#EAE0D5', // Soft beige border
        'prompt-subtle': '#FAF8F6', // Very subtle background variation
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(141, 110, 99, 0.15)', // Custom earthy shadow
        'button': '0 2px 10px rgba(141, 110, 99, 0.2)',
        'button-hover': '0 8px 20px rgba(141, 110, 99, 0.3)',
      }
    },
  },
  plugins: [],
}







