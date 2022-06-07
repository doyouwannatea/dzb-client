<template>
  <section v-if="project && !loading && !error">
    <!-- Panel -->
    <BasePanel>
      <GridLayout cols="4fr 4fr 2fr">
        <!-- Information list -->
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
              title: 'Сложность',
              content: DifficultyText[project.difficulty],
            },
            {
              title: 'Заказчик',
              content: project.customer,
            },
          ]"
        />
        <!-- Information list -->
        <AppList
          :items="[
            {
              title: 'Цель проекта',
              content: project.goal,
            },
          ]"
        />

        <div>
          <h2 class="info-title">Статус проекта</h2>
          <ProjectStatus class="badge mt-2" :state="project.state" />
          <h2 class="info-title mt-4">Максимальное количество студентов</h2>
          <ProjectTeamCounter class="mt-2" :total="project.places" />
          <OpenParticipationModalButton class="mt-4" :project="project" />
          <OpenFeedbackModalButton class="mt-4" :project="project" />
        </div>
      </GridLayout>
    </BasePanel>

    <!-- Panel -->
    <BasePanel>
      <!-- Information list -->
      <AppList
        :items="[
          {
            title: 'Требования к студентам',
            content: project.requirements,
            wide: true,
          },
          {
            title: 'Описание проекта',
            content: project.description,
            wide: true,
          },
        ]"
      />
    </BasePanel>

    <!-- Panel -->
    <BasePanel>
      <GridLayout :cols="2">
        <!-- Information list -->
        <AppList
          :items="[
            {
              title: 'Ожидаемый продуктовый результат',
              content: project.product_result,
            },
          ]"
        />

        <!-- Information list -->
        <AppList
          :items="[
            {
              title: 'Ожидаемый учебный результат',
              content: project.study_result,
            },
          ]"
        />
      </GridLayout>
    </BasePanel>

    <!-- Panel -->
    <BasePanel>
      <!-- Information list -->
      <AppList>
        <AppListItem :bold="false" :wide="true">
          <template #title>Теги</template>
          <template #default>
            <SkillList :skills="project.skills" show-all />
          </template>
        </AppListItem>
      </AppList>
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
  import ProjectTeamCounter from '@/components/project/ProjectTeamCounter.vue';
  import OpenParticipationModalButton from '@/components/participation/OpenParticipationModalButton.vue';
  import OpenFeedbackModalButton from '@/components/feedback/OpenFeedbackModalButton.vue';
  import AppListItem from '@/components/ui/AppListItem.vue';
  import SkillList from '@/components/skill/SkillList.vue';

  const projectsStore = useProjectsStore();
  const { openedProject: project, loading, error } = storeToRefs(projectsStore);
</script>

<style scoped>
  .badge {
    width: max-content;
  }

  .info-title {
    font-size: inherit;
    font-weight: 600;
    line-height: normal;
  }
</style>
