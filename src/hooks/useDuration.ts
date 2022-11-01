import { ref, onMounted, onUnmounted } from 'vue';
import { Duration } from 'luxon';
import { declOfNum } from '@/helpers/string';

export const useDuration = (deadline: Date) => {
  const timer = ref<number | undefined>(undefined);
  const duration = ref<string>('');
  const isTimePass = ref<boolean>(false);

  function calcTime() {
    const diff = deadline.getTime() - Date.now();
    if (diff <= 0) {
      isTimePass.value = true;
      return clearTimer();
    }

    const durationObject = Duration.fromMillis(diff);

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

  onMounted(() => {
    calcTime();
    timer.value = window.setInterval(calcTime, 1000);
  });

  onUnmounted(clearTimer);

  return {
    isTimePass,
    duration,
  };
};
