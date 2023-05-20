<template>
  <section v-if="projectData && !isFetching && !isError">
    <ProjectHistoryModal
      v-if="projectData.projectHistory"
      :current-project-id="projectData.project.id"
      :is-show="showHistoryModal"
      :project-list="projectData.projectHistory"
      size="m"
      @close="showHistoryModal = false"
    />
    <ProjectMobileDetails
      v-if="isSmallDevice"
      :project="projectData.project"
      :show-history-modal="showHistoryModal"
      :history="projectData.projectHistory"
      @show-history="showHistoryModal = true"
    />
    <ProjectDesktopDetails
      v-else
      :project="projectData.project"
      :show-history-modal="showHistoryModal"
      :history="projectData.projectHistory"
      @show-history="showHistoryModal = true"
    />
  </section>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { useSmallDevice } from '@/hooks/useBreakpoints';
  // components
  import ProjectMobileDetails from './ProjectMobileDetails.vue';
  import ProjectHistoryModal from '@/components/project/ProjectHistoryModal.vue';
  import ProjectDesktopDetails from './ProjectDesktopDetails.vue';
  import { useGetSingleProjectQuery } from '@/api/ProjectApi/hooks/useGetSingleProjectQuery';

  const isSmallDevice = useSmallDevice();
  const showHistoryModal = ref(false);

  const route = useRoute();
  const projectId = computed(() => Number(route.params.id));
  const {
    isFetching,
    isError,
    data: projectData,
  } = useGetSingleProjectQuery(projectId);

  watch(
    () => projectData.value,
    () => (showHistoryModal.value = false),
    { deep: true },
  );
</script>
