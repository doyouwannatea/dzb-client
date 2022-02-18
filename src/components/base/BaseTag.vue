<template>
  <span class="tag">
    <slot></slot>
  </span>
</template>

<style scoped>
  .tag {
    display: inline-block;
    padding: 7px 20px;
    background: #f1f4fe;
    border-radius: 30px;

    font-size: 14px;
    line-height: 18px;

    color: var(--accent-color-1);
  }
</style>
