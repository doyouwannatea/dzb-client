<template>
  <div class="timer">
    <div class="title">
      Прием заявок на проектное обучение закончен, добор в проекты будет открыт
      в августе 2022
    </div>
    <!-- <div class="title">{{ duration }}</div>-->
    <!-- <div>второй этап откроется в августе</div> -->
  </div>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue';
  import { Duration } from 'luxon';

  const DEADLINE = new Date('2022/06/30');
  const timer = ref<number | undefined>(undefined);
  const duration = ref<string>('');

  function calcTime() {
    const diff = new Date(DEADLINE.getTime() - Date.now());

    duration.value = Duration.fromObject({
      day: diff.getDate(),
      hour: diff.getHours(),
      minutes: diff.getMinutes(),
    }).toHuman();
  }

  onMounted(() => {
    // calcTime();
    // timer.value = window.setInterval(calcTime, 1000);
  });

  onUnmounted(() => {
    // window.clearInterval(timer.value);
  });
</script>

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
    font-size: 1.65rem;
    font-weight: 800;
    line-height: 2.875rem;
    color: var(--accent-color-1);
  }
</style>
