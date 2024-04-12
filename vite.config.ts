import { fileURLToPath, URL } from 'node:url';
import pluginChecker from 'vite-plugin-checker';
import type { ViteSentryPluginOptions } from 'vite-plugin-sentry';
import viteSentry from 'vite-plugin-sentry';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dotenv from 'dotenv';
dotenv.config();
/*
  Configure sentry plugin
*/
const sentryConfig: ViteSentryPluginOptions = {
  authToken: process.env.VITE_SENTRY_AUTH_TOKEN,
  url: process.env.VITE_SENTRY_API_BASE_URL,
  org: process.env.VITE_SENTRY_ORG,
  project: process.env.VITE_SENTRY_PROJECT,
  release: '1.0',
  // legacyErrorHandlingMode: true, <- warn about sentry errors instead of fail
  // cleanSourcemapsAfterUpload: true, <- delete generated sourcemap files after complete
  deploy: {
    env: 'production',
  },
  setCommits: {
    auto: true,
  },
  sourceMaps: {
    include: ['./dist/assets'],
    ignore: ['./node_modules/**', 'vite.config.ts'],
    urlPrefix: '~/assets',
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    pluginChecker({ typescript: true }),
    process.env.NODE_ENV === 'production' ? viteSentry(sentryConfig) : [],
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // required: tells vite to create source maps
    sourcemap: true,
    rollupOptions: {
      // output: {
      //   /**
      //    * Generates manual chunks for Vite's build step.
      //    *
      //    * @param {string} moduleId - The ID of the module.
      //    * @return {string | undefined} The name of the chunk, or undefined if the module should not be chunked.
      //    */
      //   manualChunks(moduleId: string): string | undefined {
      //     const modulePath = moduleId.split('node_modules/');
      //     if (modulePath.length > 1) {
      //       const [chunkName] = modulePath[1].split('/');
      //       return chunkName;
      //     }
      //     return undefined;
      //   },
      // },
    },
  },
});
