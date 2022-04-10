<template>
  <article :class="['card', stateClass]">
    <header class="header container">
      <h2 class="title">
        {{ project.title }}
      </h2>
      <ProjectStatus class="status" :state="project.state.state" />
      <div class="subtitle">{{ project.supervisor.fio }}</div>
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
          <b>Старт проекта:</b> {{ project.date_start }}
        </li>
      </ul>
      <div class="info">
        <ProjectTeamCounter class="team-counter" :total="project.places" />
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
  import BaseButton from './base/BaseButton.vue';
  import ProjectTeamCounter from './ProjectTeamCounter.vue';
  import type { Project } from '@/models/Project';
  import { RouteNames } from '@/router/types/route-names';
  import { DifficultyText } from '@/models/values/project-difficulty';
  import { StateClass } from '@/models/values/project-state-class';
  import { useProjectsStore } from '@/stores/projects/useProjectsStore';
  import SkillsList from './SkillsList.vue';
  import ProjectStatus from './ProjectStatus.vue';

  const props = defineProps<{ project: Project }>();
  const projectsStore = useProjectsStore();

  const stateClass = StateClass[props.project.state.state];
  const difficultyText = DifficultyText[props.project.difficulty];
</script>

<style scoped>
  .card {
    --border-left-color: var(--accent-color-1);

    width: 100%;
    background: #ffffff;
    box-shadow: 0px 0px 0.3125rem rgba(0, 0, 0, 0.18);
    border-radius: 0.625rem;
    border-left: 1.25rem solid var(--border-left-color);
    padding-top: 1.375rem;
    padding-bottom: 1.375rem;
  }

  .card.active {
    --border-left-color: var(--green-color-1);
  }

  .card.extra {
    --border-left-color: var(--accent-color-2);
  }

  .card.archived {
    --border-left-color: var(--gray-color-2);
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
    align-items: center;
    grid-template-columns: auto 1fr;
    gap: 0.8125rem;
  }

  .actions {
    display: flex;
    gap: 0.75rem;
    align-self: flex-end;
    margin-left: auto;
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
