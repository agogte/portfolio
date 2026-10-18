import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/portfolio/",
  plugins: [react(), tailwindcss()],
  server: { port: 3000 },
  preview: { port: 3000 },
  build: {
    outDir: "build",
    // Keeps the entry at static/js/main.<hash>.js, which src/freshness.js
    // looks for when deciding whether a newer deploy is live.
    rollupOptions: {
      output: {
        entryFileNames: "static/js/main.[hash].js",
        chunkFileNames: "static/js/[name].[hash].js",
        assetFileNames: "static/media/[name].[hash][extname]",
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
  },
});
