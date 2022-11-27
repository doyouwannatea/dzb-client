<template>
  <AuthModal />
  <SelectedProjectModal />
  <ParticipationModal />
  <ParticipationSuccessModal />
  <ProjectFeedbackModal />
  <UnderstandModal />
  <ToUpButton />
  <RouterView></RouterView>
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import AuthModal from './components/layout/AuthModal.vue';
  import SelectedProjectModal from './components/layout/SelectedProjectModal.vue';
  import ParticipationModal from './components/participation/ParticipationModal.vue';
  import ParticipationSuccessModal from './components/participation/ParticipationSuccessModal.vue';
  import ProjectFeedbackModal from './components/feedback/ProjectFeedbackModal.vue';
  import ToUpButton from './components/ui/ToUpButton.vue';
  import UnderstandModal from './components/layout/UnderstandModal.vue';
  import { useSavedRoute } from './hooks/useSaveRoute';
  import { useGetParticipationList } from './hooks/useFetchStudentData';

  useGetParticipationList();
  useSavedRoute();
</script>
