<template>
  <BaseStub :title="title" :subtitle="subtitle">
    <template #button>
      <BaseButton
        is="router-link"
        case="uppercase"
        :to="{ name: RouteNames.HOME }"
        @click="
          clearFilter();
          modalsStore.projectFilterModal = false;
        "
      >
        {{ btn }}
      </BaseButton>
    </template>
  </BaseStub>
</template>

<script setup lang="ts">
  import { RouteNames } from '@/router/types/route-names';
  import { useProjectFilters } from '@/hooks/useProjectFilters';
  import { useModalsStore } from '@/stores/modals/useModalsStore';
  // components
  import BaseStub from '@/components/ui/BaseStub.vue';
  import BaseButton from '@/components/ui/BaseButton.vue';

  const { clearFilter } = useProjectFilters();
  const modalsStore = useModalsStore();

  const title = 'Проекты не найдены :(';
  const subtitle =
    'Пока нет ни одного проекта с введённым названием и/или выбранными фильтрами';
  const btn = 'сбросить фильтры';
</script>
