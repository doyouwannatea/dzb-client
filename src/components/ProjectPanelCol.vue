<template>
  <div class="col">
    <slot></slot>
  </div>
</template>

<style scoped>
  .col:not(:last-child) {
    padding-right: 30px;
    margin-right: 30px;
    border-right: 1px solid var(--gray-color-1);
  }
</style>
