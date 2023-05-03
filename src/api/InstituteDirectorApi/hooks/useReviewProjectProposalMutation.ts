import { UseMutationOptions, useQueryClient, useMutation } from 'vue-query';
import { instituteDirectorApi } from '@/api/InstituteDirectorApi';
import InstituteDirectorApi from '@/api/InstituteDirectorApi/InstituteDirectorApi';
import { USE_GET_PROJECT_PROPOSAL_LIST_QUERY_KEY } from '@/api/SupervisorApi/hooks/useGetProjectProposalListQuery';

type TData = Awaited<ReturnType<InstituteDirectorApi['reviewProjectProposal']>>;
type TVariables = Parameters<InstituteDirectorApi['reviewProjectProposal']>[0];

export type UseReviewProjectProposalMutationOptions = UseMutationOptions<
  TData,
  unknown,
  TVariables,
  unknown
>;

export const USE_REVIEW_PROJECT_PROPOSAL_MUTATION_KEY =
  'USE_REVIEW_PROJECT_PROPOSAL_MUTATION_KEY';

export const useReviewProjectProposalMutation = (
  options?: UseReviewProjectProposalMutationOptions,
) => {
  const client = useQueryClient();

  return useMutation(
    USE_REVIEW_PROJECT_PROPOSAL_MUTATION_KEY,
    (data: TVariables) => instituteDirectorApi.reviewProjectProposal(data),
    {
      ...options,
      onSuccess: (data, variables, context) => {
        options?.onSuccess?.(data, variables, context);
        client.invalidateQueries(USE_GET_PROJECT_PROPOSAL_LIST_QUERY_KEY);
      },
    },
  );
};
