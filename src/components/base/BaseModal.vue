<template>
  <UseFocusTrap v-if="props.isShow">
    <div class="modal-background">
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
  </UseFocusTrap>
</template>

<script setup lang="ts">
  import { ref, watch, withDefaults } from 'vue';
  import { onClickOutside } from '@vueuse/core';
  import closeIconUrl from '@/assets/icons/close.svg?url';
  import { UseFocusTrap } from '@vueuse/integrations/useFocusTrap/component';
  import { disableScroll, enableScroll } from '@/helpers/dom';

  type Props = { isShow: boolean; size?: 's' | 'm' };
  type Emits = { (e: 'close'): void };

  const emit = defineEmits<Emits>();
  const props = withDefaults(defineProps<Props>(), {
    isShow: false,
    size: 's',
  });

  const modalRef = ref<HTMLElement | null>(null);

  onClickOutside(modalRef, () => emit('close'));
  watch(
    () => props.isShow,
    (isShow) => {
      if (isShow) disableScroll();
      else enableScroll();
    },
    { immediate: true },
  );
</script>

<style scoped>
  /* common content styles */
  /* Headlines */
  .modal:deep(h1) {
    font-weight: 800;
    font-size: 2.5rem;
    line-height: 3.1875rem;
  }

  .modal:deep(h2) {
    font-weight: 600;
    font-size: 1.5rem;
    line-height: 1.9375rem;
  }

  /* text */
  .modal:deep(p) {
    font-weight: 600;
    font-size: 1.125rem;
    line-height: 150%;
  }

  /* link */
  .modal:deep(a) {
    font-size: 1.125rem;
  }
  /* common content styles */

  .modal-background {
    z-index: 100000;
    overflow: auto;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    --side-p: 2.75rem;
    --top-p: 2.1875rem;
    --bottom-p: 2.5rem;

    position: relative;
    background: #ffffff;
    box-shadow: 0px 0px 0.3125rem rgba(0, 0, 0, 0.18);
    border-radius: 0.625rem;
    padding-top: var(--top-p);
    padding-bottom: var(--bottom-p);
    width: 100%;
  }

  .modal.s {
    max-width: 43.125rem;
  }

  .modal.m {
    max-width: 60rem;
  }

  .close-icon {
    width: 1.5rem;
    height: 1.5rem;
    object-fit: contain;
  }

  .close-btn {
    position: absolute;
    right: 1.125rem;
    top: 1rem;
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    width: 3rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .close-btn:hover {
    opacity: 0.8;
  }

  .modal-header,
  .modal-actions,
  .modal-content {
    padding-left: var(--side-p);
    padding-right: var(--side-p);
  }

  .modal-header {
    /* side padding + space for the close button */
    padding-right: calc(var(--side-p) + 1.25rem);
  }

  .modal-header {
    border-bottom: 2px solid var(--gray-color-1);
    padding-bottom: 1.6875rem;
    margin-bottom: 2.25rem;
  }

  .modal-actions {
    padding-top: 2.25rem;
    margin-top: 2.25rem;
    border-top: 2px solid var(--gray-color-1);
  }
</style>
