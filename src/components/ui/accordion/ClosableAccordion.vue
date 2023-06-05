<template>
  <BaseAccordion
    ref="accordionEl"
    v-model:opened="opened"
    :animated="props.animated"
  >
    <template #title>
      <!-- @slot Слот для заголовка компонента -->
      <slot name="title"></slot>
    </template>
    <template #content>
      <!-- @slot Слот контента компонента -->
      <slot name="content"></slot>
    </template>
  </BaseAccordion>
</template>

<script setup lang="ts">
  import { onClickOutside } from '@vueuse/core';
  import { ref } from 'vue';
  import BaseAccordion from './BaseAccordion.vue';

  interface Props {
    /**
     * Анимация вкл / выкл
     */
    animated?: boolean;
    /**
     * Открывать при монтировании компонента
     */
    defaultOpened?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    animated: false,
    defaultOpened: false,
  });
  const accordionEl = ref<HTMLElement | null>(null);
  const opened = ref(props.defaultOpened);
  onClickOutside(accordionEl, () => (opened.value = false));
</script>
