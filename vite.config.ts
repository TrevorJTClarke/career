import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { plugin as mdPlugin, Mode } from 'vite-plugin-markdown'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8000
  },
  plugins: [
    vue(),
    vueJsx(),
    mdPlugin({ mode: [Mode.HTML, Mode.TOC, Mode.VUE] }),
  ],
  build: {
    manifest: true,
    target: 'esnext',
    rollupOptions: {
      external: ['{}/window', '{}/document']
    }
  },
  define: {
    global: {},
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis'
      },
      // Enable esbuild polyfill plugins
      plugins: [
        // https://stackoverflow.com/questions/72267731/uncaught-in-promise-referenceerror-buffer-is-not-defined-in-vite-sveltekit-wi
        NodeGlobalsPolyfillPlugin({
          buffer: true
        })
      ]
    }
  },
});
