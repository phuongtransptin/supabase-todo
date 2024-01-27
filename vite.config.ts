import { defineConfig, loadEnv } from "vite";

import vue from "@vitejs/plugin-vue";

// // https://vitejs.dev/config/
export default (config: { mode: string }) => {
  process.env = {
    ...process.env,
    ...loadEnv(config.mode, process.cwd(), ""),
  };

  return defineConfig({
    plugins: [vue()],

    optimizeDeps: {
      exclude: ["vue-virtual-scroller"],
    },

    server: {
      port: 8206,
    },
  });
};
