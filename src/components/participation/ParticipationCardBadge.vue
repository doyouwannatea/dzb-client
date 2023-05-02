<template>
  <BaseBadge
    :class="[
      'status',
      {
        ['auto-participation']: isAuto,
        ['disabled']: disabled,
      },
    ]"
  >
    <span class="status-text">
      {{ statusText }}
    </span>
    <div class="status-tag">{{ intToRoman(priority) }}</div>
  </BaseBadge>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import BaseBadge from '@/components/ui/BaseBadge.vue';
  import {
    ParticipationPriority,
    ParticipationPriorityText,
  } from '@/models/Participation';
  import { intToRoman } from '@/helpers/string';
  import { isAutoParticipation } from '@/api/CandidateApi/utils/participations';

  type Props = {
    priority: ParticipationPriority;
    disabled: boolean;
  };
  const props = withDefaults(defineProps<Props>(), { disabled: false });
  const isAuto = computed(() => isAutoParticipation(props.priority));
  const statusText = computed(() =>
    isAuto.value
      ? 'Автоматическое распределение'
      : ParticipationPriorityText[props.priority] + ' приоритет',
  );
</script>

<style lang="scss" scoped>
  @import '@styles/breakpoints';

  .status-text {
    margin: 0 auto;
  }

  .status-tag {
    display: flex;
    align-items: center;
    justify-content: center;
    justify-self: flex-end;
    width: 2.8125rem;
    height: 2.8125rem;
    margin-right: -2px;
    font-size: 1.5rem;

    /* text */
    font-weight: 600;
    line-height: normal;
    color: #fff;
    text-align: center;
    background-color: var(--text-color);
    border-radius: 50%;

    @media (max-width: $tablet) {
      grid-row: 2;
    }
  }

  .status {
    display: flex;
    gap: 0.9375rem;
    align-items: center;
    height: 2.8125rem;
    padding: 0;
    padding-left: 1rem;
    white-space: nowrap;
  }

  .auto-participation {
    --border-color: var(--orange-color-2);
    --text-color: var(--orange-color-2);
  }

  .disabled {
    --border-color: var(--gray-color-2);
    --text-color: var(--gray-color-2);
  }
</style>
