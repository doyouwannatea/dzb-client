<template>
  <form class="filters" @submit.prevent="filter">
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
      <BaseButton full-width :disabled="globalLoading">найти</BaseButton>
      <BaseButton
        type="button"
        full-width
        variant="link"
        :disabled="globalLoading"
        @click="clearFilter"
      >
        сбросить фильтр
      </BaseButton>
    </footer>
  </form>
</template>

<script setup lang="ts">
  import { watch } from 'vue';
  import { ref, computed } from '@vue/reactivity';
  import { useRouter } from 'vue-router';
  import VMultiselect from '@vueform/multiselect';
  import AppAccordion from './base/AppAccordion.vue';
  import BaseButton from './base/AppButton.vue';
  import { useProjectFilterOptions } from '@/hooks/useProjectFiltersOptions/useProjectFilterOptions';
  import { useStore } from '@/store/store';
  import { toJSONLocal } from '@/helpers/string';
  import { RouteNames } from '@/router/types/route-names';
  import { encodeFilterParams } from '@/helpers/query';

  const store = useStore();
  const router = useRouter();
  const globalLoading = computed(() => store.state.loading);
  const { allSupervisorNames, allTags, allTypes, allStates, loading } =
    useProjectFilterOptions();

  const tags = ref<number[]>([]);
  const supervisors = ref<number[]>([]);
  const type = ref<number>(0);
  const states = ref<number[]>([]);
  const difficulty = ref<number[]>([]);
  const dateStart = ref<string | null>(null);
  const dateEnd = ref<string | null>(null);

  // наблюдаем за состоянием хранилища
  // обновляем локальное состояние если что-то поменялось
  watch(
    () => store.state.filters,
    (filters) => {
      tags.value = filters.tags || [];
      supervisors.value = filters.supervisor || [];
      type.value = filters.type ? filters.type[0] : 0;
      states.value = filters.state || [];
      difficulty.value = filters.difficulty || [];
      dateStart.value = filters.date_start
        ? toJSONLocal(new Date(filters.date_start))
        : null;
      dateEnd.value = filters.date_end
        ? toJSONLocal(new Date(filters.date_end))
        : null;
    },
    { immediate: true },
  );

  function filter() {
    if (globalLoading.value) return;
    updateFilters();
  }

  function clearFilter() {
    if (globalLoading.value) return;
    tags.value = [];
    difficulty.value = [];
    states.value = [];
    supervisors.value = [];
    type.value = 0;
    dateEnd.value = '';
    dateStart.value = '';
    updateFilters();
  }

  function updateFilters() {
    router.push({
      name: RouteNames.HOME,
      params: { page: 1 },
      query: {
        ...encodeFilterParams({
          tags: tags.value,
          difficulty: difficulty.value,
          state: states.value,
          supervisor: supervisors.value,
          type: type.value ? [type.value] : [],
          date_end: dateEnd.value || '',
          date_start: dateStart.value || '',
        }),
        title: router.currentRoute.value.query.title,
      },
    });
  }
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

  .label:hover {
    color: var(--accent-color-1);
    cursor: pointer;
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
