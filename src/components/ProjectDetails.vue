<template>
  <section>
    <!-- Panel -->
    <ProjectPanel :cols="3">
      <!-- Column -->
      <ProjectPanelCol>
        <!-- Information list -->
        <ProjectInformationList
          :items="[
            {
              title: 'Руководитель проекта',
              value: project.supervisor_name,
            },
            {
              title: 'Заказчик',
              value: project.customer,
            },
            {
              title: 'Сроки реализации',
              value: `${project.date_start} - ${project.date_end}`,
            },
            {
              title: 'Сложность',
              value: DifficultyText[project.difficulty],
            },
          ]"
        />
      </ProjectPanelCol>
      <!-- Column -->
      <ProjectPanelCol>
        <!-- Information list -->
        <ProjectInformationList
          :items="[
            {
              title: 'Тип проекта',
              value: project.type_name,
            },
            {
              title: 'Цель проекта',
              value: project.goal,
            },
          ]"
        />
      </ProjectPanelCol>
      <!-- Column -->
      <ProjectPanelCol>
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
      </ProjectPanelCol>
    </ProjectPanel>

    <!-- Panel -->
    <ProjectPanel :cols="2">
      <!-- Column -->
      <ProjectPanelCol>
        <!-- Information list -->
        <ProjectInformationList
          :items="[
            {
              title: 'Ожидаемый результат',
              value: project.expected_result,
            },
          ]"
        />
      </ProjectPanelCol>
      <!-- Column -->
      <ProjectPanelCol>
        <!-- Information list -->
        <ProjectInformationList
          :items="[
            {
              title: 'Требования к участникам',
              value: project.requirements,
            },
          ]"
        />
      </ProjectPanelCol>
    </ProjectPanel>

    <!-- Panel -->
    <ProjectPanel :cols="1">
      <!-- Information list -->
      <ProjectInformationList>
        <ProjectInformationListItem
          title="Идея проекта"
          :bold="false"
          :wide="true"
        >
          {{ project.idea }}
        </ProjectInformationListItem>

        <ProjectInformationListItem title="Теги" :bold="false" :wide="true">
          <span class="tags">
            <BaseTag v-for="tag in project.tags" :key="tag.id">
              {{ tag.tag }}
            </BaseTag>
          </span>
        </ProjectInformationListItem>
      </ProjectInformationList>
    </ProjectPanel>
  </section>
</template>

<script setup lang="ts">
  import ProjectPanel from './ProjectPanel.vue';
  import BaseTag from './base/BaseTag.vue';
  import BaseBadge from './base/BaseBadge.vue';
  import BaseButton from './base/BaseButton.vue';
  import ProjectTeamCounter from './ProjectTeamCounter.vue';
  import type { Project } from '@/models/Project';
  import { DifficultyText } from '@/models/enums/difficulty-text';
  import ProjectInformationList from './ProjectInformationList.vue';
  import ProjectInformationListItem from './ProjectInformationListItem.vue';
  import ProjectPanelCol from './ProjectPanelCol.vue';

  defineProps<{ project: Project }>();
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
