<template>
  <BaseButton
    v-if="showBtn"
    case="uppercase"
    variant="outlined"
    @click="modalsStore.openFeedbackModal(props.project)"
  >
    Читать отзыв
  </BaseButton>
</template>

<script lang="ts" setup>
  import { Project } from '@/models/Project';
  import { useModalsStore } from '@/stores/modals/useModalsStore';
  import { computed } from 'vue';
  import { useAuthStore } from '@/stores/auth/useAuthStore';
  // components
  import BaseButton from '../ui/BaseButton.vue';

  type Props = { project: Project };

  const props = defineProps<Props>();
  const modalsStore = useModalsStore();
  const authStore = useAuthStore();

  const showBtn = computed(
    () => props.project.participant_feedback && authStore.profileData,
  );
</script>
