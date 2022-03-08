import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    type?: 'main-nav' | 'user-nav';
    index?: number;
    title: string;
    requiresAuth?: boolean;
  }
}
