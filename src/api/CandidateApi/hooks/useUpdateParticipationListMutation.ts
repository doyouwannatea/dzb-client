import { UseMutationOptions, useMutation, useQueryClient } from 'vue-query';
import { getSingleProjectQueryKey } from '@/api/ProjectApi/hooks/useGetSingleProjectQuery';
import { candidateApi } from '..';
import CandidateApiType from '../CandidateApiType';
import { USE_GET_PARTICIPATION_LIST_QUERY_KEY } from './useGetParticipationListQuery';

type TData = Awaited<ReturnType<CandidateApiType['updateParticipationList']>>;
type TVariables = Parameters<CandidateApiType['updateParticipationList']>[0];

export type UseUpdateParticipationListMutationOptions = UseMutationOptions<
  TData,
  unknown,
  TVariables,
  unknown
>;

export const USE_UPDATE_PARTICIPATION_LIST_MUTATION_KEY =
  'USE_UPDATE_PARTICIPATION_LIST_MUTATION_KEY';

export const useUpdateParticipationListMutation = (
  options?: UseUpdateParticipationListMutationOptions,
) => {
  const client = useQueryClient();

  return useMutation(
    USE_UPDATE_PARTICIPATION_LIST_MUTATION_KEY,
    (data: TVariables) => candidateApi.updateParticipationList(data),
    {
      ...options,
      onSuccess: (data, variables, context) => {
        options?.onSuccess?.(data, variables, context);
        for (const participation of variables) {
          client.invalidateQueries(
            getSingleProjectQueryKey(participation.project_id),
          );
        }
        client.invalidateQueries(USE_GET_PARTICIPATION_LIST_QUERY_KEY);
      },
    },
  );
};
