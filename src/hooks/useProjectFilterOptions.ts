import { watch } from 'vue';
import ProjectApi from '@/api/ProjectApi';
import useAsyncData from './useAsyncData';
import { useProjectsStore } from '@/stores/projects/useProjectsStore';
import { ProjectFilterOptions } from '@/models/Project';

const isProjectOptions = (options: ProjectFilterOptions) => {
  return Object.values(options).every(Boolean);
};

export function useProjectFilterOptions() {
  const store = useProjectsStore();

  const cancelRequest = () => {
    return isProjectOptions(store.filterOptions);
  };

  const allSkills = useAsyncData(() => ProjectApi.getAllSkills(), {
    defaultValue: store.filterOptions?.allTags,
    cancelRequest,
  });
  const allStates = useAsyncData(() => ProjectApi.getAllProjectStates(), {
    defaultValue: store.filterOptions?.allStates,
    cancelRequest,
  });

  watch(
    [allSkills.data, allStates.data],
    (options) => {
      store.setFilterOptions({
        allTags: options[0],
        allStates: options[1],
      });
    },
    { immediate: true },
  );

  return {
    allSkills,
    allStates,
  };
}
