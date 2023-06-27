<template>
  <div class="panel">
    <!-- @slot Контент внутри панели -->
    <slot></slot>
  </div>
</template>

<style scoped>
  .panel {
    padding: 2rem;
    margin-bottom: 0.9375rem;
    background: #fff;
    border-radius: 0.625rem;
    box-shadow: 0 0 0.3125rem rgb(0 0 0 / 18%);
  }
</style>
