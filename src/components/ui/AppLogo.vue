<template>
  <div class="logo">
    <span class="logo-icon"></span>
    <span
      >Проектная деятельность <br /><small class="small">в ИРНИТУ</small></span
    >
  </div>
</template>

<style scoped>
  .logo {
    --width: 3.125rem;
    --height: 3.125rem;

    display: flex;
    gap: 1.25rem;
    align-items: center;

    font-family: 'Geometria', Arial, Helvetica, sans-serif;
    font-size: 1.4375rem;
    font-weight: bold;
    line-height: 1em;
    color: var(--accent-color-1);
    text-decoration: none;
    text-transform: uppercase;
  }

  .logo-icon {
    min-width: var(--width);
    height: var(--height);
    background: url('@/assets/icons/new-logo.svg') center / contain no-repeat;
  }

  .small {
    font-size: 0.7826em;
    font-weight: 600;
    line-height: 1.375em;
    text-transform: initial;
  }
</style>
