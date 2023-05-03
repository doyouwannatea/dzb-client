import { UseQueryOptions, useQuery } from 'vue-query';
import { MaybeRef, get } from '@vueuse/core';
import { projectApi } from '@/api/ProjectApi';
import { Project } from '@/models/Project';
import { DEFAULT_QUERY_STALE_TIME } from '@/api/baseKy';

type TQueryFnData = { project: Project; projectHistory: Project[] };

export type UseGetSingleProjectQueryOptions<T = TQueryFnData> = UseQueryOptions<
  TQueryFnData,
  unknown,
  T,
  UseGetSingleProjectQueryKey
>;

export type UseGetSingleProjectQueryKey = [
  typeof USE_GET_SINGLE_PROJECT_QUERY_KEY,
  MaybeRef<number>,
];

export const USE_GET_SINGLE_PROJECT_QUERY_KEY =
  'USE_GET_SINGLE_PROJECT_QUERY_KEY';

export const getSingleProjectQueryKey = (
  projectId: MaybeRef<number>,
): UseGetSingleProjectQueryKey => [USE_GET_SINGLE_PROJECT_QUERY_KEY, projectId];

export const useGetSingleProjectQuery = <T = TQueryFnData>(
  projectIdRef: MaybeRef<number>,
  options?: UseGetSingleProjectQueryOptions<T>,
) =>
  useQuery(
    getSingleProjectQueryKey(projectIdRef),
    async () => {
      const projectId = get(projectIdRef);
      const [project, projectHistory] = await Promise.all([
        projectApi.getSingleProject(projectId),
        projectApi.getProjectHistory(projectId),
      ]);
      return { project, projectHistory };
    },
    {
      staleTime: DEFAULT_QUERY_STALE_TIME,
      ...options,
    },
  );
