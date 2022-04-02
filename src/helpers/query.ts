import { ProjectFilters } from '@/models/Project';
import { ProjectFiltersLocationQuery } from '@/models/LocationQuery';
import { LocationQueryValue } from 'vue-router';
import { toString } from './string';

function locationQueryValueToNumber(
  queryValue: LocationQueryValue | LocationQueryValue[],
): number {
  if (queryValue === null) return NaN;
  return parseInt(queryValue.toString());
}

function locationQueryValueToArrayNumber(
  queryValue: LocationQueryValue | LocationQueryValue[],
): number[] {
  try {
    return JSON.parse(toString(queryValue)).map(locationQueryValueToNumber);
  } catch (error) {
    return [];
  }
}

export function locationQueryToProjectFilters(
  query: ProjectFiltersLocationQuery,
): ProjectFilters {
  return {
    title: toString(query.title),
    date_end: toString(query.date_end),
    date_start: toString(query.date_start),
    page: locationQueryValueToNumber(query.page),
    type: locationQueryValueToArrayNumber(query.type),
    state: locationQueryValueToArrayNumber(query.state),
    supervisor: locationQueryValueToArrayNumber(query.supervisor),
    skills: locationQueryValueToArrayNumber(query.skills),
    difficulty: locationQueryValueToArrayNumber(query.difficulty),
  };
}

export function projectFiltersToSearchParams(
  filters: ProjectFilters,
): Record<keyof ProjectFilters, string> {
  return {
    title: toString(filters.title),
    date_end: toString(filters.date_end),
    date_start: toString(filters.date_start),
    page: toString(filters.page),
    type: toString(filters.type),
    state: toString(filters.state),
    supervisor: toString(filters.supervisor),
    skills: toString(filters.skills),
    difficulty: toString(filters.difficulty),
  };
}
