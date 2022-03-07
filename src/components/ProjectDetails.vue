<template>
  <section v-if="project && !loading && !error">
    <!-- Panel -->
    <BasePanel :cols="3">
      <!-- Information list -->
      <InformationList
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
      <InformationList
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
            <span class="tags">
              <BaseTag v-for="tag in project.tags" :key="tag.id">
                {{ tag.tag }}
              </BaseTag>
            </span>
          </template>
        </InformationListItem>
      </InformationList>
    </BasePanel>
  </section>
</template>

<script setup lang="ts">
  import BasePanel from './base/BasePanel.vue';
  import BaseTag from './base/BaseTag.vue';
  import BaseBadge from './base/BaseBadge.vue';
  import BaseButton from './base/BaseButton.vue';
  import ProjectTeamCounter from './ProjectTeamCounter.vue';
  import { DifficultyText } from '@/models/enums/difficulty-text';
  import InformationList from './InformationList.vue';
  import InformationListItem from './InformationListItem.vue';
  import { useProjectsStore } from '@/stores/projects';
  import { storeToRefs } from 'pinia';

  const projectsStore = useProjectsStore();
  const { openedProject: project, loading, error } = storeToRefs(projectsStore);
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
