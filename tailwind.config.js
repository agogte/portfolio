module.exports = {
  theme: {
    extend: {
      colors: {
        canvas: "rgb(var(--c-canvas) / <alpha-value>)",
        surface: "rgb(var(--c-surface) / <alpha-value>)",
        ink: "rgb(var(--c-ink) / <alpha-value>)",
        "ink-2": "rgb(var(--c-ink-2) / <alpha-value>)",
        "ink-3": "rgb(var(--c-ink-3) / <alpha-value>)",
        accent: "rgb(var(--c-accent) / <alpha-value>)",
        line: "var(--hairline)",
        fill: "var(--fill)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        shell: "1120px",
      },
      transitionTimingFunction: {
        DEFAULT: "var(--spring-snappy)",
      },
    },
  },
  plugins: [],
};
