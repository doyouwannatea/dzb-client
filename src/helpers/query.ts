import { ProjectFilters } from '@/models/Project';
import { uniq, toArray, pipe, toNumber, toString } from 'lodash/fp';
import { LocationQuery, LocationQueryValue } from 'vue-router';
import { mapNumber } from './array';

export function parseLocationQueryValue<T>(
  query: LocationQueryValue | LocationQueryValue[],
): T | string {
  try {
    return JSON.parse(query?.toString() || '""');
  } catch (error) {
    return '';
  }
}

const parseQueryArray = pipe(parseLocationQueryValue, toArray, uniq);
const queryArrayToNumber = pipe(parseQueryArray, mapNumber);

// кодирует поля объекта в строку для передачи в search params
export function encodeProjectFiltersToQueries(
  filters: ProjectFilters,
): Record<keyof ProjectFilters, string> {
  return {
    title: toString(filters.title),
    date_end: toString(filters.date_end),
    date_start: toString(filters.date_start),
    page: toString(filters.page),
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
    title: toString(query.title),
    date_end: toString(query.date_end),
    date_start: toString(query.date_start),
    page: toNumber(query.page),
    type: queryArrayToNumber(query.type),
    state: queryArrayToNumber(query.state),
    supervisor: queryArrayToNumber(query.supervisor),
    tags: queryArrayToNumber(query.tags),
    difficulty: queryArrayToNumber(query.difficulty),
  };
}
