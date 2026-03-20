import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import markdown from "./vite-plugin-markdown";

export default defineConfig({
  plugins: [markdown(), react()],
  base: "/bloglob/",
  server: {
    port: 5173,
  },
});
