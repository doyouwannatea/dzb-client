<template>
  <a class="logo" href="#">
    <span
      :style="{
        backgroundImage: logoIcon && `url(${logoIcon})`,
        minWidth: `${logoWidth}px`,
        height: `${logoHeight}px`,
      }"
      class="logo-icon"
    ></span>
    <span>Проектная деятельность <br /><small>в ИРНИТУ</small></span>
  </a>
</template>

<script setup lang="ts">
  defineProps<{ logoIcon?: string; logoWidth?: number; logoHeight?: number }>();
</script>

<style scoped>
  .logo {
    display: flex;
    gap: 1.25rem;
    align-items: center;

    font-family: 'Geometria';
    font-weight: bold;
    font-size: 23px;
    line-height: 1em;
    text-transform: uppercase;
    text-decoration: none;
    color: var(--accent-color-1);
  }

  .logo-icon {
    min-width: 36px;
    height: 51px;
    background: url('../assets/logo.svg') center / contain no-repeat;
  }

  .logo small {
    text-transform: initial;
    font-size: 0.7826em;
    font-weight: 600;
    line-height: 1.375em;
  }
</style>
