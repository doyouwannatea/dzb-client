import { useMutation, useQueryClient, UseMutationOptions } from 'vue-query';
import { projectCreationApi } from '@/api/ProjectCreationApi';
import { USE_GET_PROJECT_PROPOSAL_LIST_QUERY_KEY } from './useGetProjectProposalListQuery';
import IProjectCreationApi from '@/api/ProjectCreationApi/IProjectCreationApi';

type TData = Awaited<ReturnType<IProjectCreationApi['createProjectProposal']>>;
type TVariables = Parameters<IProjectCreationApi['createProjectProposal']>[0];

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
    projectCreationApi.createProjectProposal,
    {
      onSuccess: () => {
        client.invalidateQueries(USE_GET_PROJECT_PROPOSAL_LIST_QUERY_KEY);
      },
      ...options,
    },
  );
};
