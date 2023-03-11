<template>
  <section v-if="project && !loading && !error">
    <ProjectHistoryModal
      v-if="history"
      :current-project-id="project.id"
      :is-show="showHistoryModal"
      :project-list="history"
      size="m"
      @close="showHistoryModal = false"
    />
    <ProjectMobileDetails
      v-if="isMobileS"
      :project="project"
      :show-history-modal="showHistoryModal"
      :history="history"
      @show-history="showHistoryModal = true"
    />
    <ProjectDesktopDetails
      v-else
      :project="project"
      :show-history-modal="showHistoryModal"
      :history="history"
      @show-history="showHistoryModal = true"
    />
  </section>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useProjectsStore } from '@/stores/projects/useProjectsStore';
  import { useMobileS } from '@/helpers/breakpoints';
  // components
  import ProjectMobileDetails from './ProjectMobileDetails.vue';
  import ProjectHistoryModal from '@/components/project/ProjectHistoryModal.vue';
  import ProjectDesktopDetails from './ProjectDesktopDetails.vue';

  const isMobileS = useMobileS();
  const projectsStore = useProjectsStore();
  const showHistoryModal = ref(false);
  const {
    openedProject: project,
    openedProjectHistory: history,
    loading,
    error,
  } = storeToRefs(projectsStore);

  watch(
    () => project,
    () => (showHistoryModal.value = false),
    { deep: true },
  );
</script>
