<template>
  <div class="badge">
    <!-- @slot Контент внутри значка -->
    <slot></slot>
  </div>
</template>

<style scoped>
  .badge {
    --border-color: var(--accent-color-1);
    --text-color: var(--accent-color-1);

    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.625rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    line-height: normal;
    color: var(--text-color);
    text-align: center;
    text-transform: uppercase;
    border: 2px solid var(--border-color);
    border-radius: 6.25rem;
  }
</style>
