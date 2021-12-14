import vue from '@vitejs/plugin-vue';
import { join } from 'path';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [vue()],
    resolve: {
      alias: {
        '@': join(__dirname, 'src'),
      },
    },
    base: process.env.VITE_BASE_URL,
  });
};
