import { UseMutationOptions, useMutation, useQueryClient } from 'vue-query';
import { supervisorApi } from '@/api/SupervisorApi';
import SupervisorApiType from '@/api/SupervisorApi/SupervisorApiType';
import { USE_GET_PROJECT_PROPOSAL_LIST_QUERY_KEY } from './useGetProjectProposalListQuery';

type TData = Awaited<ReturnType<SupervisorApiType['deleteProjectProposal']>>;
type TVariables = Parameters<SupervisorApiType['deleteProjectProposal']>[0];

export type UseDeleteProjectProposalMutationOptions = UseMutationOptions<
  TData,
  unknown,
  TVariables,
  unknown
>;

export const USE_DELETE_PROJECT_PROPOSAL_MUTATION_KEY =
  'USE_DELETE_PROJECT_PROPOSAL_MUTATION_KEY';

export const useDeleteProjectProposalMutation = (
  options?: UseDeleteProjectProposalMutationOptions,
) => {
  const client = useQueryClient();

  return useMutation(
    USE_DELETE_PROJECT_PROPOSAL_MUTATION_KEY,
    (data: TVariables) => supervisorApi.deleteProjectProposal(data),
    {
      onSuccess: () => {
        client.invalidateQueries(USE_GET_PROJECT_PROPOSAL_LIST_QUERY_KEY);
      },
      ...options,
    },
  );
};
