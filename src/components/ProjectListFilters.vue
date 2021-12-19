<template>
  <form class="filters" @submit.prevent>
    <AppAccordion>
      <template #title>
        <span v-if="loading" class="multiselect-spinner"></span>
        <span>Статус проекта</span>
      </template>
      <template #content>
        <label
          v-for="state in allStates.options"
          :key="state.value"
          class="label"
        >
          <input
            v-model="states"
            class="checkbox"
            type="checkbox"
            :value="state.value"
          />
          {{ state.label }}
        </label>
        <div v-if="allStates.error" class="mt-2">{{ allStates.error }}</div>
      </template>
    </AppAccordion>

    <div class="divider"></div>

    <AppAccordion>
      <template #title>
        <span v-if="loading" class="multiselect-spinner"></span>
        <span>Тип проекта</span>
      </template>
      <template #content>
        <label
          v-for="projectType in allTypes.options"
          :key="projectType.value"
          class="label"
        >
          <input
            v-model="type"
            class="radio"
            type="radio"
            :value="projectType.value"
            name="project-type"
          />
          {{ projectType.label }}
        </label>
        <div v-if="allTypes.error" class="mt-2">{{ allTypes.error }}</div>
      </template>
    </AppAccordion>

    <div class="divider"></div>

    <AppAccordion>
      <template #title>Руководитель проекта</template>
      <template #content>
        <VMultiselect
          v-model="supervisors"
          mode="tags"
          placeholder="Ф.И.О."
          :close-on-select="false"
          :searchable="true"
          :options="allSupervisorNames.options"
          :loading="loading"
        />
        <div v-if="allSupervisorNames.error" class="mt-2">
          {{ allSupervisorNames.error }}
        </div>
      </template>
    </AppAccordion>

    <div class="divider"></div>

    <AppAccordion class="loading">
      <template #title>Теги</template>
      <template #content>
        <VMultiselect
          v-model="tags"
          mode="tags"
          placeholder="Data Science"
          :close-on-select="false"
          :searchable="true"
          :options="allTags.options"
          :loading="loading"
        />
        <div v-if="allTags.error" class="mt-2">{{ allTags.error }}</div>
      </template>
    </AppAccordion>

    <div class="divider"></div>

    <AppAccordion>
      <template #title>Сроки реализации</template>
      <template #content>
        <div class="date">
          <input v-model="dateStart" class="input" type="date" />
          <input v-model="dateEnd" class="input" type="date" />
        </div>
      </template>
    </AppAccordion>

    <div class="divider"></div>

    <AppAccordion>
      <template #title>Уровни сложности</template>
      <template #content>
        <label class="label">
          <input
            v-model="difficulty"
            class="checkbox"
            type="checkbox"
            value="1"
          />
          Легко
        </label>
        <label class="label">
          <input
            v-model="difficulty"
            class="checkbox"
            type="checkbox"
            value="2"
          />
          Средне
        </label>
        <label class="label">
          <input
            v-model="difficulty"
            class="checkbox"
            type="checkbox"
            value="3"
          />
          Сложно
        </label>
      </template>
    </AppAccordion>

    <footer class="footer">
      <BaseButton full-width>найти</BaseButton>
      <BaseButton full-width variant="link">сбросить фильтр</BaseButton>
    </footer>
  </form>
</template>

<script setup lang="ts">
  import { ref } from '@vue/reactivity';
  import AppAccordion from './base/AppAccordion.vue';
  import VMultiselect from '@vueform/multiselect';
  import BaseButton from './base/AppButton.vue';
  import { useProjectFiltersOptions } from '@/hooks/useProjectFiltersOptions/useProjectFiltersOptions';

  const tags = ref<number[]>([]);
  const supervisors = ref<number[]>([]);
  const type = ref<number>();

  const states = ref<number[]>([]);
  const difficulty = ref<number[]>([]);
  const dateStart = ref<Date>();
  const dateEnd = ref<Date>();

  const { allSupervisorNames, allTags, allTypes, allStates, loading } =
    useProjectFiltersOptions();
</script>

<style scoped>
  .divider {
    width: 100%;
    height: 1px;
    background-color: var(--gray-color-1);
  }

  .filters {
    padding-top: 10px;
    padding-bottom: 11px;
  }

  .label {
    font-weight: 400;
    font-size: 18px;
    line-height: normal;
    display: flex;
    align-items: center;

    color: var(--text-color);
    gap: 15px;
  }

  .label:not(:last-child) {
    margin-bottom: 13px;
  }

  .date {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .footer {
    display: flex;
    flex-direction: column;
    gap: 11px;
    margin-top: 20px;
    padding-left: 22px;
    padding-right: 22px;
  }
</style>
