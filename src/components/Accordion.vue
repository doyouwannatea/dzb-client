<template>
  <VueCollapsiblePanel>
    <template #title>
      <slot name="title"></slot>
    </template>
    <template #content>
      <slot name="content"></slot>
    </template>
  </VueCollapsiblePanel>
</template>

<script lang="js">
  import {
    VueCollapsiblePanel
  } from '@dafcoe/vue-collapsible-panel'

  export default {
    components: {
        VueCollapsiblePanel,
    }
  }
</script>

<style>
  .vcp__header {
    display: flex;
    flex-flow: row-reverse;
    justify-content: flex-end;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    padding-top: 10px;
    padding-bottom: 10px;
    font-weight: 700;
    font-size: 20px;
    line-height: 26px;
    color: var(--text-color);
  }

  .vcp__header:hover {
    color: var(--accent-color-1);
  }

  .vcp__header-icon {
    opacity: 0.6;
  }

  .vcp__body {
    height: auto !important;
  }

  .vcp__body-content {
    margin-top: 6px;
    padding-bottom: 25px;
  }

  .vcp--expanded .vcp__header-icon {
    transform: rotate(180deg);
  }
</style>
