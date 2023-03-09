<template>
  <template v-if="project && !loading && !error">
    <ProjectHistoryModal
      v-if="history"
      :current-project-id="project.id"
      :is-show="showHistoryModal"
      :project-list="history"
      size="m"
      @close="showHistoryModal = false"
    />
    <ProjectMobileDetails
      v-if="isMobileS"
      :project="project"
      :show-history-modal="showHistoryModal"
      :history="history"
      @show-history="showHistoryModal = true"
    />
    <section v-else>
      <!-- Panel -->
      <BasePanel>
        <GridLayout cols="4fr 4fr 2fr">
          <!-- Information list -->
          <AppList
            :items="[
              {
                title: 'Руководители проекта',
                content:
                  project.supervisorsNames || project.supervisors.join(', '),
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
          <AppList>
            <AppListItem>
              <template #title>Цель проекта</template>
              <template #default>
                {{ project.goal }}
              </template>
            </AppListItem>

            <AppListItem>
              <template #title>Версии проекта</template>
              <template #default>
                <ProjectHistoryButton
                  :history-length="history?.length"
                  @click="showHistoryModal = true"
                />
              </template>
            </AppListItem>
          </AppList>

          <div>
            <p class="info-title">Статус проекта</p>
            <ProjectStatus class="badge mt-2" :state="project.state" />
            <p class="info-title mt-4">Максимальное количество студентов</p>
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
      <BasePanel v-if="project?.skills.length > 0">
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
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { storeToRefs } from 'pinia';
  import { DifficultyText } from '@/models/ProjectDifficulty';
  import { useProjectsStore } from '@/stores/projects/useProjectsStore';
  import { useMobileS } from '@/helpers/breakpoints';
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
  import ProjectMobileDetails from './ProjectMobileDetails.vue';
  import ProjectHistoryModal from '@/components/project/ProjectHistoryModal.vue';
  import ProjectHistoryButton from './ProjectHistoryButton.vue';

  const isMobileS = useMobileS();
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
  @import '@styles/breakpoints';

  .badge {
    width: max-content;
  }

  .info-title {
    font-size: inherit;
    font-weight: 600;
    line-height: normal;
  }
</style>
