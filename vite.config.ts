import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const repoName = "realsanjeev.github.io"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // NOTE(sanjeev): When deploying a repository other than `{github-username}.github.io`, explicitly define the base URL using the repository name.
  // base: `/${repoName}/`,
  base: "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    tailwindcss(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
