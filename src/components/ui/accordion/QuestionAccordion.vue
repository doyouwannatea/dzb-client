<template>
  <BasePanel class="panel">
    <ClosableAccordion class="question">
      <template #title>
        <slot name="title"></slot>
      </template>
      <template #content>
        <div class="content">
          <slot name="content"></slot>
        </div>
      </template>
    </ClosableAccordion>
  </BasePanel>
</template>

<script setup lang="ts">
  import BasePanel from '@/components/ui/BasePanel.vue';
  import ClosableAccordion from './ClosableAccordion.vue';
</script>

<style lang="scss" scoped>
  @import '@styles/breakpoints';

  .question {
    &:deep(.icon) {
      position: absolute;
      top: 50%;
      right: 2.5rem;
      width: 1.25rem;
      height: 0.6875rem;
      transform: translateY(-50%) rotate(180deg);
    }

    &:deep(.title) {
      position: relative;
      padding: 1.875rem;
      padding-right: 4rem;
      font-size: 1.5rem;
      font-weight: 800;
      line-height: 2.5rem;
      color: var(--accent-color-1);
      cursor: pointer;
      border-radius: 0.625rem;
      outline-offset: -1px;

      &:hover {
        text-decoration: underline;
      }

      @media (max-width: $tablet) {
        padding: 1rem;
        padding-right: 4rem;
        font-size: 1.2rem;
        line-height: 2rem;
      }
    }
  }

  .panel {
    padding: 0 !important;
    overflow: hidden;
    font-family: Mont, Arial, Helvetica, sans-serif;
  }

  .content {
    padding: 1.875rem;
    padding-top: 0;
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 150%;
    color: var(--text-color);

    @media (max-width: $tablet) {
      padding: 1rem;
      padding-top: 0;
      font-size: 1.2rem;
    }
  }
</style>
