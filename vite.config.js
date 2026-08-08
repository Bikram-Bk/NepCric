import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const _dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(_dirname, "./src"),
      "@components": path.resolve(_dirname, "./src/components"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes("node_modules/react") ||
            id.includes("node_modules/react-dom")
          ) {
            return "react-vendor";
          }

          if (
            id.includes("node_modules/react-router-dom") ||
            id.includes("node_modules/react-router")
          ) {
            return "router-vendor";
          }

          if (id.includes("node_modules/lucide-react")) {
            return "ui-icons";
          }

          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
});
