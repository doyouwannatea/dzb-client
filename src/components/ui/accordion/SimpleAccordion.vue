<template>
  <BaseAccordion v-model:opened="opened" :animated="animated">
    <template #title>
      <slot name="title"></slot>
    </template>
    <template #content>
      <slot name="content"></slot>
    </template>
  </BaseAccordion>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import BaseAccordion from './BaseAccordion.vue';

  interface Props {
    defaultOpened?: boolean;
    animated?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    defaultOpened: false,
    animated: false,
  });
  const opened = ref(props.defaultOpened);
</script>
