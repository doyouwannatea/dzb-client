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
    duration.value = Duration.fromObject({
      day: Math.floor(Duration.fromMillis(diff).as('days')),
      hour: Math.floor(Duration.fromMillis(diff).as('hours') % 24),
      minutes: Math.floor(Duration.fromMillis(diff).as('minutes') % 60),
      seconds: Math.floor(Duration.fromMillis(diff).as('seconds') % 60),
    }).toFormat(
      Math.floor(Duration.fromMillis(diff).as('days')) > 0
        ? `d ${declOfNum(Math.floor(Duration.fromMillis(diff).as('days')), [
            'день',
            'дня',
            'дней',
          ])} hh:mm:ss`
        : `hh:mm:ss`,
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

  return {
    isTimePass,
    duration,
  };
};
