import { UseQueryOptions, useQuery } from 'vue-query';
import { candidateApi } from '..';
import CandidateApiType from '../CandidateApiType';
import { DEFAULT_QUERY_STALE_TIME } from '@/api/baseKy';

type TQueryFnData = Awaited<
  ReturnType<CandidateApiType['getParticipationsTime']>
>;

export type UseGetParticipationsTimeQueryOptions<T = TQueryFnData> =
  UseQueryOptions<
    TQueryFnData,
    unknown,
    T,
    typeof USE_GET_PARTICIPATIONS_TIME_QUERY_KEY
  >;

export const USE_GET_PARTICIPATIONS_TIME_QUERY_KEY =
  'USE_GET_PARTICIPATIONS_TIME_QUERY_KEY';

export const useGetParticipationsTimeQuery = <T = TQueryFnData>(
  options?: UseGetParticipationsTimeQueryOptions<T>,
) =>
  useQuery(
    USE_GET_PARTICIPATIONS_TIME_QUERY_KEY,
    () => candidateApi.getParticipationsTime(),
    {
      staleTime: DEFAULT_QUERY_STALE_TIME,
      ...options,
    },
  );
