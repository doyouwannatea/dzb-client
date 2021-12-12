import vue from '@vitejs/plugin-vue';
import { join } from 'path';
import { defineConfig } from 'vite';
import { prodPath } from './src/helpers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': join(__dirname, 'src'),
    },
  },
  base: prodPath('/'),
});
