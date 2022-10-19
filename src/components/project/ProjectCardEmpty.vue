<template>
  <ul>
    <li v-for="count in 7" :key="count" class="card"></li>
  </ul>
</template>

<style lang="scss" scoped>
  @import '@styles/breakpoints.scss';

  ul {
    display: flex;
    flex-direction: column;
    gap: 0.9375rem;
    padding-left: 0;
    list-style: none;
  }
  .card {
    --border-left-color: var(--accent-color-1);

    width: 100%;
    height: 29.0625rem;
    border-radius: 0.625rem;
    background: #e7e7e7;

    @media (max-width: $mobile-s) {
      height: 38.375rem;
    }
  }
</style>
