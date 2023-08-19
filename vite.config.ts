// import type { UserConfig, ConfigEnv } from 'vite';
import { loadEnv } from 'vite';
// import vue from '@vitejs/plugin-vue'

import type { UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// import { loadEnv } from 'vite';
import path, { resolve } from 'path';

// import { generateModifyVars } from './build/config/themeConfig';
// import { createProxy } from './build/vite/proxy';
import { wrapperEnv } from './build/utils';
// import { createVitePlugins } from './build/vite/plugin';
// import { OUTPUT_DIR } from './build/constant';

//* 開發模式時: mode = "development"
//* 打包模式時: mode = "production"
export default ({ mode }): UserConfig => {
  // export default (): UserConfig => {
  const root = process.cwd();

  //* env是.env內的參數但都是字串
  const env = loadEnv(mode, root);
  /**
   ** 將env轉成實際的型態,就可以透過viteEnv.xxx去取得env參數,
   ** 並且需要去global.d.ts去修改 interface ViteEnv 的內容。
   */
  const viteEnv = wrapperEnv(env);

  // const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE, VITE_LEGACY } = viteEnv;

  // const isBuild = command === 'build';

  return {
    // base: VITE_PUBLIC_PATH,
    root,
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    server: {
      //* 指定开发服务器端口。注意：如果端口已经被使用，Vite 会自动尝试下一个可用的端口，所以这可能不是开发服务器最终监听的实际端口。
      port: viteEnv.VITE_PORT,
      proxy: {
        '/api': {
          target: viteEnv.VITE_API_DOMAIN,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        '/test': {
          target: 'https://api.publicapis.org',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/test/, ''),
        },
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            // Used for global import to avoid the need to import each style file separately
            // reference:  Avoid repeated references
            hack: `true; @import (reference) "${resolve('src/design/config.less')}";`,
            // ...generateModifyVars(),
          },
          javascriptEnabled: true,
        },
      },
      postcss: {
        plugins: [
          // 去除打包警告，"@charset" must be the first
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove();
                }
              },
            },
          },
        ],
      },
    },
    plugins: [vue()],
  };
};
