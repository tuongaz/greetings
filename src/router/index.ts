import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Card from '../components/greeting/Card.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Card,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
