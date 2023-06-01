import { UseMutationOptions, useMutation, useQueryClient } from 'vue-query';
import { authApi } from '..';
import AuthApiType from '../AuthApiType';

type TData = Awaited<ReturnType<AuthApiType['auth']>>;

export type UseAuthMutationOptions = UseMutationOptions<
  TData,
  unknown,
  void,
  unknown
>;

export const USE_AUTH_MUTATION_KEY = 'USE_AUTH_MUTATION_KEY';

export const useAuthMutation = (options?: UseAuthMutationOptions) => {
  const client = useQueryClient();

  return useMutation(USE_AUTH_MUTATION_KEY, () => authApi.auth(), {
    ...options,
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
      client.invalidateQueries();
    },
  });
};
