<template>
  <section v-if="project && !loading && !error">
    <!-- Panel -->
    <BasePanel>
      <div class="status-wrapper">
        <div>
          Мест в проекте
          <ProjectTeamCounter class="counter" :total="project.places" />
        </div>
        <div>
          Статус проекта
          <ProjectStatus class="status" :state="project.state" />
        </div>
      </div>
      <GridLayout>
        <AppList
          :items="[
            {
              title: 'Руководители проекта',
              content: project?.supervisors.length
                ? project.supervisors.join(', ')
                : '',
            },
            {
              title: 'Старт проекта',
              content: project.date_start,
            },
            {
              title: 'Заказчик',
              content: project.customer,
            },
            {
              title: 'Сложность',
              content: DifficultyText[project.difficulty],
            },
          ]"
        />

        <AppList
          :items="[
            {
              title: 'Требования к студентам',
              content: project.requirements,
              wide: true,
            },
            {
              title: 'Цель проекта',
              content: project.goal,
              wide: true,
            },
            {
              title: 'Описание проекта',
              content: project.description,
              wide: true,
            },
          ]"
        />

        <AppList
          :items="[
            {
              title: 'Ожидаемый продуктовый результат',
              content: project.product_result,
              wide: true,
            },
            {
              title: 'Ожидаемый учебный результат',
              content: project.study_result,
              wide: true,
            },
          ]"
        />

        <AppList v-if="project?.skills.length > 0">
          <AppListItem :bold="false" :wide="true">
            <template #title>Теги</template>
            <template #default>
              <SkillList :skills="project.skills" show-all />
            </template>
          </AppListItem>
        </AppList>
      </GridLayout>

      <div class="controls">
        <OpenParticipationModalButton :project="project" />
        <OpenFeedbackModalButton :project="project" />
      </div>
    </BasePanel>
  </section>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { DifficultyText } from '@/models/ProjectDifficulty';
  import { useProjectsStore } from '@/stores/projects/useProjectsStore';
  // components
  import BasePanel from '@/components/ui/BasePanel.vue';
  import GridLayout from '@/components/ui/GridLayout.vue';
  import AppList from '@/components/ui/AppList.vue';
  import ProjectStatus from '@/components/project/ProjectStatus.vue';
  import OpenParticipationModalButton from '@/components/participation/OpenParticipationModalButton.vue';
  import OpenFeedbackModalButton from '@/components/feedback/OpenFeedbackModalButton.vue';
  import AppListItem from '@/components/ui/AppListItem.vue';
  import SkillList from '@/components/skill/SkillList.vue';
  import ProjectCardInfo from '@/components/project/ProjectCardInfo.vue';
  import ProjectTeamCounter from '@/components/project/ProjectTeamCounter.vue';

  const projectsStore = useProjectsStore();
  const { openedProject: project, loading, error } = storeToRefs(projectsStore);
</script>

<style lang="scss" scoped>
  .controls {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 2.5rem;
  }

  .status-wrapper {
    display: flex;
    justify-content: space-between;
    padding-bottom: 1.25rem;
    margin-bottom: 1.25rem;
    border-bottom: 1px solid var(--gray-color-1);
  }

  .status {
    white-space: nowrap;
  }

  .status,
  .counter {
    margin-top: 0.625rem;
  }
</style>
