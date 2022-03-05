<template>
  <ul class="info-list">
    <slot>
      <template
        v-for="{ title, content, bold, wide } in items"
        :key="title + content"
      >
        <ProjectDetailsListItem :title="title" :bold="bold" :wide="wide">
          {{ content }}
        </ProjectDetailsListItem>
      </template>
    </slot>
  </ul>
</template>

<script setup lang="ts">
  import { withDefaults } from 'vue';
  import ProjectDetailsListItem from './ProjectDetailsListItem.vue';

  interface Item {
    title: string;
    content: string;
    wide?: boolean;
    bold?: boolean;
  }

  withDefaults(
    defineProps<{
      items?: Item[];
    }>(),
    {
      items: () => [],
    },
  );
</script>

<style scoped>
  .info-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    row-gap: 2.8125rem;
    font-size: 1.13rem;
  }
</style>
