import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from './route';
// import { LAYOUT } from '/@/Constant';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});
export default router;
