import { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    // component: () => import('/@/views/TodoList.vue'),
    redirect: '/home',
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
    path: '/todolist',
    component: () => import('/@/views/TodoList.vue'),
  },
  {
    path: '/pinia_test',
    component: () => import('/@/views/PiniaTest.vue'),
  },
];
