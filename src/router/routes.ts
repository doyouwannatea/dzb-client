import { RouteRecordRaw } from 'vue-router';
import { RouteNames } from './types/route-names';

// Project page
const ProjectPage = () => import('@/pages/ProjectPage/index.vue');
const ProjectParticipationList = () =>
  import('@/pages/ProjectPage/ProjectParticipationList.vue');
const ProjectDetails = () => import('@/pages/ProjectPage/ProjectDetails.vue');

// User page
const UserPage = () => import('@/pages/UserPage/index.vue');
const UserProfile = () => import('@/pages/UserPage/UserProfile.vue');
const UserSkills = () => import('@/pages/UserPage/UserSkills.vue');
const UserProjects = () => import('@/pages/UserPage/UserProjects.vue');
const UserParticipations = () =>
  import('@/pages/UserPage/UserParticipations.vue');

// Home page
const HomePage = () => import('@/pages/HomePage.vue');

// FAQ page
const FaqPage = () => import('@/pages/FaqPage.vue');

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: HomePage,
    name: RouteNames.HOME,
    meta: {
      type: 'main-nav',
      order: 0,
      title: 'Все проекты',
    },
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
        path: 'participations',
        name: RouteNames.PROJECT_PARTICIPATIONS,
        component: ProjectParticipationList,
        meta: {
          title: 'Список заявок',
        },
      },
    ],
  },
  {
    path: '/profile',
    name: RouteNames.PROFILE,
    component: UserPage,
    meta: {
      title: 'Профиль пользователя',
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        name: RouteNames.USER_INFO,
        component: UserProfile,
        meta: {
          type: 'user-nav',
          order: 0,
          title: 'Мой профиль',
        },
      },
      {
        path: 'participations',
        name: RouteNames.USER_PARTICIPATIONS,
        component: UserParticipations,
        meta: {
          type: 'user-nav',
          order: 1,
          title: 'Мои заявки',
          role: ['student'],
        },
      },
      // {
      //   path: 'projects',
      //   name: RouteNames.USER_PROJECTS,
      //   component: UserProjects,
      //   meta: {
      //     type: 'user-nav',
      //     order: 2,
      //     title: 'Мои проекты',
      //   },
      // },
      // {
      //   path: 'skills',
      //   name: RouteNames.USER_SKILLS,
      //   component: UserSkills,
      //   meta: {
      //     type: 'user-nav',
      //     order: 3,
      //     title: 'Навыки',
      //     role: ['student'],
      //   },
      // },
    ],
  },
  {
    path: '/faq',
    component: FaqPage,
    name: RouteNames.FAQ,
    meta: {
      type: 'main-nav',
      order: 1,
      title: 'вопрос-ответ',
    },
  },
  // {
  //   path: '/contacts',
  //   name: RouteNames.CONTACTS,
  //   redirect: { name: RouteNames.HOME },
  //   meta: {
  //     type: 'main-nav',
  //     order: 2,
  //     title: 'контакты',
  //   },
  // },
];
