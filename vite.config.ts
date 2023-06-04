/// <reference types="vitest" />
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { join } from 'path';
import { defineConfig, loadEnv } from 'vite';
import svgLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  process.env = { ...process.env, ...env };

  return defineConfig({
    plugins: [vue(), svgLoader(), vueJsx()],
    resolve: {
      alias: {
        '@': join(__dirname, 'src'),
        '@styles': join(__dirname, 'src/styles'),
      },
    },
    base: process.env.VITE_BASE_URL,
    build: {
      rollupOptions: {
        output: {
          entryFileNames: 'assets/[name].js',
          assetFileNames: (info) => {
            if (info.name.endsWith('.css')) return 'assets/[name].[ext]';
            return 'assets/[name]-[hash][extname]';
          },
          manualChunks: null,
        },
      },
    },
    server: {
      host: true,
      port: 3000,
    },
    test: {
      globals: true,
      environment: 'jsdom',
      coverage: {
        provider: 'c8',
        all: true,
      },
      typecheck: {
        checker: 'vue-tsc',
      },
    },
  });
};
