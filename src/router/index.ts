import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Dashboard from '@/views/dashboard/Dashboard.vue';
import Settings from '@/views/settings/Settings.vue';
import DataRepository from "@/views/datarepository/DataRepository.vue";

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
  {
    path: '/datarepository',
    name: 'Data Repository',
    component: DataRepository,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
