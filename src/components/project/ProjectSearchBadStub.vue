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
  import BaseButton from '@/components/ui/BaseButton.vue';
  import BaseStub from '@/components/ui/BaseStub.vue';
  import { useProjectFilters } from '@/hooks/useProjectFilters';

  const { clearFilter } = useProjectFilters();

  const title = 'Проекты не найдены :(';
  const subtitle =
    'Пока нет ни одного проекта с введённым названием и/или выбранными фильтрами';
  const btn = 'сбросить фильтры';
</script>
