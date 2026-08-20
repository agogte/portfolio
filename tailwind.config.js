module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ground: "rgb(var(--sg-ground) / <alpha-value>)",
        raised: "rgb(var(--sg-raised) / <alpha-value>)",
        ink: "rgb(var(--sg-ink) / <alpha-value>)",
        muted: "rgb(var(--sg-muted) / <alpha-value>)",
        line: "rgb(var(--sg-line) / <alpha-value>)",
        accent: "rgb(var(--sg-accent) / <alpha-value>)",
        signal: "rgb(var(--sg-signal) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["Archivo", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      letterSpacing: {
        code: "0.16em",
        tightest: "-0.045em",
      },
      maxWidth: {
        shell: "1200px",
      },
    },
  },
  plugins: [],
};
