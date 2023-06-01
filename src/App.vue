<template>
  <AuthModal />
  <ParticipationModal />
  <ParticipationSuccessModal />
  <ProjectFeedbackModal />
  <AlertModal />
  <ConfirmModal />
  <ToUpButton />
  <RouterView></RouterView>
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import ProjectFeedbackModal from './components/feedback/ProjectFeedbackModal.vue';
  import ToUpButton from './components/ui/ToUpButton.vue';
  import AlertModal from '@/components/layout/AlertModal.vue';
  import AuthModal from '@/components/layout/AuthModal.vue';
  import ConfirmModal from '@/components/layout/ConfirmModal.vue';
  import ParticipationModal from '@/components/participation/ParticipationModal.vue';
  import ParticipationSuccessModal from '@/components/participation/ParticipationSuccessModal.vue';
  import { useGetUserInfoQuery } from './api/AuthApi/hooks/useGetUserInfoQuery';

  useGetUserInfoQuery();
</script>
