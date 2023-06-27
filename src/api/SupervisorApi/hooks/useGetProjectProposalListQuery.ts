import { UseQueryOptions, useQuery } from 'vue-query';
import { supervisorApi } from '@/api/SupervisorApi';
import SupervisorApiType from '@/api/SupervisorApi/SupervisorApiType';
import { DEFAULT_QUERY_STALE_TIME } from '@/api/baseKy';

type TQueryFnData = Awaited<
  ReturnType<SupervisorApiType['getProjectProposalList']>
>;

export type UseGetProjectProposalListQueryOptions<T = TQueryFnData> =
  UseQueryOptions<
    TQueryFnData,
    unknown,
    T,
    typeof USE_GET_PROJECT_PROPOSAL_LIST_QUERY_KEY
  >;

export const USE_GET_PROJECT_PROPOSAL_LIST_QUERY_KEY =
  'USE_GET_PROJECT_PROPOSAL_LIST_QUERY_KEY';

export const useGetProjectProposalListQuery = <T = TQueryFnData>(
  options?: UseGetProjectProposalListQueryOptions<T>,
) =>
  useQuery(
    USE_GET_PROJECT_PROPOSAL_LIST_QUERY_KEY,
    () => supervisorApi.getProjectProposalList(),
    {
      staleTime: DEFAULT_QUERY_STALE_TIME,
      placeholderData: () => [],
      ...options,
    },
  );
