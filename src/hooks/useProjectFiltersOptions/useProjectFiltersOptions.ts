import { ref, onBeforeMount } from 'vue';
import ProjectApi from '@/api/ProjectApi';
import { makeOption } from './makeOption';
import { FilterOption } from './types';

export function useProjectFiltersOptions() {
  const loading = ref(false);
  const allTags = ref<FilterOption>({ error: '', options: [] });
  const allTypes = ref<FilterOption>({ error: '', options: [] });
  const allStates = ref<FilterOption>({ error: '', options: [] });
  const allSupervisorNames = ref<FilterOption>({ error: '', options: [] });

  onBeforeMount(async () => {
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
  });

  return {
    allTags,
    allTypes,
    allSupervisorNames,
    allStates,
    loading,
  };
}
