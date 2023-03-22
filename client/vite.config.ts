import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "path";
// import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
// import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    // , visualizer()
  ],
  resolve: {
    alias: {
      "@": path.resolve("./src"),
      // "./runtimeConfig": "./runtimeConfig.browser",
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
      // Enable esbuild polyfill plugins
      // plugins: [
      //   NodeGlobalsPolyfillPlugin({
      //     buffer: true,
      //   }),
      // ],
    },
  },
});
