// Composables
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Articles',
        component: () => import('@/views/Article/index.vue'),
      },
      {
        path: '/articles/:id',
        name: 'Articles/:id',
        component: () => import('@/views/Article/ArticleDetails.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
