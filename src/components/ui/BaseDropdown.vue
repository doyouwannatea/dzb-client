<template>
  <BasePanel
    v-if="props.isOpen"
    ref="root"
    :style="{ ...position }"
    class="dropdown"
  >
    <slot></slot>
  </BasePanel>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { isPartOfNode } from '@/helpers/dom';
  import { onClickOutside } from '@vueuse/core';
  // components
  import BasePanel from './BasePanel.vue';

  export type Position = {
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
  };
  type Props = {
    isOpen: boolean;
    handleNode: HTMLElement;
    position?: Position;
  };
  type Emits = {
    (e: 'close'): void;
  };

  const props = withDefaults(defineProps<Props>(), {
    position: () => ({}),
  });
  const emit = defineEmits<Emits>();
  const root = ref(null);

  onClickOutside(root, (evt) => {
    if (isPartOfNode(evt.target as HTMLElement, props.handleNode)) return;
    emit('close');
  });
</script>

<style scoped>
  .dropdown {
    position: absolute;
    top: 80%;
    right: 0;
    width: 15rem;
    padding: 1.0625rem 0 !important;
  }
</style>
