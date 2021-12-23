import { ProjectFilters } from '@/store/state';
import { LocationQuery, LocationQueryValue } from 'vue-router';
import { removeDuplicates } from './array';

// кодирует поля объекта в строку для передачи в search params
export function encodeFilterQueries(
  searchParams: ProjectFilters,
): Record<keyof ProjectFilters, string> {
  return {
    type: JSON.stringify(searchParams.type) || '',
    state: JSON.stringify(searchParams.state) || '',
    supervisor: JSON.stringify(searchParams.supervisor) || '',
    tags: JSON.stringify(searchParams.tags) || '',
    date_start: searchParams.date_start || '',
    date_end: searchParams.date_end || '',
    difficulty: JSON.stringify(searchParams.difficulty) || '',
    title: searchParams.title || '',
  };
}

// декодирует ProjectFilters из search params
export function decodeFilterQueries(query: LocationQuery): ProjectFilters {
  return {
    title: query.title?.toString(),
    date_end: query.date_end?.toString(),
    date_start: query.date_start?.toString(),
    difficulty: removeDuplicates(
      Array.from(decodeObjectQuery(query.difficulty)).map(Number),
    ),
    state: removeDuplicates(
      Array.from(decodeObjectQuery(query.state)).map(Number),
    ),
    supervisor: removeDuplicates(
      Array.from(decodeObjectQuery(query.supervisor)).map(Number),
    ),
    tags: removeDuplicates(
      Array.from(decodeObjectQuery(query.tags)).map(Number),
    ),
    type: removeDuplicates(
      Array.from(decodeObjectQuery(query.type)).map(Number),
    ),
  };
}

export function decodeObjectQuery<T>(
  query: LocationQueryValue | LocationQueryValue[],
): T | string {
  try {
    return JSON.parse(query?.toString() || '""');
  } catch (error) {
    return '';
  }
}
