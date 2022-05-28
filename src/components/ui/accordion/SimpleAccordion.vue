<template>
  <BaseAccordion :opened="opened" @toggle="opened = !opened">
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
  const props = withDefaults(defineProps<{ defaultOpened?: boolean }>(), {
    defaultOpened: false,
  });
  const opened = ref(props.defaultOpened);
</script>
