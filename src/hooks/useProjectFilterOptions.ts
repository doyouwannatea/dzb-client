import { watch } from 'vue';
import ProjectApi from '@/api/ProjectApi';
import useAsyncData from './useAsyncData';
import { ProjectFilterOptions } from '@/stores/projects/state';
import { useProjectsStore } from '@/stores/projects/useProjectsStore';

const isProjectOptions = (options: ProjectFilterOptions) => {
  return Object.values(options).every(Boolean);
};

export function useProjectFilterOptions() {
  const store = useProjectsStore();

  const cancelRequest = () => {
    return isProjectOptions(store.filterOptions);
  };

  const allSkills = useAsyncData(() => ProjectApi.getAllSkills(), {
    defaultValue: store.filterOptions?.allSkills,
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
  const allSupervisors = useAsyncData(() => ProjectApi.getAllSupervisors(), {
    defaultValue: store.filterOptions?.allSupervisors,
    cancelRequest,
  });

  watch(
    [allSkills.data, allTypes.data, allStates.data, allSupervisors.data],
    (options) => {
      store.setFilterOptions({
        allSkills: options[0],
        allTypes: options[1],
        allStates: options[2],
        allSupervisors: options[3],
      });
    },
    { immediate: true },
  );

  return {
    allSkills,
    allTypes,
    allSupervisors,
    allStates,
  };
}
