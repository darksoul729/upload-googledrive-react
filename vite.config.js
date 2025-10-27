import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Konfigurasi lengkap untuk Vite + React + Ngrok
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // gunakan @ untuk import folder src
    },
  },
  server: {
    host: "0.0.0.0", // agar bisa diakses dari luar (misalnya via ngrok)
    allowedHosts: [
      "d13d55731b23.ngrok-free.app", // domain ngrok kamu tanpa https://
    ],
    port: 5173, // port default vite (bisa diubah kalau perlu)
    strictPort: true, // pastikan pakai port yang sama (tidak acak)
  },
});
23