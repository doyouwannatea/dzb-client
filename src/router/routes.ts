import { RouteRecordRaw } from 'vue-router';
import { RouteNames } from './types/route-names';
import { validatePage } from './guards/validatePage';
import ProjectDetails from '@/components/ProjectDetails.vue';
import ProjectRequestsList from '@/components/ProjectRequestsList.vue';

const HomePage = () => import('../components/pages/HomePage.vue');
const ProjectPage = () => import('../components/pages/ProjectPage.vue');

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: HomePage,
    name: RouteNames.HOME,
    meta: {
      nav: true,
      title: 'Все проекты',
    },
    beforeEnter: [validatePage],
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
      nav: true,
      title: 'вопрос-ответ',
    },
  },
  {
    path: '/contacts',
    name: RouteNames.CONTACTS,
    redirect: { name: RouteNames.HOME },
    meta: {
      nav: true,
      title: 'контакты',
    },
  },
];
