/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import solid from "@solidjs/vite-plugin";

export default defineConfig({
  plugins: [solid()],

  test: {
    environment: "happy-dom",
    "include": ["src/**/*.spec.ts", "src/**/*.spec.tsx"],
  },
});
