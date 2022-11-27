<template>
  <div class="tooltip-container">
    <slot></slot>
    <button class="btn">
      <img class="icon" :src="questionIconUrl" alt="«?»" />
      <div class="tooltip-msg">{{ message }}</div>
    </button>
  </div>
</template>

<script setup lang="ts">
  import questionIconUrl from '@/assets/icons/question.svg?url';
  type Props = { message: string };
  defineProps<Props>();
</script>

<style lang="scss" scoped>
  @import '@styles/breakpoints';

  .tooltip-msg {
    position: absolute;
    bottom: 100%;
    left: 100%;
    display: none;
    width: min(3000%, 100vw);
    max-width: 22.25rem;
    padding: 0.9375rem;
    font-size: 0.9375rem;
    line-height: 180%;
    text-align: left;
    cursor: default;
    background: #fff;
    border: 1px solid var(--gray-color-1);
    border-radius: 0.625rem;
    box-shadow: 0 0 0.3125rem rgb(0 0 0 / 18%);

    @media (max-width: $mobile-s) {
      right: 0;
      bottom: 130%;
      left: 0;
    }
  }

  .tooltip-msg:hover,
  .tooltip-msg:focus-visible {
    display: none !important;
  }

  .tooltip-container {
    display: flex;
    align-items: center;

    @media (max-width: $mobile-s) {
      position: relative;
    }
  }

  .btn {
    position: relative;
    width: 1.5rem;
    height: 1.5rem;
    padding: 0;
    margin-left: 0.4375rem;
    cursor: pointer;
    background: transparent;
    border: none;

    @media (max-width: $mobile-s) {
      position: static;
    }
  }

  .btn:hover .tooltip-msg,
  .btn:focus-visible .tooltip-msg {
    display: block;
  }

  .icon {
    width: 100%;
    height: 100%;
  }
</style>
