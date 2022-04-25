import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    type?: 'main-nav' | 'user-nav';
    order?: number;
    title: string;
    requiresAuth?: boolean;
  }
}
