import vue from '@vitejs/plugin-vue';
import { join } from 'path';
import { defineConfig } from 'vite';
import { BASE_URL } from './src/constants';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': join(__dirname, 'src'),
    },
  },
  base: BASE_URL,
});
