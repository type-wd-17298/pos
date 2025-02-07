import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:3001", // ชี้ไปที่ Backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // ตัด /api ออกจาก path
      },
    },
  },
});
