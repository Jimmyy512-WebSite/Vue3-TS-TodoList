export const routes = [
  {
    path: '/',
    component: () => import('/@/views/TodoList.vue'),
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
];
