<template>
  <div v-if="!isTimePass" class="timer">
    <div class="text">{{ props.timerText }}</div>
    <div class="time">{{ duration }}</div>
  </div>
</template>

<script setup lang="ts">
  import { useDuration } from '@/hooks/useDuration';

  type Props = { deadline: Date; timerText: string };
  const props = defineProps<Props>();

  const { duration, isTimePass } = useDuration(props.deadline);
</script>

<style scoped>
  .timer {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    white-space: nowrap;
  }

  .text {
    font-size: 0.75rem;
    font-weight: normal;
    line-height: 0.9375rem;
    color: var(--gray-color-2);
  }

  .time {
    margin-top: 0.125rem;
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 1.4375rem;
    color: var(--accent-color-1);
  }
</style>
