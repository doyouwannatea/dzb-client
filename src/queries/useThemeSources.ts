import { projectCreationApi } from '@/api/ProjectCreationApi';
import { useQuery } from 'vue-query';

export const useThemeSourcesKey = 'useThemeSourcesKey';
export const useThemeSources = () =>
  useQuery(useThemeSourcesKey, projectCreationApi.getThemeSources, {
    staleTime: Infinity,
  });
