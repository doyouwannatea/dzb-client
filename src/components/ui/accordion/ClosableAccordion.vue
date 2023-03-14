<template>
  <BaseAccordion
    ref="accordionEl"
    :animated="animated"
    :opened="opened"
    @toggle="opened = !opened"
  >
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
  import { onClickOutside } from '@vueuse/core';
  import BaseAccordion from './BaseAccordion.vue';

  interface Props {
    animated?: boolean;
  }

  withDefaults(defineProps<Props>(), {
    animated: false,
  });
  const accordionEl = ref<HTMLElement | null>(null);
  const opened = ref(false);
  onClickOutside(accordionEl, () => (opened.value = false));
</script>
