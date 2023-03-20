<template>
  <!-- succsess modal -->
  <BaseModal :is-show="props.isShow" @close="emit('close')">
    <!-- MAIN CONTENT -->
    <h1>История проекта</h1>
    <ProjectHistory
      class="history-list"
      :project-list="
        projectList.map((project) => ({
          projectId: project.id,
          title: project.title,
          year: `${project.date_start} - ${project.date_end}`,
        }))
      "
      :current-project-id="props.currentProjectId"
    />
    <!-- MAIN CONTENT -->
  </BaseModal>
</template>

<script setup lang="ts">
  import { Project } from '@/models/Project';
  // components
  import BaseModal, {
    Emits as BaseModalEmits,
    Props as BaseModalProps,
  } from '../ui/BaseModal.vue';
  import ProjectHistory from '../ui/ProjectHistory.vue';

  interface Props extends BaseModalProps {
    projectList: Project[];
    currentProjectId: number;
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Emits extends BaseModalEmits {}

  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();
</script>

<style lang="scss" scoped>
  @import '@styles/breakpoints';

  .history-list {
    padding-top: 5.8125rem;
    padding-bottom: 6.25rem;

    @media (max-width: $tablet) {
      min-height: 75vh;
      padding-bottom: 2rem;
    }
  }
</style>
