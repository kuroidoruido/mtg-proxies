/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import devtools from "solid-devtools/vite";

export default defineConfig({
  plugins: [
    devtools({
      autoname: true,
      locator: {
        targetIDE: "vscode",
        componentLocation: true,
        jsxLocation: true,
      },
    }),
    solid(),
  ],

  test: {
    environment: "happy-dom",
    "include": ["src/**/*.spec.ts", "src/**/*.spec.tsx"],
  },
});
