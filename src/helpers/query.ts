import { ProjectFilters } from '@/api/ProjectApi/ProjectApiType';
import { LocationQuery, LocationQueryValue } from 'vue-router';
import { removeDuplicates } from './array';

// кодирует поля объекта в строку для передачи в search params
export function encodeProjectFiltersToQueries(
  filters: ProjectFilters,
): Record<keyof ProjectFilters, string> {
  return {
    title: filters.title?.toString() || '',
    date_end: filters.date_end?.toString() || '',
    date_start: filters.date_start?.toString() || '',
    page: filters.page?.toString() || '',
    type: JSON.stringify(filters.type),
    state: JSON.stringify(filters.state),
    supervisor: JSON.stringify(filters.supervisor),
    tags: JSON.stringify(filters.tags),
    difficulty: JSON.stringify(filters.difficulty),
  };
}

// декодирует ProjectFilters из search params
export function decodeFiltersFromQueries(query: LocationQuery): ProjectFilters {
  return {
    title: query.title?.toString() || '',
    date_end: query.date_end?.toString() || '',
    date_start: query.date_start?.toString() || '',
    page: Number(query.page),
    type: removeDuplicates(
      Array.from(parseLocationQueryValue(query.type)).map(Number),
    ),
    state: removeDuplicates(
      Array.from(parseLocationQueryValue(query.state)).map(Number),
    ),
    supervisor: removeDuplicates(
      Array.from(parseLocationQueryValue(query.supervisor)).map(Number),
    ),
    tags: removeDuplicates(
      Array.from(parseLocationQueryValue(query.tags)).map(Number),
    ),
    difficulty: removeDuplicates(
      Array.from(parseLocationQueryValue(query.difficulty)).map(Number),
    ),
  };
}

export function parseLocationQueryValue<T>(
  query: LocationQueryValue | LocationQueryValue[],
): T | string {
  try {
    return JSON.parse(query?.toString() || '""');
  } catch (error) {
    return '';
  }
}
