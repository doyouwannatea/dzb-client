<template>
  <BasePanel
    :cols="1"
    :class="[
      'card',
      { editable: editable && projectRequest, stub: !projectRequest },
    ]"
  >
    <div v-if="projectRequest" class="card-content">
      <RouterLink
        class="title"
        :to="{
          name: RouteNames.PROJECT_DETAILS,
          params: { id: projectRequest.project.id },
        }"
        target="_blank"
      >
        {{ projectRequest.project.title }}
      </RouterLink>
      <p class="desc">{{ projectRequest.project.goal }}</p>

      <BaseBadge class="status">
        {{ projectRequest.state }}
      </BaseBadge>

      <div :class="['priority', { editable }]">
        {{ repeatString('I', priority) }}
      </div>

      <BaseButton
        v-if="editable"
        class="delete-btn"
        variant="outlined"
        color="red"
        @click="$emit('delete', projectRequest!)"
      >
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            class="delete-btn-path"
            d="M3.8208 6.8877H5.8208H21.8208"
            stroke="#E24C4C"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            class="delete-btn-path"
            d="M8.8208 6.8877V4.8877C8.8208 4.35726 9.03151 3.84855 9.40659 3.47348C9.78166 3.09841 10.2904 2.8877 10.8208 2.8877H14.8208C15.3512 2.8877 15.8599 3.09841 16.235 3.47348C16.6101 3.84855 16.8208 4.35726 16.8208 4.8877V6.8877M19.8208 6.8877V20.8877C19.8208 21.4181 19.6101 21.9268 19.235 22.3019C18.8599 22.677 18.3512 22.8877 17.8208 22.8877H7.8208C7.29037 22.8877 6.78166 22.677 6.40659 22.3019C6.03151 21.9268 5.8208 21.4181 5.8208 20.8877V6.8877H19.8208Z"
            stroke="#E24C4C"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </BaseButton>
    </div>
    <div v-else>приоритет {{ priority }}</div>
  </BasePanel>
</template>

<script setup lang="ts">
  import BasePanel from '@/components/base/BasePanel.vue';
  import { repeatString } from '@/helpers/string';
  import { Participation } from '@/models/Participation';
  import { RouteNames } from '@/router/types/route-names';
  import { RouterLink } from 'vue-router';
  import BaseBadge from './base/BaseBadge.vue';
  import BaseButton from './base/BaseButton.vue';

  type Props = {
    editable: boolean;
    priority: number;
    projectRequest?: Participation;
  };
  type Emits = {
    (e: 'delete', request: Participation): void;
  };
  defineProps<Props>();
  defineEmits<Emits>();
</script>

<style scoped>
  .card {
    padding: 1.375rem 1.3125rem;
  }

  .card.sortable-chosen {
    opacity: 0.5;
  }

  .card.editable {
    cursor: grab;
  }

  .card.stub {
    opacity: 1;
    background-color: var(--gray-color-1);
  }

  .card-content {
    display: grid;
    align-items: flex-start;
    grid-template-columns: auto minmax(min-content, 16.25rem) min-content;
    column-gap: 0.9375rem;
  }

  .title {
    justify-self: flex-start;

    /* text */
    font-weight: 600;
    font-size: 1.5rem;
    line-height: 1.9375rem;
    color: #4f5569;
    text-decoration: none;
  }

  .title:hover {
    text-decoration: underline;
  }

  .desc {
    font-size: 1.125rem;
    line-height: 150%;
    margin-top: 0.625rem;
    grid-column: 1;
    grid-row: 2;
  }

  .priority {
    border-radius: 50%;
    background-color: var(--gray-color-1);
    width: 2.8125rem;
    height: 2.8125rem;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    justify-self: flex-end;

    /* text */
    font-weight: 600;
    font-size: 1.5rem;
    line-height: normal;
  }

  .priority.editable {
    color: #fff;
    background-color: var(--accent-color-1);
  }

  .status {
    white-space: nowrap;
    color: var(--gray-color-2);
    border-color: var(--gray-color-2);
  }

  .delete-btn {
    margin-top: 1rem;
    grid-column: 3;
    padding: 0.425rem;
    aspect-ratio: 1 / 1;
  }

  .delete-btn:hover:deep(.delete-btn-path),
  .delete-btn:active:deep(.delete-btn-path) {
    stroke: #fff;
  }
</style>
