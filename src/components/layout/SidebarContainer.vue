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

<style lang="scss" scoped>
  @import '@styles/breakpoints';

  .container {
    display: grid;
    grid-template-columns: 382px auto;
    gap: 2.125rem;

    @media (max-width: $mobile-s) {
      grid-template-columns: auto;
    }
  }

  .aside {
    align-self: flex-start;

    @media (max-width: $mobile-s) {
      display: none;
    }
  }
</style>
