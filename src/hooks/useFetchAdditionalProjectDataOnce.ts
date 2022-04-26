import { onBeforeMount } from 'vue';
import { useProjectsStore } from '@/stores/projects/useProjectsStore';

export const useFetchAdditionalProjectDataOnce = () => {
  const projectsStore = useProjectsStore();

  onBeforeMount(() => {
    if (
      !Object.values(projectsStore.additionalProjectData).every(Boolean) ||
      projectsStore.error
    ) {
      projectsStore.getAddProjectData();
    }
  });
};
