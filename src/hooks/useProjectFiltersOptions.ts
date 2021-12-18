import ProjectApi from '@/api/ProjectApi';
import { ref, onBeforeMount } from 'vue';

interface FilterOption {
  error: string;
  options: string[];
}

export function useProjectFiltersOptions() {
  const loading = ref(false);
  const allTags = ref<FilterOption>({ error: '', options: [] });
  const allTypes = ref<FilterOption>({ error: '', options: [] });
  const allSupervisorNames = ref<FilterOption>({ error: '', options: [] });

  onBeforeMount(async () => {
    loading.value = true;
    const options = await Promise.allSettled([
      ProjectApi.getAllTags(),
      ProjectApi.getAllProjectTypes(),
      ProjectApi.getAllSupervisorNames(),
    ]);

    if (options[0].status === 'fulfilled') {
      allTags.value.options = options[0].value.map((item) => item.tag);
    } else allTags.value.error = options[0].reason;

    if (options[1].status === 'fulfilled') {
      allTypes.value.options = options[1].value.map((item) => item.type);
    } else allTypes.value.error = options[1].reason;

    if (options[2].status === 'fulfilled') {
      allSupervisorNames.value.options = options[2].value.map(
        (item) => item.fio,
      );
    } else allSupervisorNames.value.error = options[2].reason;

    loading.value = false;
  });

  return {
    allTags,
    allTypes,
    allSupervisorNames,
    loading,
  };
}
