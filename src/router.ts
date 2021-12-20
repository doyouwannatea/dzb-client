import { createRouter, createWebHistory } from 'vue-router';

const HomePage = () => import('./components/pages/HomePage.vue');
const ProjectPage = () => import('./components/pages/ProjectPage.vue');

export const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: '/:page?',
      component: HomePage,
      name: 'home',
      meta: {
        nav: 'Все проекты',
      },
      beforeEnter(to, from, next) {
        const page = Number(to.params.page);
        if (isNaN(page) || page < 1) {
          return next({ name: 'home', params: { page: '1' } });
        }
        return next();
      },
    },
    {
      path: '/project/:id',
      component: ProjectPage,
      name: 'project',
    },
    {
      path: '/faq',
      redirect: { name: 'home' },
      name: 'faq',
      meta: {
        nav: 'вопрос-ответ',
      },
    },
    {
      path: '/contacts',
      name: 'contacts',
      redirect: { name: 'home' },
      meta: {
        nav: 'контакты',
      },
    },
  ],
});
