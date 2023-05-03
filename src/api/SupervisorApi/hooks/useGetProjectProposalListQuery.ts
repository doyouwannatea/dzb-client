import { useQuery, UseQueryOptions } from 'vue-query';
import SupervisorApiType from '@/api/SupervisorApi/SupervisorApiType';
import { supervisorApi } from '@/api/SupervisorApi';

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
      staleTime: Infinity,
      placeholderData: () => [],
      ...options,
    },
  );
