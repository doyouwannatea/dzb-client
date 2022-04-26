<template>
  <form class="filters" @submit.prevent="filter">
    <BaseAccordion>
      <template #title>
        <span v-if="statesLoading" class="multiselect-spinner"></span>
        <span>Статус проекта</span>
      </template>
      <template #content>
        <BaseCheckbox
          v-for="state in additionalProjectData.states"
          :key="state.id"
          v-model="filters.state"
          :value="state.id"
          class="label"
        >
          {{ capitalizeFirstLetter(state.state) }}
        </BaseCheckbox>
        <div v-if="error" class="mt-2">
          {{ error }}
        </div>
      </template>
    </BaseAccordion>

    <div class="divider"></div>

    <BaseAccordion class="loading">
      <template #title>Теги проекта</template>
      <template #content>
        <VMultiselect
          v-model="filters.specialities"
          mode="tags"
          placeholder="По специальности"
          class="miltiselect"
          :close-on-select="false"
          :searchable="true"
          :options="additionalProjectData.tags?.specialities"
          :loading="tagsLoading"
          :label="SkillKeys.skill"
          :track-by="SkillKeys.skill"
          :value-prop="SkillKeys.id"
        />
        <VMultiselect
          v-model="filters.tags"
          mode="tags"
          placeholder="По навыкам"
          class="miltiselect"
          :close-on-select="false"
          :searchable="true"
          :options="additionalProjectData.tags?.skills"
          :loading="tagsLoading"
          :label="SkillKeys.skill"
          :track-by="SkillKeys.skill"
          :value-prop="SkillKeys.id"
        />
        <div v-if="error" class="mt-2">
          {{ error }}
        </div>
      </template>
    </BaseAccordion>

    <div class="divider"></div>

    <BaseAccordion>
      <template #title>Уровни сложности</template>
      <template #content>
        <BaseCheckbox
          v-model="filters.difficulty"
          class="label"
          :value="Difficulty.Low"
        >
          {{ DifficultyText[Difficulty.Low] }}
        </BaseCheckbox>
        <BaseCheckbox
          v-model="filters.difficulty"
          class="label"
          :value="Difficulty.Medium"
        >
          {{ DifficultyText[Difficulty.Medium] }}
        </BaseCheckbox>
        <BaseCheckbox
          v-model="filters.difficulty"
          class="label"
          :value="Difficulty.High"
        >
          {{ DifficultyText[Difficulty.High] }}
        </BaseCheckbox>
      </template>
    </BaseAccordion>

    <footer class="footer">
      <BaseButton case="uppercase" full-width :disabled="loading">
        найти
      </BaseButton>
      <BaseButton
        case="uppercase"
        type="button"
        full-width
        variant="link"
        :disabled="loading"
        @click="clearFilter"
      >
        сбросить фильтр
      </BaseButton>
    </footer>
  </form>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { capitalizeFirstLetter } from '@/helpers/string';
  import { SkillKeys } from '@/values/models-keys';

  import VMultiselect from '@vueform/multiselect';
  import BaseAccordion from './base/BaseAccordion.vue';
  import BaseButton from './base/BaseButton.vue';
  import BaseCheckbox from './base/BaseCheckbox.vue';

  import { useProjectsStore } from '@/stores/projects/useProjectsStore';
  import { useProjectFilters } from '@/hooks/useProjectFilters';
  import { DifficultyText, Difficulty } from '@/models/ProjectDifficulty';

  const { additionalProjectData, loading, error, tagsLoading, statesLoading } =
    storeToRefs(useProjectsStore());
  const { clearFilter, filter, filters } = useProjectFilters();
</script>

<style scoped>
  .miltiselect:deep(.multiselect-clear) {
    display: none;
  }

  .miltiselect:first-child {
    margin-bottom: 1.25rem;
  }

  .divider {
    width: 100%;
    height: 1px;
    background-color: var(--gray-color-1);
  }

  .filters {
    background: #ffffff;
    border: 1px solid var(--gray-color-1);
    border-radius: 0.625rem;
    padding-top: 0.625rem;
    padding-bottom: 0.6875rem;
  }

  .label:not(:last-child) {
    margin-bottom: 0.8125rem;
  }

  .footer {
    display: flex;
    flex-direction: column;
    gap: 0.6875rem;
    margin-top: 1.25rem;
    padding-left: 1.375rem;
    padding-right: 1.375rem;
  }
</style>
