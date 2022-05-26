<template>
  <BaseModal
    size="m"
    :is-show="modalsStore.projectFeedbackModal"
    @close="modalsStore.projectFeedbackModal = false"
  >
    <!-- HEADER -->
    <template #header>
      <h1>Отзыв об участии в проекте</h1>
      <h2 class="project-title">{{ project?.title }}</h2>
    </template>
    <!-- HEADER -->

    <!-- MAIN CONTENT -->
    <div class="author">
      <div class="avatar"><img :src="userMockUrl" alt="" /></div>
      <div>
        <div class="name">{{ project?.supervisor.fio }}</div>
        <div class="position">{{ project?.supervisor.position }}</div>
      </div>
    </div>

    <p class="feedback">
      {{ project?.participant_feedback?.trim() }}
    </p>
    <!-- MAIN CONTENT -->
  </BaseModal>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import userMockUrl from '@/assets/images/user-mock.png';
  import { useModalsStore } from '@/stores/modals/useModalsStore';
  import { useProjectsStore } from '@/stores/projects/useProjectsStore';
  // components
  import BaseModal from '../ui/BaseModal.vue';

  const modalsStore = useModalsStore();
  const projectsStore = useProjectsStore();
  const { openedProject: project } = storeToRefs(projectsStore);
</script>

<style scoped>
  .project-title {
    margin-top: 0.625rem;
  }

  .author {
    display: flex;
    gap: 1.125rem;
    align-items: center;
    margin-bottom: 1.875rem;
  }
  .name {
    font-size: 1.5rem;
    font-weight: 800;
    line-height: 151.8%;
    color: var(--accent-color-1);
  }

  .position {
    font-family: 'Montserrat', Arial, Helvetica, sans-serif;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.375rem;
    color: var(--gray-color-2);
  }

  .feedback {
    white-space: pre-wrap;
  }
</style>
