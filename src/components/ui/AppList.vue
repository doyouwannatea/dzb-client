<template>
  <ul :class="['info-list', `gap-${rowGap}`]">
    <slot>
      <template
        v-for="{ title, content, bold, wide } in items"
        :key="title + content"
      >
        <AppListItem v-if="content" :bold="bold" :wide="wide">
          <template #title>{{ title }}</template>
          <template #default>
            {{ content }}
          </template>
        </AppListItem>
      </template>
    </slot>
  </ul>
</template>

<script setup lang="ts">
  import { withDefaults } from 'vue';
  // components
  import AppListItem from './AppListItem.vue';

  export interface AppListItemType {
    title: string;
    content?: string;
    wide?: boolean;
    bold?: boolean;
  }

  withDefaults(
    defineProps<{
      items?: AppListItemType[];
      rowGap?: 'm' | 'l';
    }>(),
    {
      items: () => [],
      rowGap: 'l',
    },
  );
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
