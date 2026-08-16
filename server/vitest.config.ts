import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node", // for backend tests
    globals: true, // allows describe/it/expect without imports
    setupFiles: "./src/tests/setupTests.ts",
    fileParallelism: false,
    isolate: true,
  },
  resolve: {
    alias: {
      "@": "/src",
      "@shared": "../shared",
    },
  },
});
