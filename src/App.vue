<template>
  <AuthModal />
  <ParticipationModal />
  <ParticipationSuccessModal />
  <ProjectFeedbackModal />
  <RouterView></RouterView>
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import AuthModal from './components/layout/AuthModal.vue';
  import ParticipationModal from './components/participation/ParticipationModal.vue';
  import ParticipationSuccessModal from './components/participation/ParticipationSuccessModal.vue';
  import ProjectFeedbackModal from './components/feedback/ProjectFeedbackModal.vue';
</script>
