import { ImportMetaEnv } from './vite-env';

declare global {
  namespace NodeJS {
    type ProcessEnv = ImportMetaEnv;
  }
}
