<template>
  <div class="container">
    <aside class="aside">
      <slot name="sidebar"></slot>
    </aside>
    <slot name="main"></slot>
  </div>
</template>

<style scoped>
  .container {
    display: grid;
    grid-template-columns: 382px auto;
    gap: 34px;
  }

  .aside {
    background: #ffffff;
    border: 1px solid var(--gray-color-1);
    border-radius: 10px;
    align-self: flex-start;
  }
</style>
