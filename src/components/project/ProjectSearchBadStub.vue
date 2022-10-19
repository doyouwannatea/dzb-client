<template>
  <BaseStub :title="title" :subtitle="subtitle">
    <template #button>
      <BaseButton case="uppercase" @click="clearFilter()">
        {{ btn }}
      </BaseButton>
    </template>
  </BaseStub>
</template>

<script setup lang="ts">
  import { useProjectFilters } from '@/hooks/useProjectFilters';
  // components
  import BaseStub from '@/components/ui/BaseStub.vue';
  import BaseButton from '@/components/ui/BaseButton.vue';

  const { clearFilter } = useProjectFilters();

  const title = 'Проекты не найдены :(';
  const subtitle =
    'Пока нет ни одного проекта с введённым названием и/или выбранными фильтрами';
  const btn = 'сбросить фильтры';
</script>
