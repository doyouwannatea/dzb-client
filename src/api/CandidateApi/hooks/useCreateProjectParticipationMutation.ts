import { UseMutationOptions, useMutation, useQueryClient } from 'vue-query';
import { getSingleProjectQueryKey } from '@/api/ProjectApi/hooks/useGetSingleProjectQuery';
import { candidateApi } from '..';
import CandidateApiType from '../CandidateApiType';
import { USE_GET_PARTICIPATION_LIST_QUERY_KEY } from './useGetParticipationListQuery';

type TData = Awaited<
  ReturnType<CandidateApiType['createProjectParticipation']>
>;
type TVariables = Parameters<CandidateApiType['createProjectParticipation']>[0];

export type UseCreateProjectParticipationMutationOptions = UseMutationOptions<
  TData,
  unknown,
  TVariables,
  unknown
>;

export const USE_CREATE_PROJECT_PARTICIPATION_MUTATION_KEY =
  'USE_CREATE_PROJECT_PARTICIPATION_MUTATION_KEY';

export const useCreateProjectParticipationMutation = (
  options?: UseCreateProjectParticipationMutationOptions,
) => {
  const client = useQueryClient();

  return useMutation(
    USE_CREATE_PROJECT_PARTICIPATION_MUTATION_KEY,
    (data: TVariables) => candidateApi.createProjectParticipation(data),
    {
      ...options,
      onSuccess: (data, variables, context) => {
        options?.onSuccess?.(data, variables, context);
        client.invalidateQueries(getSingleProjectQueryKey(variables.projectId));
        client.invalidateQueries(USE_GET_PARTICIPATION_LIST_QUERY_KEY);
      },
    },
  );
};
