import { createRouter, createWebHistory } from 'vue-router';
import { fetchUserData } from './guards/fetchUserData';
import { requiresAuth } from './guards/requiresAuth';
import { scrollBehavior } from './guards/scrollBehavior';
import { routes } from './routes';

export const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  scrollBehavior,
  routes,
});

router.beforeEach(fetchUserData);
router.beforeEach(requiresAuth);
