/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_API_URL: string;
  readonly VITE_MOCK_API: 'true' | 'false';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
