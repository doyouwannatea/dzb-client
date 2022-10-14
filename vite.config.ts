import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import { join } from 'path';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [vue(), svgLoader()],
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
          entryFileNames: `assets/[name].js`,
          chunkFileNames: `assets/[name].js`,
          assetFileNames: `assets/[name].[ext]`,
        },
      },
    },
    server: {
      host: true,
    },
  });
};
