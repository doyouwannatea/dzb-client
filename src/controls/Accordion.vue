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
