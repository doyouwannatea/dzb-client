<template>
  <BasePanel
    :class="[
      'card',
      { editable: editable && participation, stub: !participation },
    ]"
  >
    <div class="card-content">
      <template v-if="participation && project">
        <p v-if="editable" class="title">{{ project.title }}</p>
        <RouterLink
          v-else
          class="title"
          :to="toProjectRoute(project.id)"
          target="_blank"
        >
          {{ project.title }}
        </RouterLink>
      </template>
      <div v-else class="title stub-line stub-title">Проект не выбран</div>
      <p v-if="participation && project" class="desc">
        {{ project.goal }}
      </p>
      <div v-else class="stub-wrapper">
        <div class="stub-line"></div>
        <div class="stub-line"></div>
      </div>
      <ParticipationCardBadge
        :priority="priority"
        :disabled="!project"
        :use-acronyms="isMobile"
      />
      <DeleteButton
        v-if="editable && participation"
        class="delete-btn"
        @click="$emit('delete', participation!)"
      />
    </div>
  </BasePanel>
</template>

<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { useMobile } from '@/hooks/useBreakpoints';
  import { toProjectRoute } from '@/router/utils/routes';
  import { Participation, ParticipationPriority } from '@/models/Participation';
  import { Project } from '@/models/Project';
  import BasePanel from '../ui/BasePanel.vue';
  import DeleteButton from '../ui/DeleteButton.vue';
  import ParticipationCardBadge from './ParticipationCardBadge.vue';

  const isMobile = useMobile();

  type Props = {
    editable: boolean;
    priority: ParticipationPriority;
    participation?: Participation;
    project?: Project;
  };
  type Emits = {
    (e: 'delete', participation: Participation): void;
  };
  defineProps<Props>();
  defineEmits<Emits>();
</script>

<style lang="scss" scoped>
  @import '@styles/breakpoints';

  .card {
    padding: 1.375rem 1.3125rem;
  }

  .card.sortable-chosen {
    opacity: 0.5;
  }

  .card-content {
    display: grid;
    grid-template-columns: auto minmax(min-content, 16.25rem) min-content;
    column-gap: 0.9375rem;
    align-items: flex-start;

    @media (max-width: $tablet) {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }

  .desc {
    grid-row: 2;
    grid-column: 1;
    margin-top: 0.625rem;
    font-size: 1.125rem;
    line-height: 150%;

    @media (max-width: $tablet) {
      grid-row: 3;
      grid-column: 1 / -1;
      margin-top: 0;
      font-size: 1rem;
    }
  }

  .card.editable {
    cursor: grab;
    user-select: none;

    .desc {
      @media (max-width: $tablet) {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .card-content {
      @media (max-width: $tablet) {
        grid-template-columns: 1fr auto;
      }
    }
  }

  .card.stub {
    background-color: var(--gray-color-1);
    opacity: 1;
  }

  .title {
    justify-self: flex-start;
    font-size: 1.5rem;

    /* text */
    font-weight: 600;
    line-height: 1.9375rem;
    color: #4f5569;
    text-decoration: none;

    @media (max-width: $tablet) {
      grid-row: 2;
      grid-column: 1 / -1;
    }
  }

  a.title:hover {
    text-decoration: underline;
  }

  .delete-btn {
    grid-column: 2;
    justify-self: flex-end;
    width: 2.875rem;
    margin-top: 1rem;

    @media (max-width: $tablet) {
      margin-top: 0;
    }
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

    @media (max-width: $tablet) {
      grid-row: 3;
      margin-top: 0;
    }
  }
</style>
