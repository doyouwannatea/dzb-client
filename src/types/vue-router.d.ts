import { UserRoleKey } from '@/models/User';
import 'vue-router';

type NavType = 'main-nav' | 'user-nav' | 'mobile-nav';

declare module 'vue-router' {
  interface RouteMeta {
    type?: NavType[];
    role?: UserRoleKey[];
    order?: number;
    title: string;
    requiresAuth?: boolean;
    svg?: string;
  }
}
