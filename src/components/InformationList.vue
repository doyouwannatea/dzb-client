<template>
  <ul :class="['info-list', `gap-${rowGap}`]">
    <slot>
      <template
        v-for="{ title, content, bold, wide } in items"
        :key="title + content"
      >
        <InformationListItem :bold="bold" :wide="wide">
          <template #title>{{ title }}</template>
          <template #default>
            {{ content }}
          </template>
        </InformationListItem>
      </template>
    </slot>
  </ul>
</template>

<script setup lang="ts">
  import { withDefaults } from 'vue';
  import InformationListItem from './InformationListItem.vue';

  interface Item {
    title: string;
    content: string;
    wide?: boolean;
    bold?: boolean;
  }

  withDefaults(
    defineProps<{
      items?: Item[];
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
    list-style: none;
    display: flex;
    flex-direction: column;
    font-size: 1.13rem;
  }

  .gap-m {
    row-gap: 1.0625rem;
  }
  .gap-l {
    row-gap: 2.8125rem;
  }
</style>
