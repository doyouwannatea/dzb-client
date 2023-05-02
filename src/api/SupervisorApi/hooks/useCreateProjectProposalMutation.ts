import { useMutation, useQueryClient, UseMutationOptions } from 'vue-query';
import { USE_GET_PROJECT_PROPOSAL_LIST_QUERY_KEY } from './useGetProjectProposalListQuery';
import SupervisorApiType from '@/api/SupervisorApi/SupervisorApiType';
import { supervisorApi } from '@/api/SupervisorApi';

type TData = Awaited<ReturnType<SupervisorApiType['createProjectProposal']>>;
type TVariables = Parameters<SupervisorApiType['createProjectProposal']>[0];

export type UseCreateProjectProposalMutationOptions = UseMutationOptions<
  TData,
  unknown,
  TVariables,
  unknown
>;

export const USE_CREATE_PROJECT_PROPOSAL_MUTATION_KEY =
  'USE_CREATE_PROJECT_PROPOSAL_MUTATION_KEY';

export const useCreateProjectProposalMutation = (
  options?: UseCreateProjectProposalMutationOptions,
) => {
  const client = useQueryClient();

  return useMutation(
    USE_CREATE_PROJECT_PROPOSAL_MUTATION_KEY,
    supervisorApi.createProjectProposal,
    {
      onSuccess: () => {
        client.invalidateQueries(USE_GET_PROJECT_PROPOSAL_LIST_QUERY_KEY);
      },
      ...options,
    },
  );
};
