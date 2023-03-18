import { createApp, markRaw } from 'vue';
import { createPinia } from 'pinia';
import Toast, { PluginOptions, POSITION } from 'vue-toastification';
import App from './App.vue';
import { router } from './router';

const pinia = createPinia();
const app = createApp(App);

const toastOptions: PluginOptions = {
  position: POSITION.BOTTOM_RIGHT,
};

pinia.use(({ store }) => {
  store.$router = markRaw(router);
});
app.use(Toast, toastOptions);
app.use(router);
app.use(pinia);
app.mount('#app');
