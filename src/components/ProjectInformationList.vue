<template>
  <ul class="info-list">
    <slot>
      <template
        v-for="{ title, value, bold, wide } in items"
        :key="title + value"
      >
        <ProjectInformationListItem :title="title" :bold="bold" :wide="wide">
          {{ value }}
        </ProjectInformationListItem>
      </template>
    </slot>
  </ul>
</template>

<script setup lang="ts">
  import type { PropType } from 'vue';
  import ProjectInformationListItem from './ProjectInformationListItem.vue';

  interface Item {
    title: string;
    value: string;
    wide?: boolean;
    bold?: boolean;
  }

  defineProps({
    items: {
      type: Array as PropType<Item[]>,
      default: () => [],
    },
  });
</script>

<style scoped>
  .info-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    row-gap: 45px;
    font-size: 1.13rem;
  }
</style>
