import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import CardPage from '@/components/page/CardPage.vue';
import SetupPage from '@/components/page/SetupPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/card/:cardId/:pageNumber?',
    name: 'card',
    props: true,
    component: CardPage
  },
  {
    path: '/setup',
    name: 'setup',
    component: SetupPage
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
