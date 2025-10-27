import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";

// Buat __dirname di ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    "process.env": process.env, // agar process.env bisa dipakai di frontend
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true, // polyfill Buffer
        }),
      ],
    },
  },
  server: {
    host: "0.0.0.0", // akses dari luar (Ngrok)
    allowedHosts: [
      "d13d55731b23.ngrok-free.app", // domain Ngrok tanpa https://
    ],
    port: 5173,
    strictPort: true,
  },
});
