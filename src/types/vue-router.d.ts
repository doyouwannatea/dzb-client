import 'vue-router';

type UserRole = 'student' | 'teacher';

declare module 'vue-router' {
  interface RouteMeta {
    type?: 'main-nav' | 'user-nav';
    role?: UserRole[];
    order?: number;
    title: string;
    requiresAuth?: boolean;
  }
}
