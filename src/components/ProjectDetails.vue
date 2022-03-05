<template>
  <section v-if="project && !loading && !error">
    <!-- Panel -->
    <ProjectPanel :cols="3">
      <!-- Information list -->
      <ProjectDetailsList
        :items="[
          {
            title: 'Руководитель проекта',
            content: project.supervisor_name,
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
      <ProjectDetailsList
        :items="[
          {
            title: 'Тип проекта',
            content: project.type_name,
          },
          {
            title: 'Цель проекта',
            content: project.goal,
          },
        ]"
      />

      <div>
        <h2 class="info-title">Статус проекта</h2>
        <BaseBadge class="badge mt-2">{{ project.state_name }}</BaseBadge>
        <h2 class="info-title mt-4">Кол-во участников</h2>
        <ProjectTeamCounter
          class="mt-2"
          :count="project.vacant_places"
          :total="project.places"
        />
        <BaseButton class="mt-4">Подать заявку</BaseButton>
      </div>
    </ProjectPanel>

    <!-- Panel -->
    <ProjectPanel :cols="2">
      <!-- Information list -->
      <ProjectDetailsList
        :items="[
          {
            title: 'Ожидаемый результат',
            content: project.expected_result,
          },
        ]"
      />

      <!-- Information list -->
      <ProjectDetailsList
        :items="[
          {
            title: 'Требования к участникам',
            content: project.requirements,
          },
        ]"
      />
    </ProjectPanel>

    <!-- Panel -->
    <ProjectPanel :cols="1">
      <!-- Information list -->
      <ProjectDetailsList>
        <ProjectDetailsListItem title="Идея проекта" :bold="false" :wide="true">
          {{ project.idea }}
        </ProjectDetailsListItem>

        <ProjectDetailsListItem title="Теги" :bold="false" :wide="true">
          <span class="tags">
            <BaseTag v-for="tag in project.tags" :key="tag.id">
              {{ tag.tag }}
            </BaseTag>
          </span>
        </ProjectDetailsListItem>
      </ProjectDetailsList>
    </ProjectPanel>
  </section>
</template>

<script setup lang="ts">
  import ProjectPanel from './ProjectPanel.vue';
  import BaseTag from './base/BaseTag.vue';
  import BaseBadge from './base/BaseBadge.vue';
  import BaseButton from './base/BaseButton.vue';
  import ProjectTeamCounter from './ProjectTeamCounter.vue';
  import { DifficultyText } from '@/models/enums/difficulty-text';
  import ProjectDetailsList from './ProjectDetailsList.vue';
  import ProjectDetailsListItem from './ProjectDetailsListItem.vue';
  import { useProjectsStore } from '@/stores/projects';
  import { storeToRefs } from 'pinia';

  const {
    openedProject: project,
    loading,
    error,
  } = storeToRefs(useProjectsStore());
</script>

<style scoped>
  /* Components */
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3125rem;
  }

  .badge {
    width: max-content;
  }

  .info-title {
    font-size: inherit;
    font-weight: 600;
    line-height: normal;
  }
</style>
