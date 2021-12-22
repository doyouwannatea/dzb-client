import { RouteRecordRaw } from 'vue-router';
import { validateProjectPage } from './guards/validateProjectPage';
import { RouteNames } from './types/route-names';
import { updateProjectPage } from './guards/updateProjectPage';

const HomePage = () => import('../components/pages/HomePage.vue');
const ProjectPage = () => import('../components/pages/ProjectPage.vue');

export const routes: RouteRecordRaw[] = [
  {
    path: '/:page?',
    component: HomePage,
    name: RouteNames.HOME,
    meta: {
      nav: 'Все проекты',
    },
    beforeEnter: [validateProjectPage, updateProjectPage],
  },
  {
    path: '/project/:id',
    component: ProjectPage,
    name: RouteNames.PROJECT,
  },
  {
    path: '/faq',
    redirect: { name: RouteNames.HOME },
    name: RouteNames.FAQ,
    meta: {
      nav: 'вопрос-ответ',
    },
  },
  {
    path: '/contacts',
    name: RouteNames.CONTACTS,
    redirect: { name: RouteNames.HOME },
    meta: {
      nav: 'контакты',
    },
  },
];
