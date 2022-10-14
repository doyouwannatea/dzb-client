<template>
  <div class="timer">
    <template v-if="!isTimePass">
      <div class="title">{{ duration }}</div>
      <div>{{ props.timerText }}</div>
    </template>
    <template v-if="isTimePass">
      <div class="title">{{ props.afterTimerText }}</div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue';
  import { Duration } from 'luxon';

  type Props = { deadline: Date; timerText: string; afterTimerText: string };

  const props = defineProps<Props>();

  const timer = ref<number | undefined>(undefined);
  const duration = ref<string>('');
  const isTimePass = ref<boolean>(false);

  function calcTime() {
    const diff = props.deadline.getTime() - Date.now();
    if (diff <= 0) {
      isTimePass.value = true;
      return clearTimer();
    }
    duration.value = Duration.fromObject({
      day: Math.floor(Duration.fromMillis(diff).as('days')),
      hour: Math.floor(Duration.fromMillis(diff).as('hours')),
      minutes: Math.floor(Duration.fromMillis(diff).as('minutes')),
    }).toHuman();
  }

  function clearTimer() {
    window.clearInterval(timer.value);
  }

  onMounted(() => {
    calcTime();
    timer.value = window.setInterval(calcTime, 1000);
  });

  onUnmounted(clearTimer);
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
</style>
