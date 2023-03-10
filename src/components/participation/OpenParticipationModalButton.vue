<template>
  <BaseButton
    v-if="canSeeButton"
    case="uppercase"
    :variant="props.variant"
    :disabled="modalsStore.loading"
    @click="modalsStore.openParticipationModal(props.project)"
  >
    Подать заявку
  </BaseButton>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { Project } from '@/models/Project';
  import { useModalsStore } from '@/stores/modals/useModalsStore';
  import { useAuthStore } from '@/stores/auth/useAuthStore';
  // components
  import { isExtraState, isRecruitingState } from '@/helpers/project';
  import BaseButton, { Variant } from '../ui/BaseButton.vue';

  type Props = { project: Project; variant?: Variant };

  const modalsStore = useModalsStore();
  const authStore = useAuthStore();
  const props = withDefaults(defineProps<Props>(), { variant: 'outlined' });

  const canSeeButton = computed(
    () =>
      (isRecruitingState(props.project.state.id) ||
        isExtraState(props.project.state.id)) &&
      !authStore.profileData?.is_teacher,
  );
</script>
