import { UseQueryOptions, useQuery } from 'vue-query';
import { get } from '@vueuse/core';
import AuthApiType from '../AuthApiType';
import { authApi } from '..';
import { useAuthStore } from '@/stores/auth/useAuthStore';

type TQueryFnData = Awaited<ReturnType<AuthApiType['getUserInfo']>>;

export type UseGetUserInfoQueryOptions<T = TQueryFnData> = UseQueryOptions<
  TQueryFnData,
  unknown,
  T,
  typeof USE_GET_USER_INFO_QUERY_KEY
>;

export const USE_GET_USER_INFO_QUERY_KEY = 'USE_GET_USER_INFO_QUERY_KEY';

export const useGetUserInfoQuery = (options?: UseGetUserInfoQueryOptions) => {
  const authStore = useAuthStore();

  return useQuery(USE_GET_USER_INFO_QUERY_KEY, () => authApi.getUserInfo(), {
    ...options,
    onSettled: (profileData, error) => {
      get(options?.onSettled)?.(profileData, error);
      authStore.profileData = profileData;
    },
  });
};
