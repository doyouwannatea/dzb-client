<template>
  <BasePanel
    :class="[
      'card',
      { editable: editable && participation, stub: !participation },
    ]"
  >
    <div class="card-content">
      <RouterLink
        v-if="participation && project"
        class="title"
        :to="{
          name: RouteNames.PROJECT_DETAILS,
          params: { id: project.id },
        }"
        target="_blank"
      >
        {{ project.title }}
      </RouterLink>
      <div v-else class="title stub-line stub-title">Проект не выбран</div>
      <p v-if="participation && project" class="desc">
        {{ project.goal }}
      </p>
      <div v-else class="stub-wrapper">
        <div class="stub-line"></div>
        <div class="stub-line"></div>
      </div>

      <BaseBadge class="status">
        {{ PriorityText[priority] }} приоритет
        <div class="priority">
          {{ repeatString('I', priority) }}
        </div>
      </BaseBadge>

      <BaseButton
        v-if="editable && participation"
        class="delete-btn"
        variant="outlined"
        color="red"
        @click="$emit('delete', participation!)"
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
  </BasePanel>
</template>

<script setup lang="ts">
  import { repeatString } from '@/helpers/string';
  import { Participation, Priority } from '@/models/Participation';
  import { PriorityText } from '@/models/Participation';
  import { Project } from '@/models/Project';
  import { RouteNames } from '@/router/types/route-names';
  import { RouterLink } from 'vue-router';
  // components
  import BasePanel from '../ui/BasePanel.vue';
  import BaseBadge from '../ui/BaseBadge.vue';
  import BaseButton from '../ui/BaseButton.vue';

  type Props = {
    editable: boolean;
    priority: Priority;
    participation?: Participation;
    project?: Project;
  };
  type Emits = {
    (e: 'delete', participation: Participation): void;
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
    background-color: var(--gray-color-1);
    opacity: 1;
  }

  .card-content {
    display: grid;
    grid-template-columns: auto minmax(min-content, 16.25rem) min-content;
    column-gap: 0.9375rem;
    align-items: flex-start;
  }

  .title {
    justify-self: flex-start;
    font-size: 1.5rem;

    /* text */
    font-weight: 600;
    line-height: 1.9375rem;
    color: #4f5569;
    text-decoration: none;
  }

  .title:hover {
    text-decoration: underline;
  }

  .desc {
    grid-row: 2;
    grid-column: 1;
    margin-top: 0.625rem;
    font-size: 1.125rem;
    line-height: 150%;
  }

  .priority {
    display: flex;
    align-items: center;
    justify-content: center;
    justify-self: flex-end;
    width: 2.8125rem;
    height: 2.8125rem;
    margin-right: -2px;
    margin-left: auto;
    font-size: 1.5rem;

    /* text */
    font-weight: 600;
    line-height: normal;
    color: #fff;
    text-align: center;
    background-color: var(--accent-color-1);
    border-radius: 50%;
  }

  .stub:deep(.priority) {
    background-color: var(--gray-color-2);
  }

  .card:deep(.status) {
    display: flex;
    gap: 0.9375rem;
    align-items: center;
    height: 2.8125rem;
    padding: 0;
    padding-left: 1rem;
    color: var(--accent-color-1);

    /* text */
    white-space: nowrap;
    border-color: var(--accent-color-1);
  }

  .stub:deep(.status) {
    color: var(--gray-color-2);
    border-color: var(--gray-color-2);
  }

  .delete-btn {
    grid-column: 2;
    justify-self: flex-end;
    aspect-ratio: 1 / 1;
    padding: 0.425rem;
    margin-top: 1rem;
  }

  .delete-btn:hover:deep(.delete-btn-path),
  .delete-btn:active:deep(.delete-btn-path) {
    stroke: #fff;
  }

  .stub-title {
    color: var(--gray-color-2);
    text-decoration: none !important;
  }

  .stub-line {
    padding: 0.5rem 0.75rem;
    background-color: #d2d2d2;
  }

  .stub-wrapper {
    display: flex;
    flex-direction: column;
    grid-row: 2;
    gap: 0.5rem;
    margin-top: 0.75rem;
  }
</style>
