import { UseQueryOptions, useQuery } from 'vue-query';
import { sharedApi } from '@/api/SharedApi';
import SharedApiType from '@/api/SharedApi/SharedApiType';
import { DEFAULT_QUERY_STALE_TIME } from '@/api/baseKy';

type TQueryFnData = Awaited<ReturnType<SharedApiType['getAllSupervisors']>>;

export type UseGetAllSupervisorsQueryOptions<T = TQueryFnData> =
  UseQueryOptions<
    TQueryFnData,
    unknown,
    T,
    typeof USE_GET_ALL_SUPERVISORS_QUERY_KEY
  >;

export const USE_GET_ALL_SUPERVISORS_QUERY_KEY =
  'USE_GET_ALL_SUPERVISORS_QUERY_KEY';

export const useGetAllSupervisorsQuery = <T = TQueryFnData>(
  options?: UseGetAllSupervisorsQueryOptions<T>,
) =>
  useQuery(
    USE_GET_ALL_SUPERVISORS_QUERY_KEY,
    () => sharedApi.getAllSupervisors(),
    {
      staleTime: DEFAULT_QUERY_STALE_TIME,
      placeholderData: () => [],
      ...options,
    },
  );
