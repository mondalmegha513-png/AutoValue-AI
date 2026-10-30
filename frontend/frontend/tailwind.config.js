/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#06101D",       // Dark navy main background
          card: "#0B1B30",     // Card background
          cardBorder: "#132E4F", // Card thin blue border
          cardHover: "#0E2440", // Hover state
          blue: "#087BFF",     // Electric blue
          blueHover: "#0066DD",// Darker electric blue
          cyan: "#00B9FF",     // Cyan glow / accents
          textMain: "#EAF4FF", // Crisp white/ice text
          textMuted: "#8DA7C4",// Subtext / muted bluish grey
          darkBorder: "#14263D",// Subtle separator borders
          success: "#10B981",  // Green for positive deltas/confidence
          danger: "#EF4444",   // Red for negative deltas
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 20px -3px rgba(0, 185, 255, 0.35)',
        'glow-blue': '0 0 20px -3px rgba(8, 123, 255, 0.4)',
        'card-subtle': '0 4px 20px 0 rgba(0, 0, 0, 0.35)',
      }
    },
  },
  plugins: [],
}

