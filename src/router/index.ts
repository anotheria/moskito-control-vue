import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Dashboard from '@/views/Dashboard.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
