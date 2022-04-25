<template>
  <BaseButton
    v-if="showBtn"
    case="uppercase"
    variant="outlined"
    @click="modalsStore.openRequestModal(props.project)"
  >
    Подать заявку
  </BaseButton>
</template>

<script lang="ts" setup>
  import BaseButton from './base/BaseButton.vue';
  import { Project } from '@/models/Project';
  import { StateID } from '@/models/ProjectState';
  import { useModalsStore } from '@/stores/modals/useModalsStore';
  import { computed } from 'vue';

  type Props = { project: Project };

  const modalsStore = useModalsStore();
  const props = defineProps<Props>();

  const showBtn = computed(
    () => props.project.state.id !== StateID.ArchivedState,
  );
</script>
