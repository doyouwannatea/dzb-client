import { UseMutationOptions, useMutation, useQueryClient } from 'vue-query';
import { USE_GET_INSTITUTE_PROJECT_PROPOSALS_QUERY_KEY } from '@/api/InstituteDirectorApi/hooks/useGetInstituteProjectProposalsQuery';
import { supervisorApi } from '@/api/SupervisorApi';
import SupervisorApiType from '@/api/SupervisorApi/SupervisorApiType';
import { USE_GET_PROJECT_PROPOSAL_LIST_QUERY_KEY } from './useGetProjectProposalListQuery';

type TData = Awaited<ReturnType<SupervisorApiType['updateProjectProposal']>>;
type TVariables = Parameters<SupervisorApiType['updateProjectProposal']>[0];

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
    (data: TVariables) => supervisorApi.updateProjectProposal(data),
    {
      onSuccess: () => {
        client.invalidateQueries(USE_GET_PROJECT_PROPOSAL_LIST_QUERY_KEY);
        client.invalidateQueries(USE_GET_INSTITUTE_PROJECT_PROPOSALS_QUERY_KEY);
      },
      ...options,
    },
  );
};
