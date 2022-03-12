import { watch } from 'vue';
import ProjectApi from '@/api/ProjectApi';
import useAsyncData from './useAsyncData';
import { ProjectFilterOptions } from '@/stores/projects/state';
import { useProjectsStore } from '@/stores/projects';

const isProjectOptions = (options: ProjectFilterOptions) => {
  return Object.values(options).every(Boolean);
};

export function useProjectFilterOptions() {
  const store = useProjectsStore();

  const cancelRequest = () => {
    return isProjectOptions(store.filterOptions);
  };

  const allTags = useAsyncData(() => ProjectApi.getAllTags(), {
    defaultValue: store.filterOptions?.allTags,
    cancelRequest,
  });
  const allTypes = useAsyncData(() => ProjectApi.getAllProjectTypes(), {
    defaultValue: store.filterOptions?.allTypes,
    cancelRequest,
  });
  const allStates = useAsyncData(() => ProjectApi.getAllProjectStates(), {
    defaultValue: store.filterOptions?.allStates,
    cancelRequest,
  });
  const allSupervisorNames = useAsyncData(
    () => ProjectApi.getAllSupervisorNames(),
    {
      defaultValue: store.filterOptions?.allSupervisorNames,
      cancelRequest,
    },
  );

  watch(
    [allTags.data, allTypes.data, allStates.data, allSupervisorNames.data],
    (options) => {
      store.setFilterOptions({
        allTags: options[0],
        allTypes: options[1],
        allStates: options[2],
        allSupervisorNames: options[3],
      });
    },
    { immediate: true },
  );

  return {
    allTags,
    allTypes,
    allSupervisorNames,
    allStates,
  };
}
