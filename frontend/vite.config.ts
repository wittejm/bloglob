import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import markdown from "./vite-plugin-markdown";
import seo from "./vite-plugin-seo";
import githubProjects from "./vite-plugin-github-projects";

export default defineConfig({
  plugins: [githubProjects(), markdown(), react(), seo()],
  base: "/bloglob/",
  server: {
    port: 5173,
  },
});
