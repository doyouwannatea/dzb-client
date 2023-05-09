import { UseQueryOptions, useQuery } from 'vue-query';
import InstituteDirectorApiType from '../InstituteDirectorApiType';
import { instituteDirectorApi } from '..';
import { DEFAULT_QUERY_STALE_TIME } from '../../baseKy';

type TQueryFnData = Awaited<
  ReturnType<InstituteDirectorApiType['getInstituteProjectQuota']>
>;

export type UseGetInstituteProjectQuotaQueryOptions<T = TQueryFnData> =
  UseQueryOptions<
    TQueryFnData,
    unknown,
    T,
    typeof USE_GET_INSTITUTE_PROJECT_QUOTA_QUERY_KEY
  >;

export const USE_GET_INSTITUTE_PROJECT_QUOTA_QUERY_KEY =
  'USE_GET_INSTITUTE_PROJECT_QUOTA_QUERY_KEY';

export const useGetInstituteProjectQuotaQuery = <T = TQueryFnData>(
  options?: UseGetInstituteProjectQuotaQueryOptions<T>,
) =>
  useQuery(
    USE_GET_INSTITUTE_PROJECT_QUOTA_QUERY_KEY,
    () => instituteDirectorApi.getInstituteProjectQuota(),
    {
      staleTime: DEFAULT_QUERY_STALE_TIME,
      ...options,
    },
  );
