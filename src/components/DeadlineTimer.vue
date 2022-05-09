<template>
  <div class="timer">
    <div class="title">3 дня 10:12:54</div>
    <div>до конца приема заявок на проектное обучение</div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
  .timer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2.1875rem 3.5rem 1.375rem;
    margin-top: 1.25rem;
    text-align: center;
    background: #f1f4fe;
    border: 1px solid #d1dcfd;
    border-radius: 0.625rem;
  }

  .title {
    margin-bottom: 0.75rem;
    font-size: 2.25rem;
    font-weight: 800;
    line-height: 2.875rem;
    color: var(--accent-color-1);
  }
</style>
