import { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/todolist',
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
