<template>
  <article :class="['card', stateClass]">
    <header class="header container">
      <h2 class="title">
        {{ project.title }}
      </h2>
      <ProjectStatus class="status" :state="project.state" />
      <div class="subtitle">
        {{ project?.supervisors.length ? project.supervisors.join(', ') : '' }}
      </div>
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
        <div
          v-if="checkProjectDifficulty(project.difficulty)"
          class="difficulty"
        >
          <template
            v-for="(_, idx) in Array.from(new Array(project.difficulty))"
            :key="idx"
          >
            <span class="icon star-icon"></span>
          </template>
          <span>{{ difficultyText }}</span>
        </div>
      </div>
    </div>
    <footer class="footer container">
      <SkillList :skills="props.project.skills" />
      <div class="actions">
        <OpenParticipationModalButton :project="props.project" />
        <OpenFeedbackModalButton :project="props.project" />
        <BaseButton
          is="router-link"
          case="uppercase"
          :to="{ name: RouteNames.PROJECT_DETAILS, params: { id: project.id } }"
        >
          Подробнее
        </BaseButton>
      </div>
    </footer>
  </article>
</template>

<script setup lang="ts">
  import { Project } from '@/models/Project';
  import { DifficultyText } from '@/models/ProjectDifficulty';
  import { StateClass } from '@/models/ProjectState';
  import { RouteNames } from '@/router/types/route-names';
  import { checkProjectDifficulty } from '@/helpers/project';
  // components
  import ProjectStatus from './ProjectStatus.vue';
  import ProjectTeamCounter from './ProjectTeamCounter.vue';
  import SkillList from '../skill/SkillList.vue';
  import OpenParticipationModalButton from '../participation/OpenParticipationModalButton.vue';
  import OpenFeedbackModalButton from '../feedback/OpenFeedbackModalButton.vue';
  import BaseButton from '../ui/BaseButton.vue';

  const props = defineProps<{ project: Project }>();

  const stateClass = StateClass[props.project.state.id];
  const difficultyText = DifficultyText[props.project.difficulty];
</script>

<style scoped>
  .card {
    --border-left-color: var(--accent-color-1);

    width: 100%;
    padding-top: 1.375rem;
    padding-bottom: 1.375rem;
    background: #ffffff;
    border-left: 1.25rem solid var(--border-left-color);
    border-radius: 0.625rem;
    box-shadow: 0px 0px 0.3125rem rgba(0, 0, 0, 0.18);
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
    gap: 3.375rem;
    align-items: center;
    justify-content: space-between;
  }

  .header {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.8125rem;
    align-items: center;
    padding-bottom: 1.25rem;
  }

  .actions {
    display: flex;
    gap: 0.75rem;
    align-self: flex-end;
    margin-left: auto;
  }

  .info {
    display: flex;
    gap: 1.375rem;
    justify-content: flex-end;
    margin-top: 0.625rem;
    font-size: 1.125rem;
    line-height: 1.4375rem;
  }

  .difficulty {
    display: flex;
    gap: 0.5625rem;
    align-items: center;
    color: var(--text-color);
  }

  .icon {
    width: 1.5rem;
    height: 1.5rem;
    background: center / contain no-repeat;
  }

  .star-icon {
    background-image: url('@/assets/icons/star.svg');
  }

  .container {
    padding-right: 1.25rem;
    padding-left: 1.25rem;
  }

  .divider {
    width: 100%;
    height: 2px;
    background-color: var(--gray-color-1);
  }

  .title {
    max-width: 44.0625rem;
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1.9375rem;
    color: #4f5569;
  }

  .subtitle {
    font-size: 1rem;
    font-weight: 400;
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
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.25rem;
    color: var(--text-color);
    list-style: none;
  }
  .list-item:not(:last-child) {
    margin-bottom: 1.0625rem;
  }
</style>
