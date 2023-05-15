import 'vue-router';
import { UserRoleKey } from '@/models/User';
import { RouteNames } from '@/router/types/route-names';

type NavType = 'main-nav' | 'user-nav' | 'mobile-nav';

declare module 'vue-router' {
  interface RouteMeta {
    type?: NavType[];
    role?: UserRoleKey[];
    order?: number;
    title: string;
    requiresAuth?: boolean;
    svg?: string;
    links?: {
      name: RouteNames;
      title: string;
      location: LocationAsRelativeRaw;
    }[];
  }
}
