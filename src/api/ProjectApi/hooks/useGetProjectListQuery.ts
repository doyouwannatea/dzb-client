import { UseQueryOptions, useQuery } from 'vue-query';
import { projectApi } from '@/api/ProjectApi';
import { ProjectFilters } from '@/models/Project';
import ProjectApiType, { OnDownloadProgress } from '../ProjectApiType';
import { MaybeRef, get } from '@vueuse/core';

type TQueryFnData = Awaited<ReturnType<ProjectApiType['filterProjectList']>>;

export type UseGetSingleProjectQueryOptions<T = TQueryFnData> = UseQueryOptions<
  TQueryFnData,
  unknown,
  T,
  UseGetSingleProjectQueryKey
>;

export type UseGetProjectListQueryData = {
  projectFiltersRef: MaybeRef<ProjectFilters>;
  onDownloadProgressRef?: MaybeRef<OnDownloadProgress>;
};

export type UseGetSingleProjectQueryKey = [
  typeof USE_GET_PROJECT_LIST_QUERY_KEY,
  MaybeRef<ProjectFilters>,
];

export const USE_GET_PROJECT_LIST_QUERY_KEY = 'USE_GET_PROJECT_LIST_QUERY_KEY';

export const useProjectListQueryKey = (
  projectFilters: MaybeRef<ProjectFilters>,
): UseGetSingleProjectQueryKey => [
  USE_GET_PROJECT_LIST_QUERY_KEY,
  projectFilters,
];

export const useGetProjectListQuery = <T = TQueryFnData>(
  { projectFiltersRef, onDownloadProgressRef }: UseGetProjectListQueryData,
  options?: UseGetSingleProjectQueryOptions<T>,
) => {
  return useQuery(
    useProjectListQueryKey(projectFiltersRef),
    () => {
      const projectFilters = get(projectFiltersRef);
      const onDownloadProgress = get(onDownloadProgressRef);
      return projectApi.filterProjectList(projectFilters, onDownloadProgress);
    },
    {
      staleTime: Infinity,
      ...options,
    },
  );
};
