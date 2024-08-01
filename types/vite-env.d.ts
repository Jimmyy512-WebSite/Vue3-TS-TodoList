/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_DOMAIN: string;
  // 其他环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
