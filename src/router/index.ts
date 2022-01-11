import { createRouter, createWebHashHistory } from 'vue-router';
// import { LAYOUT } from '/@/Constant';
// import type { App } from 'vue';

console.log(123);
const routes = [
  { path: '/', component: () => import('/@/views/Home.vue') },
  { path: '/home', component: () => import('/@/views/Home.vue') },
  {
    path: '/about',
    component: () => import('/@/views/About.vue'),
  },
  { path: '/test', component: () => import('/@/views/Test.vue') },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});
export default router;
