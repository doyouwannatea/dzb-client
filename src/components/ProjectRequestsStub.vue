<template>
  <BaseStub :title="title" :subtitle="subtitle">
    <template #button>
      <BaseButton
        :disabled="projectsStore.loading"
        case="uppercase"
        :onclick="onClick"
      >
        {{ btn }}
      </BaseButton>
    </template>
  </BaseStub>
</template>

<script setup lang="ts">
  import BaseStub from './base/BaseStub.vue';
  import BaseButton from './base/BaseButton.vue';
  import { useProjectsStore } from '@/stores/projects/useProjectsStore';
  import { useModalsStore } from '@/stores/modals/useModalsStore';

  const projectsStore = useProjectsStore();
  const modalsStore = useModalsStore();

  const title = 'Ни одной заявки :(';
  const subtitle =
    'Пока на этот проект ещё не подали ни одной заявки, так что ты можешь стать первым!';
  const btn = 'подать заявку';

  function onClick() {
    if (projectsStore.openedProject) {
      modalsStore.openRequestModal(projectsStore.openedProject);
    }
  }
</script>
