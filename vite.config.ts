import { fileURLToPath, URL } from 'node:url';
import pluginChecker from 'vite-plugin-checker';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), pluginChecker({ typescript: true })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        /**
         * Generates manual chunks for Vite's build step.
         *
         * @param {string} moduleId - The ID of the module.
         * @return {string | undefined} The name of the chunk, or undefined if the module should not be chunked.
         */
        manualChunks(moduleId: string): string | undefined {
          const modulePath = moduleId.split('node_modules/');
          if (modulePath.length > 1) {
            const [chunkName] = modulePath[1].split('/');
            return chunkName;
          }
          return undefined;
        },
      },
    },
  },
});
