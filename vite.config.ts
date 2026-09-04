import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import path from "path"
import { configDefaults, defineConfig } from "vitest/config"

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler", {}]],
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    exclude: [...configDefaults.exclude, "e2e/**", "**/*.stories.ts", "**/*.stories.tsx"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules") && /recharts|d3-|victory|lodash/.test(id)) {
            return "charts"
          }
        },
      },
    },
    // The showcase eagerly imports the whole kit on one page; real apps
    // code-split per route and can lower this back to the default.
    chunkSizeWarningLimit: 700,
  },
})
