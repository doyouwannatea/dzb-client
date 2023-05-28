<template>
  <div v-if="props.isShow" ref="modalBackgroundRef" class="modal-background">
    <section ref="modalRef" :class="['modal', props.size]">
      <!-- CLOSE BUTTON -->
      <button class="close-btn" @click="emit('close')">
        <img :src="closeIconUrl" alt="close button" class="close-icon" />
      </button>
      <!-- CLOSE BUTTON -->

      <!-- HEADER -->
      <header v-if="$slots['header']" class="modal-header">
        <slot name="header"></slot>
      </header>
      <!-- HEADER -->

      <!-- MAIN CONTENT -->
      <div class="modal-content">
        <slot name="default"></slot>
      </div>
      <!-- MAIN CONTENT -->

      <!-- ACTIONS -->
      <footer v-if="$slots['actions']" class="modal-actions">
        <slot name="actions"></slot>
      </footer>
      <!-- ACTIONS -->
    </section>
  </div>
</template>

<script setup lang="ts">
  import { nextTick, ref, watch, withDefaults } from 'vue';
  import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
  import { onClickOutside } from '@vueuse/core';
  import closeIconUrl from '@/assets/icons/close.svg?url';
  import { disableScroll, enableScroll } from '@/helpers/dom';

  export type Props = { isShow: boolean; size?: 's' | 'm' };
  export type Emits = { (e: 'close'): void };

  const emit = defineEmits<Emits>();
  const props = withDefaults(defineProps<Props>(), {
    isShow: false,
    size: 's',
  });

  const modalBackgroundRef = ref<HTMLDivElement | undefined>(undefined);
  const { activate, deactivate } = useFocusTrap(modalBackgroundRef, {
    immediate: true,
  });
  const modalRef = ref<HTMLElement | null>(null);

  onClickOutside(modalRef, () => emit('close'));
  watch(
    () => props.isShow,
    async (isShow) => {
      if (isShow) await onShow();
      else await onHide();
    },
    { immediate: true },
  );

  async function onShow() {
    disableScroll();
    await nextTick();
    activate();
  }

  async function onHide() {
    enableScroll();
    await nextTick();
    deactivate();
  }
</script>

<style lang="scss" scoped>
  @import '@styles/breakpoints';

  .modal {
    --side-p: 2.75rem;
    --top-p: 2.1875rem;
    --bottom-p: 2.5rem;

    position: relative;
    width: 100%;
    padding-top: var(--top-p);
    padding-bottom: var(--bottom-p);
    background: #fff;
    border-radius: 0.625rem;
    box-shadow: 0 0 0.3125rem rgb(0 0 0 / 18%);
  }

  .modal.s {
    --top-p: 4rem;

    width: min-content;
    min-width: 43.125rem;

    @media (max-width: $tablet) {
      width: 100%;
      min-width: auto;
      margin-right: 1.6875rem;
      margin-left: 1.6875rem;
    }
  }

  .modal.m {
    max-width: 60rem;

    @media (max-width: $tablet) {
      --top-p: 4.188rem;
      --bottom-p: 1rem;
      --side-p: 1rem;

      min-height: 100%;
      border-radius: 0;
    }
  }

  /* common content styles */

  /* Headlines */
  .modal:deep(h1) {
    font-size: 2.5rem;
    font-weight: 800;
    line-height: 3.1875rem;

    @media (max-width: $tablet) {
      font-size: 2rem;
      line-height: normal;
    }
  }

  .modal:deep(h2) {
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1.9375rem;
  }

  /* text */
  .modal:deep(p) {
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 150%;
  }

  /* link */
  .modal:deep(a) {
    font-size: 1.125rem;
  }

  /* common content styles */

  .modal-background {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100000;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    padding: 1rem 0;
    overflow: auto;
    background-color: rgb(0 0 0 / 40%);

    @media (max-width: $tablet) {
      padding: 0;
    }
  }

  .close-icon {
    width: 1.5rem;
    height: 1.5rem;
    object-fit: contain;
  }

  .close-btn {
    position: absolute;
    top: 1rem;
    right: 1.125rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    padding: 0;
    cursor: pointer;
    background-color: transparent;
    border: none;
  }

  .close-btn:hover {
    opacity: 0.8;
  }

  .modal-header,
  .modal-actions,
  .modal-content {
    padding-right: var(--side-p);
    padding-left: var(--side-p);
  }

  .modal-header {
    /* side padding + space for the close button */
    padding-right: calc(var(--side-p) + 1.25rem);
    padding-bottom: 1.6875rem;
    margin-bottom: 2.25rem;
    border-bottom: 2px solid var(--gray-color-1);
  }

  .modal-actions {
    padding-top: 2.25rem;
    margin-top: 2.25rem;
    border-top: 2px solid var(--gray-color-1);
  }
</style>
