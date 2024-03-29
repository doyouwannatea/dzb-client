import { createPinia } from 'pinia';
import { createApp, markRaw } from 'vue';
import { VueQueryPlugin } from 'vue-query';
import Toast, { POSITION, PluginOptions } from 'vue-toastification';
import App from './App.vue';
import { router } from './router';

const pinia = createPinia();
const app = createApp(App);

const toastOptions: PluginOptions = {
  position: POSITION.TOP_RIGHT,
};

pinia.use(({ store }) => {
  store.$router = markRaw(router);
});
app.use(Toast, toastOptions);
app.use(router);
app.use(VueQueryPlugin);
app.use(pinia);
app.mount('#app');
