<template>
  <div class="timer">
    <div class="title">3 дня 10:12:54</div>
    <div>до конца приема заявок на проектное обучение</div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
  .timer {
    padding: 2.1875rem 3.5rem 1.375rem;
    margin-top: 1.25rem;
    background: #f1f4fe;
    text-align: center;
    border: 1px solid #d1dcfd;
    border-radius: 0.625rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .title {
    margin-bottom: 0.75rem;
    font-weight: 800;
    font-size: 2.25rem;
    line-height: 2.875rem;
    color: var(--accent-color-1);
  }
</style>
