import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Dashboard from '@/views/dashboard/Dashboard.vue';
import Settings from '@/views/settings/Settings.vue';

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
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
