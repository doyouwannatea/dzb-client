import { ProjectFilters } from '@/models/Project';
import { ProjectFiltersLocationQuery } from '@/models/LocationQuery';
import { LocationQueryValue } from 'vue-router';
import { toString } from './string';
import { Difficulty } from '@/models/ProjectDifficulty';

function locationQueryValueToNumber(
  queryValue: LocationQueryValue | LocationQueryValue[],
): number {
  if (queryValue === null) return NaN;
  return parseInt(toString(queryValue));
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
    page: locationQueryValueToNumber(query.page),
    state: locationQueryValueToArrayNumber(query.state),
    skills: locationQueryValueToArrayNumber(query.skills),
    difficulty: locationQueryValueToArrayNumber(
      query.difficulty,
    ) as Difficulty[],
    specialties: locationQueryValueToArrayNumber(query.specialties),
  };
}

export function projectFiltersToSearchParams(
  filters: ProjectFilters,
): Record<keyof ProjectFilters, string> {
  return {
    title: toString(filters.title),
    page: toString(filters.page),
    state: toString(filters.state),
    skills: toString(filters.skills),
    difficulty: toString(filters.difficulty),
    specialties: toString(filters.specialties),
  };
}
