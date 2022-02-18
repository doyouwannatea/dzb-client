<template>
  <div class="badge">
    <slot></slot>
  </div>
</template>

<style scoped>
  .badge {
    padding: 0.625rem 2rem;
    border: 2px solid var(--accent-color-1);
    border-radius: 6.25rem;
    font-weight: 600;
    font-size: 1rem;
    line-height: normal;
    text-align: center;
    text-transform: uppercase;
    color: var(--accent-color-1);
  }
</style>
