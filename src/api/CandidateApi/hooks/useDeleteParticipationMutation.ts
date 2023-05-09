import { useMutation, useQueryClient, UseMutationOptions } from 'vue-query';
import CandidateApiType from '../CandidateApiType';
import { candidateApi } from '..';
import { USE_GET_PARTICIPATION_LIST_QUERY_KEY } from './useGetParticipationListQuery';
import { getSingleProjectQueryKey } from '@/api/ProjectApi/hooks/useGetSingleProjectQuery';

type TData = Awaited<ReturnType<CandidateApiType['deleteParticipation']>>;
type TVariables = Parameters<CandidateApiType['deleteParticipation']>[0];

export type UseDeleteParticipationMutationOptions = UseMutationOptions<
  TData,
  unknown,
  TVariables,
  unknown
>;

export const USE_DELETE_PARTICIPATION_MUTATION_KEY =
  'USE_DELETE_PARTICIPATION_MUTATION_KEY';

export const useDeleteParticipationMutation = (
  options?: UseDeleteParticipationMutationOptions,
) => {
  const client = useQueryClient();

  return useMutation(
    USE_DELETE_PARTICIPATION_MUTATION_KEY,
    (data: TVariables) => candidateApi.deleteParticipation(data),
    {
      ...options,
      onSuccess: (data, variables, context) => {
        options?.onSuccess?.(data, variables, context);
        client.invalidateQueries(getSingleProjectQueryKey(variables));
        client.invalidateQueries(USE_GET_PARTICIPATION_LIST_QUERY_KEY);
      },
    },
  );
};
