declare type Recordable<T = any> = Record<string, T>;

/**
 ** 給vite.config.ts 型別定義
 */
declare interface ViteEnv {
  VITE_PORT: number;
  VITE_API_DOMAIN: string;
}

/**
 ** 給import.meta.env.xxx 型別定義
 */
interface ImportMetaEnv {
  readonly VITE_PORT: number;
  readonly VITE_API_DOMAIN: string;
}
