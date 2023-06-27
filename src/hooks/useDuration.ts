import { Duration } from 'luxon';
import { onUnmounted, ref, watchEffect } from 'vue';
import { declOfNum } from '@/helpers/string';

export const useDuration = (start: Date, deadline: Date) => {
  const timer = ref<number | undefined>(undefined);
  const duration = ref<string>('');
  const isTime = ref<boolean>(true);

  function calcTime() {
    isTime.value = true;
    const diff_start = start.getTime() - Date.now();
    const diff_end = deadline.getTime() - Date.now();
    if (diff_start >= 0 || diff_end <= 0) {
      isTime.value = false;
    }

    if (diff_end <= 0) {
      clearTimer();
    }

    const durationObject = Duration.fromMillis(diff_end);

    const day = Math.floor(durationObject.as('days'));
    const hour = Math.floor(durationObject.as('hours') % 24);
    const minutes = Math.floor(durationObject.as('minutes') % 60);
    const seconds = Math.floor(durationObject.as('seconds') % 60);

    const format: string =
      day > 0
        ? `d ${declOfNum(day, ['день', 'дня', 'дней'])} hh:mm:ss`
        : `hh:mm:ss`;

    duration.value = Duration.fromObject({
      day,
      hour,
      minutes,
      seconds,
    }).toFormat(format);
  }

  function clearTimer() {
    window.clearInterval(timer.value);
  }

  watchEffect(() => {
    clearTimer();
    calcTime();
    timer.value = window.setInterval(calcTime, 1000);
  });

  onUnmounted(clearTimer);

  return {
    isTime,
    duration,
  };
};
