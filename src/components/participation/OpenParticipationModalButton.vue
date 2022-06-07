<template>
  <BaseButton
    v-if="!hideBtn"
    case="uppercase"
    :variant="props.variant"
    :disabled="modalsStore.loading"
    @click="modalsStore.openParticipationModal(props.project)"
  >
    Подать заявку
  </BaseButton>
</template>

<script lang="ts" setup>
  import { Project } from '@/models/Project';
  import { StateID } from '@/models/ProjectState';
  import { useModalsStore } from '@/stores/modals/useModalsStore';
  import { computed } from 'vue';
  import { useAuthStore } from '@/stores/auth/useAuthStore';
  // components
  import BaseButton, { Variant } from '../ui/BaseButton.vue';

  type Props = { project: Project; variant?: Variant };

  const modalsStore = useModalsStore();
  const authStore = useAuthStore();
  const props = withDefaults(defineProps<Props>(), { variant: 'outlined' });

  const hideBtn = computed(
    () =>
      props.project.state.id === StateID.ArchivedState ||
      authStore.profileData?.is_teacher,
  );
</script>
