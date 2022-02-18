<template>
  <div class="container">
    <aside class="aside">
      <slot name="sidebar"></slot>
    </aside>
    <div>
      <slot name="main"></slot>
    </div>
  </div>
</template>

<style scoped>
  .container {
    display: grid;
    grid-template-columns: 382px auto;
    gap: 2.125rem;
  }

  .aside {
    background: #ffffff;
    border: 1px solid var(--gray-color-1);
    border-radius: 0.625rem;
    align-self: flex-start;
  }
</style>
