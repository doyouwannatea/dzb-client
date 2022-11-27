<template>
  <div :class="['card', props.size]"></div>
</template>

<script setup lang="ts">
  interface Props {
    size?: 's' | 'm';
  }

  const props = withDefaults(defineProps<Props>(), {
    size: 'm',
  });
</script>

<style lang="scss" scoped>
  .card {
    position: relative;
    overflow: hidden;
    background: var(--gray-color-1);
    border-radius: 0.625rem;

    &::before {
      position: absolute;
      top: -20%;
      width: 10%;
      height: 200%;
      content: '';
      background-color: var(--light-color);
      filter: blur(10px);
      opacity: 0.2;
      transform: rotate(20deg);
      animation: translate 1100ms linear infinite;
    }

    &.s {
      height: 8.9375rem;
    }

    &.m {
      height: 29.0625rem;
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
