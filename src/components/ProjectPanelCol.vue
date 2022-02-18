<template>
  <div class="col">
    <slot></slot>
  </div>
</template>

<style scoped>
  .col:not(:last-child) {
    padding-right: 1.875rem;
    margin-right: 1.875rem;
    border-right: 1px solid var(--gray-color-1);
  }
</style>
