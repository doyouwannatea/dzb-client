<template>
  <div class="tooltip-container">
    <slot></slot>
    <button class="btn">
      <QuestionIcon />
      <div class="tooltip-msg">{{ message }}</div>
    </button>
  </div>
</template>

<script setup lang="ts">
  import QuestionIcon from '@/assets/icons/question.svg?component';
  type Props = { message: string };
  defineProps<Props>();
</script>

<style scoped>
  .tooltip-container {
    display: flex;
    align-items: center;
  }

  .btn {
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

  .tooltip-msg {
    background: #ffffff;
    border: 1px solid var(--gray-color-1);
    box-shadow: 0px 0px 0.3125rem rgba(0, 0, 0, 0.18);
    border-radius: 0.625rem;
    padding: 0.9375rem;
    max-width: 22.25rem;
    width: 3000%;
    position: absolute;
    left: 25px;
    bottom: 25px;
    text-align: left;
    font-size: 0.9375rem;
    line-height: 180%;
    display: none;
    cursor: default;
  }
</style>
