import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import HomePage from './pages/HomePage.vue';
import ProjectPage from './pages/ProjectPage.vue';

const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 };
  },
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HomePage,
    },
    {
      path: '/project',
      component: ProjectPage,
    },
  ],
});

createApp(App).use(router).mount('#app');
