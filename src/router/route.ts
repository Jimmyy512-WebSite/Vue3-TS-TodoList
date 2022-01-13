import { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    // component: () => import('/@/views/TodoList.vue'),
    redirect: '/pinia_test',
  },
  {
    path: '/home',
    component: () => import('/@/views/Home.vue'),
  },
  {
    path: '/about',
    component: () => import('/@/views/About.vue'),
  },
  {
    path: '/test',
    component: () => import('/@/views/Test.vue'),
  },
  {
    path: '/pinia_test',
    component: () => import('/@/views/PiniaTest.vue'),
  },
];
