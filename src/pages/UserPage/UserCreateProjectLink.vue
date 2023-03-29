<template>
  <BaseButton
    is="router-link"
    v-if="authStore.profileData && isSupervisor(authStore.profileData)"
    :to="toProjectCreateRoute(props.projectId)"
  >
    создать проектную заявку
  </BaseButton>
</template>

<script setup lang="ts">
  import BaseButton from '@/components/ui/BaseButton.vue';
  import { isSupervisor } from '@/helpers/typeCheck';
  import { toProjectCreateRoute } from '@/router/utils/routes';
  import { useAuthStore } from '@/stores/auth/useAuthStore';

  type Props = { projectId?: number };

  const props = defineProps<Props>();
  const authStore = useAuthStore();
</script>
