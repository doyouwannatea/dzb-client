<template>
  <span :class="$style.required">*</span>
</template>

<style module lang="scss">
  .required {
    font-weight: bold;
    color: var(--red-color-1);
  }
</style>
