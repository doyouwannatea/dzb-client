import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import { prodPath } from './helpers';
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
      path: prodPath('/'),
      component: HomePage,
      name: 'home',
    },
    {
      path: prodPath('/project'),
      component: ProjectPage,
      name: 'project',
    },
  ],
});

createApp(App).use(router).mount('#app');
