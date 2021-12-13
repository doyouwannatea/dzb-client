<template>
  <div class="badge">
    <slot>новый</slot>
  </div>
</template>

<style scoped>
  .badge {
    padding: 10px 32px;
    border: 2px solid var(--accent-color-1);
    border-radius: 100px;
    font-weight: 600;
    font-size: 16px;
    line-height: normal;
    text-align: center;
    text-transform: uppercase;
    color: var(--accent-color-1);
  }
</style>
