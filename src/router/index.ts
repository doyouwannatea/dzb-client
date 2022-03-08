import { createRouter, createWebHistory } from 'vue-router';
import { requiresAuth } from './guards/requiresAuth';
import { routes } from './routes';

export const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: routes,
});

router.beforeEach(requiresAuth);
