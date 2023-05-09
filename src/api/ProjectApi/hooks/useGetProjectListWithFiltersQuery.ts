import { storeToRefs } from 'pinia';
import { useProjectsStore } from '@/stores/projects/useProjectsStore';
import { useGetProjectListQuery } from './useGetProjectListQuery';

export const useGetProjectListWithFiltersQuery = () => {
  const projectStore = useProjectsStore();
  const { filters } = storeToRefs(projectStore);

  return useGetProjectListQuery(
    {
      projectFiltersRef: filters,
      onDownloadProgressRef: (progress) => {
        const { percent } = progress;
        projectStore.loadingProgress = percent > 1 ? 1 : percent;
      },
    },
    { onSettled: () => (projectStore.loadingProgress = 0) },
  );
};
