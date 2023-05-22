import { RouteLocationRaw } from 'vue-router';

export type Breadcrumb = {
  to?: RouteLocationRaw;
  back?: boolean;
  title: string;
};
