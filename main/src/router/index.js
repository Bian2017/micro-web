import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../App.vue'),
  },
  {
    path: '/react15', // 请求不同的路径，返回的都是App.vue
    component: () => import('../App.vue'),
  },
  {
    path: '/react16',
    component: () => import('../App.vue'),
  },
  {
    path: '/vue2',
    component: () => import('../App.vue'),
  },
  {
    path: '/vue3',
    component: () => import('../App.vue'),
  },
];

const router = (basename = '') =>
  createRouter({
    history: createWebHistory(basename),
    routes,
  });

export default router;
