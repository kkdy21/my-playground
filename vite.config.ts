import { defineConfig, loadEnv, type ConfigEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default ({ command, mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd(), "");

  console.log(command, mode);
  console.log(env);

  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  });
};
