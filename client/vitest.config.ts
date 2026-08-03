import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: "./src/tests/setup.js",
  },
  //   plugins: [
  //     tailwindcss(),
  //     react(),
  //     tsconfigPaths({
  //       projects: ["./tsconfig.app.json"],
  //     }),
  //   ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@shared": path.resolve(__dirname, "../shared"),
      "@assets": path.resolve(__dirname, "./assets"),
    },
  },
});
