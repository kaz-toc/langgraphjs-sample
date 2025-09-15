import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig(({ mode }) => {
  // 環境変数を読み込み
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), cloudflare()],
    ssr: {
      external: ["@prisma/client"],
      noExternal: [],
    },
    optimizeDeps: {
      exclude: ["@prisma/client"],
    },
    define: {
      global: "globalThis",
      module: "{}",
      exports: "{}",
      "process.env.ANTHROPIC_API_KEY": JSON.stringify(env.ANTHROPIC_API_KEY),
      "process.env.OPENAI_API_KEY": JSON.stringify(env.OPENAI_API_KEY),
      "process.env.DATABASE_URL": JSON.stringify(env.DATABASE_URL),
    },
    server: {
      hmr: {
        overlay: false,
      },
    },
  };
});
