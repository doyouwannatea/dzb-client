<template>
  <span class="tag">
    <slot></slot>
  </span>
</template>

<style scoped>
  .tag {
    display: inline-block;
    padding: 0.4375rem 1.25rem;
    background: #f1f4fe;
    border-radius: 1.875rem;

    font-size: 0.875rem;
    line-height: 1.125rem;

    color: var(--accent-color-1);
  }
</style>
