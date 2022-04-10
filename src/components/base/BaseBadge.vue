<template>
  <div class="badge">
    <slot></slot>
  </div>
</template>

<style scoped>
  .badge {
    --border-color: var(--accent-color-1);
    --text-color: var(--accent-color-1);

    padding: 0.625rem 2rem;
    border: 2px solid var(--border-color);
    border-radius: 6.25rem;
    font-weight: 600;
    font-size: 1rem;
    line-height: normal;
    text-align: center;
    text-transform: uppercase;
    color: var(--text-color);
  }
</style>
