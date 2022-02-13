import { watch } from 'vue';
import ProjectApi from '@/api/ProjectApi';
import { useStore } from '@/store/store';
import { MutationTypes } from '@/store/types/mutation-types';
import useAsyncData from './useAsyncData';
import { ProjectFilterOptions } from '@/store/state';

const isProjectOptionsEmpty = (options: ProjectFilterOptions) => {
  return Object.values(options).every((val) => val === null);
};

export function useProjectFilterOptions() {
  const store = useStore();
  const { filterOptions } = store.state;

  const cancelRequest = () => {
    return !isProjectOptionsEmpty(store.state.filterOptions);
  };

  const allTags = useAsyncData(ProjectApi.getAllTags(), {
    defaultValue: filterOptions?.allTags,
    cancelRequest,
  });
  const allTypes = useAsyncData(ProjectApi.getAllProjectTypes(), {
    defaultValue: filterOptions?.allTypes,
    cancelRequest,
  });
  const allStates = useAsyncData(ProjectApi.getAllProjectStates(), {
    defaultValue: filterOptions?.allStates,
    cancelRequest,
  });
  const allSupervisorNames = useAsyncData(ProjectApi.getAllSupervisorNames(), {
    defaultValue: filterOptions?.allSupervisorNames,
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
        store.commit(MutationTypes.SET_FILTER_OPTIONS, options);
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
