import { createRouter, createWebHistory } from 'vue-router';
import { checkUserRole } from './guards/checkUserRole';
import { fetchUserData } from './guards/fetchUserData';
import { requiresAuth } from './guards/requiresAuth';
import { routes } from './routes';
import { scrollBehavior } from './utils/scrollBehavior';

export const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  scrollBehavior,
  routes,
});

router.beforeEach(fetchUserData);
router.beforeEach(requiresAuth);
router.beforeEach(checkUserRole);
