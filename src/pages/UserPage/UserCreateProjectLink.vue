<template>
  <BaseButton
    is="router-link"
    v-if="authStore.isTeacher"
    :to="toProjectProposalCreateRoute()"
  >
    создать проектную заявку
  </BaseButton>
</template>

<script setup lang="ts">
  import BaseButton from '@/components/ui/BaseButton.vue';
  import { toProjectProposalCreateRoute } from '@/router/utils/routes';
  import { useAuthStore } from '@/stores/auth/useAuthStore';

  const authStore = useAuthStore();
</script>
