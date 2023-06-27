<template>
  <ul :class="['info-list', `gap-${props.rowGap}`]">
    <!-- @slot Слот для тела <code>ul</code>, можно использовать если надо разместить кастомные элементы списка -->
    <slot>
      <template
        v-for="{ title, content, bold, wide } in props.items"
        :key="title + content"
      >
        <AppListItem :bold="bold" :wide="wide">
          <template #title>{{ title }}</template>
          <template #default>
            {{ content || '-' }}
          </template>
        </AppListItem>
      </template>
    </slot>
  </ul>
</template>

<script setup lang="ts">
  import { withDefaults } from 'vue';
  import { AppListItemType } from '@/models/components/AppList';
  import AppListItem from './AppListItem.vue';

  export type RowGap = 'm' | 'l';

  type Props = {
    /**
     * Массив элементов списка
     */
    items?: AppListItemType[];
    /**
     * Расстояние между элементами списка <br />
     */
    rowGap?: RowGap;
  };

  const props = withDefaults(defineProps<Props>(), {
    items: () => [],
    rowGap: 'l',
  });
</script>

<style scoped>
  .info-list {
    display: flex;
    flex-direction: column;
    font-size: 1.13rem;
    list-style: none;
  }

  .gap-m {
    row-gap: 1.0625rem;
  }

  .gap-l {
    row-gap: 2.8125rem;
  }
</style>
