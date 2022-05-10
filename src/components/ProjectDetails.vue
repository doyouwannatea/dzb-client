<template>
  <section v-if="project && !loading && !error">
    <!-- Panel -->
    <BasePanel>
      <GridLayout cols="4fr 4fr 2fr">
        <!-- Information list -->
        <InformationList
          :items="[
            {
              title: 'Руководитель проекта',
              content: project.supervisor.fio,
            },
            {
              title: 'Заказчик',
              content: project.customer,
            },
            {
              title: 'Старт проекта',
              content: project.date_start,
            },
            {
              title: 'Сложность',
              content: DifficultyText[project.difficulty],
            },
          ]"
        />
        <!-- Information list -->
        <InformationList
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
          <h2 class="info-title mt-4">Кол-во участников</h2>
          <ProjectTeamCounter class="mt-2" :total="project.places" />
          <OpenParticipationModalButton class="mt-4" :project="project" />
          <OpenFeedbackModalButton class="mt-4" :project="project" />
        </div>
      </GridLayout>
    </BasePanel>

    <!-- Panel -->
    <BasePanel>
      <GridLayout :cols="2">
        <!-- Information list -->
        <InformationList
          :items="[
            {
              title: 'Ожидаемый продуктовый результат',
              content: project.product_result,
            },
          ]"
        />

        <!-- Information list -->
        <InformationList
          :items="[
            {
              title: 'Требования к участникам',
              content: project.requirements,
            },
          ]"
        />
      </GridLayout>
    </BasePanel>

    <!-- Panel -->
    <BasePanel>
      <GridLayout :cols="1">
        <!-- Information list -->
        <InformationList>
          <InformationListItem :bold="false" :wide="true">
            <template #title>Идея проекта</template>
            <template #default>
              {{ project.idea }}
            </template>
          </InformationListItem>

          <InformationListItem :bold="false" :wide="true">
            <template #title>Теги</template>
            <template #default>
              <SkillList :skills="project.skills" show-all />
            </template>
          </InformationListItem>
        </InformationList>
      </GridLayout>
    </BasePanel>
  </section>
</template>

<script setup lang="ts">
  import BasePanel from './base/BasePanel.vue';
  import ProjectTeamCounter from './ProjectTeamCounter.vue';
  import { DifficultyText } from '@/models/ProjectDifficulty';
  import InformationList from './InformationList.vue';
  import InformationListItem from './InformationListItem.vue';
  import { useProjectsStore } from '@/stores/projects/useProjectsStore';
  import { storeToRefs } from 'pinia';
  import SkillList from './SkillList.vue';
  import ProjectStatus from './ProjectStatus.vue';
  import OpenParticipationModalButton from './OpenParticipationModalButton.vue';
  import OpenFeedbackModalButton from './OpenFeedbackModalButton.vue';
  import GridLayout from './GridLayout.vue';

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
