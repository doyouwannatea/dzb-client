import { ref, onBeforeMount } from 'vue';
import ProjectApi from '@/api/ProjectApi';
import { makeOption } from './makeOption';
import { FilterOptions } from './types';
import { useStore } from '@/store/store';
import { MutationTypes } from '@/store/types/mutation-types';

export function useProjectFilterOptions() {
  const store = useStore();
  const { filterOptions } = store.state;
  const loading = ref(false);
  const allTags = ref<FilterOptions>(
    filterOptions ? filterOptions.allTags : { error: '', options: [] },
  );
  const allTypes = ref<FilterOptions>(
    filterOptions ? filterOptions.allTypes : { error: '', options: [] },
  );
  const allStates = ref<FilterOptions>(
    filterOptions ? filterOptions.allStates : { error: '', options: [] },
  );
  const allSupervisorNames = ref<FilterOptions>(
    filterOptions
      ? filterOptions.allSupervisorNames
      : { error: '', options: [] },
  );

  onBeforeMount(async () => {
    if (store.state.filterOptions) return;
    loading.value = true;
    const options = await Promise.allSettled([
      ProjectApi.getAllTags(),
      ProjectApi.getAllProjectTypes(),
      ProjectApi.getAllSupervisorNames(),
      ProjectApi.getAllProjectStates(),
    ]);

    if (options[0].status === 'fulfilled') {
      allTags.value.options = options[0].value.map(makeOption('tag', 'id'));
    } else allTags.value.error = options[0].reason;

    if (options[1].status === 'fulfilled') {
      allTypes.value.options = options[1].value.map(makeOption('type', 'id'));
    } else allTypes.value.error = options[1].reason;

    if (options[2].status === 'fulfilled') {
      allSupervisorNames.value.options = options[2].value.map(
        makeOption('fio', 'id'),
      );
    } else allSupervisorNames.value.error = options[2].reason;

    if (options[3].status === 'fulfilled') {
      allStates.value.options = options[3].value.map(makeOption('state', 'id'));
    } else allStates.value.error = options[3].reason;

    loading.value = false;
    store.commit(MutationTypes.SET_FILTER_OPTIONS, {
      allStates: allStates.value,
      allSupervisorNames: allSupervisorNames.value,
      allTags: allTags.value,
      allTypes: allTypes.value,
    });
  });

  return {
    allTags,
    allTypes,
    allSupervisorNames,
    allStates,
    loading,
  };
}
