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

    font-family: 'Geometria';
    font-weight: bold;
    font-size: 1.4375rem;
    line-height: 1em;
    text-transform: uppercase;
    text-decoration: none;
    color: var(--accent-color-1);
  }

  .logo-icon {
    min-width: var(--width);
    height: var(--height);
    background: url('../assets/icons/new-logo.svg') center / contain no-repeat;
  }

  .small {
    text-transform: initial;
    font-size: 0.7826em;
    font-weight: 600;
    line-height: 1.375em;
  }
</style>
