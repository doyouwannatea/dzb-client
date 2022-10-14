import 'vue-router';

type UserRole = 'student' | 'teacher';
type NavType = 'main-nav' | 'user-nav' | 'mobile-nav';

declare module 'vue-router' {
  interface RouteMeta {
    type?: NavType[];
    role?: UserRole[];
    order?: number;
    title: string;
    requiresAuth?: boolean;
    svg?: string;
  }
}
