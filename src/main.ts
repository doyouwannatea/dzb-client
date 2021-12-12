import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import { BASE_URL } from './constants';
import HomePage from './pages/HomePage.vue';
import ProjectPage from './pages/ProjectPage.vue';

const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
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

createApp(App).use(router).mount('#app');
