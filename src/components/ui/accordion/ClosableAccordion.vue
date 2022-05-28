<template>
  <BaseAccordion ref="accordionEl" :opened="opened" @toggle="opened = !opened">
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

  const accordionEl = ref<HTMLElement | null>(null);
  const opened = ref(false);
  onClickOutside(accordionEl, () => (opened.value = false));
</script>
