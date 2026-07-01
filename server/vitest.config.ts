import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node", // for backend tests
    globals: true, // allows describe/it/expect without imports
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
