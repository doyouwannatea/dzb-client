import { watch } from 'vue';
import ProjectApi from '@/api/ProjectApi';
import useAsyncData from './useAsyncData';
import { ProjectFilterOptions } from '@/stores/projects/state';
import { useProjectsStore } from '@/stores/projects';

const isProjectOptionsEmpty = (options: ProjectFilterOptions) => {
  return Object.values(options).every((val) => val === null);
};

export function useProjectFilterOptions() {
  const store = useProjectsStore();

  const cancelRequest = () => {
    return !isProjectOptionsEmpty(store.filterOptions);
  };

  const allTags = useAsyncData(ProjectApi.getAllTags(), {
    defaultValue: store.filterOptions?.allTags,
    cancelRequest,
  });
  const allTypes = useAsyncData(ProjectApi.getAllProjectTypes(), {
    defaultValue: store.filterOptions?.allTypes,
    cancelRequest,
  });
  const allStates = useAsyncData(ProjectApi.getAllProjectStates(), {
    defaultValue: store.filterOptions?.allStates,
    cancelRequest,
  });
  const allSupervisorNames = useAsyncData(ProjectApi.getAllSupervisorNames(), {
    defaultValue: store.filterOptions?.allSupervisorNames,
    cancelRequest,
  });

  watch(
    [allTags.data, allTypes.data, allStates.data, allSupervisorNames.data],
    (data) => {
      const options: ProjectFilterOptions = {
        allTags: data[0],
        allTypes: data[1],
        allStates: data[2],
        allSupervisorNames: data[3],
      };
      if (!isProjectOptionsEmpty(options)) {
        store.setFilterOptions(options);
      }
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
