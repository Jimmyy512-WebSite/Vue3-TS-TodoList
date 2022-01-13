import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from './route';
// import { LAYOUT } from '/@/Constant';

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});
export default router;
