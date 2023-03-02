<template>
  <article :class="['card', stateClass]">
    <header class="header container">
      <RouterLink
        class="title"
        :to="{ name: RouteNames.PROJECT_DETAILS, params: { id: project.id } }"
      >
        {{ project.title }}
      </RouterLink>
      <ProjectStatus class="status" :state="project.state" />
      <div
        v-if="project?.supervisorsNames || project?.supervisors.length > 0"
        class="subtitle"
      >
        {{ project.supervisorsNames || project.supervisors.join(', ') }}
      </div>
      <div v-if="project?.specialities.length > 0" class="subtitle">
        {{ project.specialities.map((ins) => ins.name).join(', ') }}
      </div>
      <ProjectCardInfo
        class="info--mobile-s"
        :places="project.places"
        :difficulty="project.difficulty"
      />
    </header>
    <div class="divider"></div>
    <div class="body container">
      <ul class="list">
        <li v-if="project.goal" class="list-item">
          <b>Цель:</b>
          {{ project.goal }}
        </li>
        <li v-if="project.requirements" class="list-item">
          <b>Требования к студентам:</b>
          {{ project.requirements }}
        </li>
        <li v-if="project.date_start" class="list-item">
          <b>Старт проекта:</b> {{ project.date_start }}
        </li>
      </ul>
      <ProjectCardInfo
        class="info--desktop-s"
        :places="project.places"
        :difficulty="project.difficulty"
      />
    </div>
    <footer class="footer container">
      <SkillList
        :skills="
          props.project.skills.filter(
            (skill) => skill.name.split(' ').length < 10,
          )
        "
      />
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
  import { RouterLink } from 'vue-router';
  import { Project } from '@/models/Project';
  import { DifficultyText } from '@/models/ProjectDifficulty';
  import { StateClass } from '@/models/ProjectState';
  import { RouteNames } from '@/router/types/route-names';
  // components
  import ProjectStatus from './ProjectStatus.vue';
  import SkillList from '../skill/SkillList.vue';
  import OpenParticipationModalButton from '../participation/OpenParticipationModalButton.vue';
  import OpenFeedbackModalButton from '../feedback/OpenFeedbackModalButton.vue';
  import BaseButton from '../ui/BaseButton.vue';
  import ProjectCardInfo from './ProjectCardInfo.vue';

  const props = defineProps<{ project: Project }>();

  const stateClass = StateClass[props.project.state.id];
</script>

<style lang="scss" scoped>
  @import '@styles/breakpoints';

  .card {
    --border-left-color: var(--accent-color-1);

    width: 100%;
    padding-top: 1.375rem;
    padding-bottom: 1.375rem;
    background: #fff;
    border-left: 1.25rem solid var(--border-left-color);
    border-radius: 0.625rem;
    box-shadow: 0 0 0.3125rem rgb(0 0 0 / 18%);

    @media (max-width: $mobile-s) {
      border-left: none;
    }
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

  .card.processing {
    --border-left-color: var(--accent-color-3);
  }

  .footer {
    display: flex;
    gap: 3.375rem;
    align-items: center;
    justify-content: space-between;

    @media (max-width: $mobile-s) {
      flex-direction: column;
      gap: 18px;
      align-items: initial;
    }
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

    @media (max-width: $mobile-s) {
      flex-direction: column;
      align-items: initial;
      align-self: initial;
      margin-left: 0;
    }
  }

  .info {
    &--mobile-s {
      display: none;
      grid-row: 4;
      grid-column: 1;
      margin-top: 0;

      @media (max-width: $mobile-s) {
        display: flex;
      }
    }

    &--desktop-s {
      @media (max-width: $mobile-s) {
        display: none;
      }
    }
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
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }

    &:focus-visible {
      text-decoration: underline;
    }
    @media (max-width: $mobile-s) {
      grid-column: 1 / -1;
      max-width: auto;
    }
  }

  .subtitle {
    grid-column: 1 / -1;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.25rem;
    color: #4f5569;

    &:nth-child(3) {
      grid-row: 2;
    }

    &:nth-child(4) {
      grid-row: 3;
    }
  }

  .status {
    align-self: flex-start;
    justify-self: flex-end;
    white-space: nowrap;

    @media (max-width: $mobile-s) {
      grid-column: 2;
      padding-right: 1rem;
      padding-left: 1rem;
    }
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
