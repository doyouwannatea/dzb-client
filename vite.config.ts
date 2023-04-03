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
    },
  });
};
