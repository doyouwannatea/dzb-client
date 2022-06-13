import { onBeforeMount } from 'vue';
import { useProjectsStore } from '@/stores/projects/useProjectsStore';

export const useFetchAdditionalProjectData = () => {
  const projectsStore = useProjectsStore();

  onBeforeMount(() => {
    projectsStore.getAddProjectData();
  });
};
