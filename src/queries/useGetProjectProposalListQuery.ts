import { useQuery, UseQueryOptions } from 'vue-query';
import { projectCreationApi } from '@/api/ProjectCreationApi';
import IProjectCreationApi from '@/api/ProjectCreationApi/IProjectCreationApi';

type TQueryFnData = Awaited<
  ReturnType<IProjectCreationApi['getProjectProposalList']>
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
    projectCreationApi.getProjectProposalList,
    {
      staleTime: Infinity,
      placeholderData: () => [],
      ...options,
    },
  );
