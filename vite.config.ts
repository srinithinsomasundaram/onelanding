import { defineConfig, loadEnv } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  Object.assign(process.env, env);

  return {
    server: {
      host: "0.0.0.0",
      allowedHosts: true,
    },
    plugins: [
      viteReact(),
      tailwindcss(),
      tsconfigPaths(),
    ],
  };
});
