import { RouteRecordRaw } from 'vue-router';
import { RouteNames } from './types/route-names';
import { validatePage } from './guards/validatePage';

// ГЛАВНЫЕ СТРАНИЦЫ
const HomePage = () => import('@/components/pages/HomePage.vue');
const ProjectPage = () => import('@/components/pages/ProjectPage.vue');
const Profile = () => import('@/components/pages/ProfilePage.vue');

// ВЛОЖЕННЫЕ СТРАНИЦЫ
// профиль пользователя
const ProfileUserInformation = () =>
  import('@/components/ProfileUserInformation.vue');
const UserSkills = () => import('@/components/UserSkills.vue');
const UserProjects = () => import('@/components/UserProjects.vue');
const UserRequests = () => import('@/components/UserRequests.vue');

// страницы проекта
const ProjectRequestsList = () =>
  import('@/components/ProjectRequestsList.vue');
const ProjectDetails = () => import('@/components/ProjectDetails.vue');

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: HomePage,
    name: RouteNames.HOME,
    meta: {
      type: 'main-nav',
      index: 0,
      title: 'Все проекты',
    },
    beforeEnter: [validatePage],
  },
  {
    path: '/project/:id',
    component: ProjectPage,
    name: RouteNames.PROJECT,
    children: [
      {
        path: '',
        name: RouteNames.PROJECT_DETAILS,
        component: ProjectDetails,
        meta: {
          title: 'О проекте',
        },
      },
      {
        path: 'requests',
        name: RouteNames.PROJECT_REQUESTS_LIST,
        component: ProjectRequestsList,
        meta: {
          title: 'Список заявок',
        },
      },
    ],
  },
  {
    path: '/profile',
    name: RouteNames.PROFILE,
    component: Profile,
    meta: {
      title: 'Профиль пользователя',
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        name: RouteNames.USER_INFO,
        component: ProfileUserInformation,
        meta: {
          type: 'user-nav',
          index: 0,
          title: 'Мой профиль',
        },
      },
      {
        path: 'requests',
        name: RouteNames.USER_REQUESTS,
        component: UserRequests,
        meta: {
          type: 'user-nav',
          index: 1,
          title: 'Мои заявки',
        },
      },
      {
        path: 'projects',
        name: RouteNames.USER_PROJECTS,
        component: UserProjects,
        meta: {
          type: 'user-nav',
          index: 2,
          title: 'Мои проекты',
        },
      },
      {
        path: 'skills',
        name: RouteNames.USER_SKILLS,
        component: UserSkills,
        meta: {
          type: 'user-nav',
          index: 3,
          title: 'Навыки',
        },
      },
    ],
  },
  {
    path: '/faq',
    redirect: { name: RouteNames.HOME },
    name: RouteNames.FAQ,
    meta: {
      type: 'main-nav',
      index: 1,
      title: 'вопрос-ответ',
    },
  },
  {
    path: '/contacts',
    name: RouteNames.CONTACTS,
    redirect: { name: RouteNames.HOME },
    meta: {
      type: 'main-nav',
      index: 2,
      title: 'контакты',
    },
  },
];
