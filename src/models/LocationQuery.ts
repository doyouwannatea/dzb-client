import { LocationQueryValue } from 'vue-router';
import { ProjectFilters } from './Project';

export type ProjectFiltersLocationQuery = Record<
  keyof ProjectFilters,
  LocationQueryValue | LocationQueryValue[]
>;
