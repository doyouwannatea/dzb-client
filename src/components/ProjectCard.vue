<template>
  <article :class="['card', stateClass]">
    <header class="header container">
      <h2 class="title">
        {{ project.title }}
      </h2>
      <BaseBadge class="status">{{ project.state.state }}</BaseBadge>
      <div class="subtitle">{{ project.customer }}</div>
    </header>
    <div class="divider"></div>
    <div class="body container">
      <ul class="list">
        <li class="list-item">
          <b>Цель:</b>
          {{ project.goal }}
        </li>
        <li class="list-item">
          <b>Требования к студентам:</b>
          {{ project.requirements }}
        </li>
        <li class="list-item">
          <b>Сроки реализации:</b> {{ project.date_start }} –
          {{ project.date_end }}
        </li>
        <li class="list-item"><b>Тип проекта:</b> {{ project.type.type }}</li>
      </ul>
      <div class="info">
        <ProjectTeamCounter
          class="team-counter"
          :count="project.places"
          :total="12"
        />
        <div class="difficulty">
          <span class="icon star-icon"></span>
          <span>{{ difficultyText }}</span>
        </div>
      </div>
    </div>
    <footer class="footer container">
      <SkillsList :skills="props.project.skills" />
      <div class="actions">
        <BaseButton
          case="uppercase"
          variant="outlined"
          @click="projectsStore.openRequestModal(props.project)"
        >
          Подать заявку
        </BaseButton>
        <BaseButton
          is="router-link"
          case="uppercase"
          :to="{ name: RouteNames.PROJECT_DETAILS, params: { id: project.id } }"
          target="_blank"
        >
          Подробнее
        </BaseButton>
      </div>
    </footer>
  </article>
</template>

<script setup lang="ts">
  import BaseBadge from './base/BaseBadge.vue';
  import BaseButton from './base/BaseButton.vue';
  import ProjectTeamCounter from './ProjectTeamCounter.vue';
  import type { Project } from '@/models/Project';
  import { RouteNames } from '@/router/types/route-names';
  import { DifficultyText } from '@/models/values/difficulty-text';
  import { StateClass } from '@/models/values/state-class';
  import { useProjectsStore } from '@/stores/projects/useProjectsStore';
  import SkillsList from './SkillsList.vue';

  const props = defineProps<{ project: Project }>();
  const projectsStore = useProjectsStore();

  const stateClass = StateClass[props.project.state.state];
  const difficultyText = DifficultyText[props.project.difficulty];
</script>

<style scoped>
  .card {
    --status-color: var(--accent-color-1);
    --border-left-color: var(--accent-color-1);
    --team-counter-color: var(--accent-color-1);

    width: 100%;
    background: #ffffff;
    box-shadow: 0px 0px 0.3125rem rgba(0, 0, 0, 0.18);
    border-radius: 0.625rem;
    border-left: 1.25rem solid var(--border-left-color);
    padding-top: 1.375rem;
    padding-bottom: 1.375rem;
  }

  .card.active {
    --status-color: #26ab5b;
    --border-left-color: #26ab5b;
    --team-counter-color: #26ab5b;
  }

  .card.recruitment {
    --status-color: #ffa500;
    --border-left-color: #ffa500;
    --team-counter-color: #ff7a00;
  }

  .card.closed {
    --status-color: #e24c4c;
    --border-left-color: #e24c4c;
    --team-counter-color: #e24c4c;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 3.375rem;
  }

  .header {
    padding-bottom: 1.25rem;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.8125rem;
  }

  .actions {
    display: flex;
    gap: 0.75rem;
    align-self: flex-end;
  }

  .info {
    display: flex;
    justify-content: flex-end;
    font-size: 1.125rem;
    line-height: 1.4375rem;
    gap: 1.375rem;
    margin-top: 0.625rem;
  }

  .difficulty {
    display: flex;
    align-items: center;
    gap: 0.5625rem;
  }

  .difficulty {
    color: var(--text-color);
  }

  .team-counter {
    color: var(--team-counter-color) !important;
  }

  .icon {
    width: 1.5rem;
    height: 1.5rem;
    background: center / contain no-repeat;
  }

  .star-icon {
    background-image: url('../assets/icons/star.svg');
  }

  .container {
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  }

  .divider {
    width: 100%;
    height: 2px;
    background-color: var(--gray-color-1);
  }

  .title {
    font-weight: 600;
    font-size: 1.5rem;
    line-height: 1.9375rem;
    color: #4f5569;
    max-width: 44.0625rem;
  }

  .subtitle {
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.25rem;
    color: #4f5569;
  }

  .status {
    align-self: flex-start;
    justify-self: flex-end;
    border-color: var(--status-color) !important;
    color: var(--status-color) !important;
  }

  .body {
    padding-top: 2.3125rem;
    padding-bottom: 1.625rem;
  }

  .list {
    padding-left: 0;
  }

  .list-item {
    font-weight: 600;
    font-size: 1rem;
    line-height: 1.25rem;
    color: var(--text-color);
    list-style: none;
  }
  .list-item:not(:last-child) {
    margin-bottom: 1.0625rem;
  }
</style>
