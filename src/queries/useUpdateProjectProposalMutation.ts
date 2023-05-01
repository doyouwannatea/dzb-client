import { UseMutationOptions, useMutation, useQueryClient } from 'vue-query';
import { projectCreationApi } from '@/api/ProjectCreationApi';
import IProjectCreationApi from '@/api/ProjectCreationApi/IProjectCreationApi';
import { USE_GET_PROJECT_PROPOSAL_LIST_QUERY_KEY } from './useGetProjectProposalListQuery';

type TData = Awaited<ReturnType<IProjectCreationApi['updateProjectProposal']>>;
type TVariables = Parameters<IProjectCreationApi['updateProjectProposal']>[0];

export type UseCreateProjectProposalMutationOptions = UseMutationOptions<
  TData,
  unknown,
  TVariables,
  unknown
>;

export const USE_UPDATE_PROJECT_PROPOSAL_MUTATION_KEY =
  'USE_UPDATE_PROJECT_PROPOSAL_MUTATION_KEY';

export const useUpdateProjectProposalMutation = (
  options?: UseCreateProjectProposalMutationOptions,
) => {
  const client = useQueryClient();

  return useMutation(
    USE_UPDATE_PROJECT_PROPOSAL_MUTATION_KEY,
    projectCreationApi.updateProjectProposal,
    {
      onSuccess: () => {
        client.invalidateQueries(USE_GET_PROJECT_PROPOSAL_LIST_QUERY_KEY);
      },
      ...options,
    },
  );
};
