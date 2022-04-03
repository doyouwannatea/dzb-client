<template>
  <section v-if="project && !loading && !error">
    <!-- Panel -->
    <BasePanel :cols="3">
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
            title: 'Сроки реализации',
            content: `${project.date_start} - ${project.date_end}`,
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
            title: 'Тип проекта',
            content: project.type.type,
          },
          {
            title: 'Цель проекта',
            content: project.goal,
          },
        ]"
      />

      <div>
        <h2 class="info-title">Статус проекта</h2>
        <BaseBadge class="badge mt-2">{{ project.state.state }}</BaseBadge>
        <h2 class="info-title mt-4">Кол-во участников</h2>
        <ProjectTeamCounter class="mt-2" :count="project.places" :total="12" />
        <BaseButton
          case="uppercase"
          class="mt-4"
          @click="projectsStore.openRequestModal(project!)"
        >
          Подать заявку
        </BaseButton>
      </div>
    </BasePanel>

    <!-- Panel -->
    <BasePanel :cols="2">
      <!-- Information list -->
      <InformationList
        :items="[
          {
            title: 'Ожидаемый результат',
            content: project.expected_result,
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
    </BasePanel>

    <!-- Panel -->
    <BasePanel :cols="1">
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
            <SkillsList :skills="project.skills" show-all />
          </template>
        </InformationListItem>
      </InformationList>
    </BasePanel>
  </section>
</template>

<script setup lang="ts">
  import BasePanel from './base/BasePanel.vue';
  import BaseBadge from './base/BaseBadge.vue';
  import BaseButton from './base/BaseButton.vue';
  import ProjectTeamCounter from './ProjectTeamCounter.vue';
  import { DifficultyText } from '@/models/values/difficulty-text';
  import InformationList from './InformationList.vue';
  import InformationListItem from './InformationListItem.vue';
  import { useProjectsStore } from '@/stores/projects';
  import { storeToRefs } from 'pinia';
  import SkillsList from './SkillsList.vue';

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
