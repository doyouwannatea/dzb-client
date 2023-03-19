import { RouteLocationRaw } from 'vue-router';
import { RouteNames } from '../types/route-names';

export function toProjectRoute(projectId: number): RouteLocationRaw {
  return { name: RouteNames.PROJECT_DETAILS, params: { id: projectId } };
}

export function toProjectCreateRoute(projectId?: number): RouteLocationRaw {
  return { name: RouteNames.USER_PROJECT_CREATE, params: { id: projectId } };
}
