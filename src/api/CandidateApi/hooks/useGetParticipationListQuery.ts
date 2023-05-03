import { UseQueryOptions, useQuery } from 'vue-query';
import { candidateApi } from '..';
import CandidateApiType from '../CandidateApiType';
import { DEFAULT_QUERY_STALE_TIME } from '@/api/baseKy';

type TQueryFnData = Awaited<
  ReturnType<CandidateApiType['getParticipationList']>
>;

export type UseGetParticipationListQueryOptions<T = TQueryFnData> =
  UseQueryOptions<
    TQueryFnData,
    unknown,
    T,
    typeof USE_GET_PARTICIPATION_LIST_QUERY_KEY
  >;

export const USE_GET_PARTICIPATION_LIST_QUERY_KEY =
  'USE_GET_PARTICIPATION_LIST_QUERY_KEY';

export const useGetParticipationListQuery = <T = TQueryFnData>(
  options?: UseGetParticipationListQueryOptions<T>,
) =>
  useQuery(
    USE_GET_PARTICIPATION_LIST_QUERY_KEY,
    () => candidateApi.getParticipationList(),
    {
      staleTime: DEFAULT_QUERY_STALE_TIME,
      ...options,
    },
  );
