<template>
  <section v-if="project && !loading && !error">
    <ProjectHistoryModal
      v-if="history"
      :current-project-id="project.id"
      :is-show="showHistoryModal"
      :project-list="history"
      size="m"
      @close="showHistoryModal = false"
    />
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
        <AppList>
          <AppListItem>
            <template #title>Руководители проекта</template>
            <template #default>
              {{
                project?.supervisorsNames || project?.supervisors.length
                  ? project.supervisorsNames || project.supervisors.join(', ')
                  : '-'
              }}
            </template>
          </AppListItem>

          <AppListItem>
            <template #title>Старт проекта</template>
            <template #default>
              {{ project.date_start || '-' }}
            </template>
          </AppListItem>

          <AppListItem>
            <template #title>Заказчик</template>
            <template #default>
              {{ project.customer || '-' }}
            </template>
          </AppListItem>

          <AppListItem>
            <template #title>Сложность</template>
            <template #default>
              {{ DifficultyText[project.difficulty] || '-' }}
            </template>
          </AppListItem>

          <AppListItem>
            <template #title>Версии проекта</template>
            <template #default>
              <BaseButton
                v-if="history && history.length > 1"
                class="open-project-history-button"
                variant="inline-link"
                case="default"
                @click="showHistoryModal = true"
              >
                Открыть версии <br />
                проекта ↗
              </BaseButton>
              <template v-else>
                На данный момент это единственная версия проекта
              </template>
            </template>
          </AppListItem>
        </AppList>

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
  import { ref, watch } from 'vue';
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
  import ProjectTeamCounter from '@/components/project/ProjectTeamCounter.vue';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import ProjectHistoryModal from '@/components/project/ProjectHistoryModal.vue';

  const projectsStore = useProjectsStore();
  const showHistoryModal = ref(false);
  const {
    openedProject: project,
    openedProjectHistory: history,
    loading,
    error,
  } = storeToRefs(projectsStore);

  watch(
    () => project,
    () => (showHistoryModal.value = false),
    { deep: true },
  );
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

  .open-project-history-button {
    font-size: inherit;
    text-align: left;
    white-space: normal;
  }
</style>
