import { UseMutationOptions, useQueryClient, useMutation } from 'vue-query';
import { instituteDirectorApi } from '@/api/InstituteDirectorApi';
import { USE_GET_PROJECT_PROPOSAL_LIST_QUERY_KEY } from './useGetProjectProposalListQuery';
import InstituteDirectorApi from '@/api/InstituteDirectorApi/InstituteDirectorApi';

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
    instituteDirectorApi.reviewProjectProposal,
    {
      onSuccess: () => {
        client.invalidateQueries(USE_GET_PROJECT_PROPOSAL_LIST_QUERY_KEY);
      },
      ...options,
    },
  );
};
