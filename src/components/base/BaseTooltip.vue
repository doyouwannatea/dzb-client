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

<style scoped>
  .tooltip-container {
    display: flex;
    align-items: center;
  }

  .btn {
    width: 1.5rem;
    height: 1.5rem;
    margin-left: 0.4375rem;
    padding: 0;
    border: none;
    cursor: pointer;
    background: transparent;
    position: relative;
  }

  .btn:hover .tooltip-msg,
  .btn:focus-visible .tooltip-msg {
    display: block;
  }

  .icon {
    width: 100%;
    height: 100%;
  }

  .tooltip-msg {
    background: #ffffff;
    border: 1px solid var(--gray-color-1);
    box-shadow: 0px 0px 0.3125rem rgba(0, 0, 0, 0.18);
    border-radius: 0.625rem;
    padding: 0.9375rem;
    max-width: 22.25rem;
    width: 3000%;
    position: absolute;
    left: 100%;
    bottom: 100%;
    text-align: left;
    font-size: 0.9375rem;
    line-height: 180%;
    display: none;
    cursor: default;
  }
</style>
