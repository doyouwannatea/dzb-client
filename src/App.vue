<template>
  <WrongInstitutionModal />
  <AuthModal />
  <ParticipationModal />
  <ParticipationSuccessModal />
  <ProjectFeedbackModal />
  <ToUpButton />
  <RouterView></RouterView>
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import AuthModal from './components/layout/AuthModal.vue';
  import ParticipationModal from './components/participation/ParticipationModal.vue';
  import ParticipationSuccessModal from './components/participation/ParticipationSuccessModal.vue';
  import ProjectFeedbackModal from './components/feedback/ProjectFeedbackModal.vue';
  import WrongInstitutionModal from './components/participation/WrongInstitutionModal.vue';
  import ToUpButton from './components/ui/ToUpButton.vue';
  import { useSavedRoute } from './hooks/useSaveRoute';

  useSavedRoute();
</script>
