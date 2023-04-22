<template>
  <div class="timer">
    <template v-if="isTime">
      <div class="title time">{{ duration }}</div>
      <div>{{ props.timerText }}</div>
    </template>
    <template v-if="!isTime">
      <div class="title">{{ props.afterTimerText }}</div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { useDuration } from '@/hooks/useDuration';

  type Props = {
    start: Date;
    deadline: Date;
    timerText: string;
    afterTimerText: string;
  };
  const props = defineProps<Props>();

  const { duration, isTime } = useDuration(props.start, props.deadline);
</script>

<style scoped>
  .timer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2.1875rem 2.5rem 1.375rem;
    margin-top: 1.25rem;
    text-align: center;
    background: #f1f4fe;
    border: 1px solid #d1dcfd;
    border-radius: 0.625rem;
  }

  .title {
    margin-bottom: 0.75rem;
    font-size: 1.65rem;
    font-weight: 800;
    line-height: 2.875rem;
    color: var(--accent-color-1);
  }

  .time {
    font-size: 2.25rem;
  }
</style>
