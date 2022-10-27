<template>
  <template v-if="!isTimePass">
    <div class="timer">
      <div class="text">{{ props.timerText }}</div>
      <div class="time">{{ duration }}</div>
    </div>
  </template>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue';
  import { Duration } from 'luxon';
  import { declOfNum } from '@/helpers/string';

  type Props = { deadline: Date; timerText: string };

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
      hour: Math.floor(Duration.fromMillis(diff).as('hours') % 24),
      minutes: Math.floor(Duration.fromMillis(diff).as('minutes') % 60),
      seconds: Math.floor(Duration.fromMillis(diff).as('seconds') % 60),
    }).toFormat(
      `d ${declOfNum(Math.floor(Duration.fromMillis(diff).as('days')), [
        'день',
        'дня',
        'дней',
      ])} hh:mm:ss`,
    );
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
    align-items: flex-end;
    justify-content: center;
  }
  .text {
    font-size: 12px;
    font-weight: normal;
    line-height: 15px;
    color: var(--gray-color-2);
  }
  .time {
    font-size: 18px;
    font-weight: 600;
    line-height: 23px;
    color: var(--accent-color-1);
  }
</style>
