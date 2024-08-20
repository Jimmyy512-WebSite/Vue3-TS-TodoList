import vue from '@vitejs/plugin-vue';
import path from 'path';
import vueDevTools from 'vite-plugin-vue-devtools';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import fs from 'fs';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { loadEnv, defineConfig } from 'vite';

// 定義 element-plus 的目錄路徑, 解決 vite optimizeDeps 導致自動重新整理問題
const elementPlusDir = path.resolve(__dirname, 'node_modules', 'element-plus', 'es', 'components');
function getElementPlusComponents(dir: string) {
  const components: string[] = [];

  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      const stylePath = path.join(filePath, 'style', 'index.d.ts');
      if (fs.existsSync(stylePath)) {
        components.push(`element-plus/es/components/${file}/style/index`);
      }
    }
  });
  return components;
}
const elementPlusComponents = getElementPlusComponents(elementPlusDir);

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
    optimizeDeps: {
      include: [...elementPlusComponents],
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
    plugins: [
      vue(),
      vueDevTools(),
      UnoCss(),
      // AutoImport({
      //   imports: ['vue', 'vue-router', 'pinia'], // 自動導入 Vue, Vue Router 和 Pinia
      //   dts: 'auto-imports.d.ts', // 自動生成的 d.ts 文件的路徑
      //   // dirs: ['src/store/modules'], // 自動導入 store 模塊
      //   eslintrc: {
      //     enabled: true, // 生成 ESLint 配置
      //     filepath: './.eslintrc-auto-import.json', // 生成的 ESLint 配置文件路徑
      //     globalsPropValue: true,
      //   },
      // }),
      AutoImport({
        imports: ['vue', 'vuex', 'vue-router', 'vue-i18n'],
        dts: 'types/auto-imports.d.ts', // 指定 .d.ts 文件的路徑
        dirs: ['src/store/modules'], // 自動導入 store 模塊
        resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
      }),
      Components({
        dirs: ['src/components'],
        extensions: ['vue'],
        dts: 'types/components.d.ts', // 指定 .d.ts 文件的路徑
        directoryAsNamespace: true,
        deep: true,
        resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
      }),
    ],
  };
});
