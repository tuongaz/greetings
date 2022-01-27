import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import CardPage from '@/components/page/CardPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/card/:cardId/:pageNumber?',
    name: 'Card',
    component: CardPage
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
