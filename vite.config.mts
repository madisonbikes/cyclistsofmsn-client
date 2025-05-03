import { UserConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default {
  build: {
    chunkSizeWarningLimit: 2048,
  },
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
  base: "/",
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
  test: {
    setupFiles: ["src/setupTests.ts"],
    environment: "jsdom",
    // resolves https://stackoverflow.com/questions/78989267/vitest-unknown-file-extension-css
    pool: "vmThreads",
  },
} satisfies UserConfig;
