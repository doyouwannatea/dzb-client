import { createRouter, createWebHistory } from 'vue-router';
import { BASE_URL } from './constants';

const HomePage = () => import('./pages/HomePage.vue');
const ProjectPage = () => import('./pages/ProjectPage.vue');

export const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
  history: createWebHistory(BASE_URL),
  routes: [
    {
      path: '/',
      component: HomePage,
      name: 'home',
    },
    {
      path: '/project',
      component: ProjectPage,
      name: 'project',
    },
  ],
});
