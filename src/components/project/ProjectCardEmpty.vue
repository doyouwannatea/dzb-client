<template>
  <div class="card"></div>
</template>

<style lang="scss" scoped>
  .card {
    position: relative;
    height: 29.0625rem;
    border-radius: 0.625rem;
    background: var(--gray-color-1);
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      height: 200%;
      width: 10%;
      background-color: var(--light-color);
      opacity: 0.2;
      top: -20%;
      transform: rotate(20deg);
      animation: translate 1100ms linear infinite;
      filter: blur(10px);
    }
  }

  @keyframes translate {
    0% {
      left: -40%;
    }
    100% {
      left: 100%;
    }
  }
</style>
