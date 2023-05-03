import { useMutation, UseMutationOptions, useQueryClient } from 'vue-query';
import AuthApiType from '../AuthApiType';
import { authApi } from '..';

type TData = Awaited<ReturnType<AuthApiType['logout']>>;

export type UseLogoutMutationOptions = UseMutationOptions<
  TData,
  unknown,
  void,
  unknown
>;

export const USE_LOGOUT_MUTATION_KEY = 'USE_LOGOUT_MUTATION_KEY';

export const useLogoutMutation = (options?: UseLogoutMutationOptions) => {
  const client = useQueryClient();

  return useMutation(USE_LOGOUT_MUTATION_KEY, () => authApi.logout(), {
    ...options,
    onSuccess: async (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
      client.invalidateQueries();
    },
  });
};
