import { loadEnv, defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';
import path from 'path';
import vueDevTools from 'vite-plugin-vue-devtools';

//* 開發模式時: mode = "development"
//* 打包模式時: mode = "production"

export default defineConfig(async ({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd());
  const UnoCss = await import('unocss/vite').then((mod) => mod.default);
  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 3102, // 确保端口与 Dockerfile 中 EXPOSE 的端口相匹配
      host: true,
      strictPort: true, // 确保如果端口已被占用，Vite 不会尝试另一个端口
      watch: {
        usePolling: true, // 通过启用轮询，Vite 不再依赖文件系统事件，而是定期检查文件是否发生了变化。
      },
      proxy: {
        '/api': {
          target: env.VITE_API_DOMAIN,
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
    plugins: [vue(), vueDevTools(), UnoCss()],
  };
});
