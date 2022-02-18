<template>
  <form class="filters" @submit.prevent="filter">
    <BaseAccordion>
      <template #title>
        <span v-if="allStates.loading.value" class="multiselect-spinner"></span>
        <span>Статус проекта</span>
      </template>
      <template #content>
        <label
          v-for="state in allStates.data.value"
          :key="state.id"
          class="label"
        >
          <input
            v-model="states"
            class="checkbox"
            type="checkbox"
            :value="state.id"
          />
          {{ state.state }}
        </label>
        <div v-if="allStates.error.value" class="mt-2">
          {{ allStates.error.value }}
        </div>
      </template>
    </BaseAccordion>

    <div class="divider"></div>

    <BaseAccordion>
      <template #title>
        <span v-if="allTypes.loading.value" class="multiselect-spinner"></span>
        <span>Тип проекта</span>
      </template>
      <template #content>
        <label
          v-for="projectType in allTypes.data.value"
          :key="projectType.id"
          class="label"
        >
          <input
            v-model="type"
            class="radio"
            type="radio"
            :value="projectType.id"
            name="project-type"
          />
          {{ projectType.type }}
        </label>
        <div v-if="allTypes.error.value" class="mt-2">
          {{ allTypes.error.value }}
        </div>
      </template>
    </BaseAccordion>

    <div class="divider"></div>

    <BaseAccordion>
      <template #title>Руководитель проекта</template>
      <template #content>
        <VMultiselect
          v-model="supervisors"
          mode="tags"
          placeholder="Ф.И.О."
          :searchable="true"
          :options="allSupervisorNames.data.value"
          :loading="allSupervisorNames.loading.value"
          :label="SupervisorNameKeys.fio"
          :track-by="SupervisorNameKeys.id"
          :value-prop="SupervisorNameKeys.id"
        />
        <div v-if="allSupervisorNames.error.value" class="mt-2">
          {{ allSupervisorNames.error.value }}
        </div>
      </template>
    </BaseAccordion>

    <div class="divider"></div>

    <BaseAccordion class="loading">
      <template #title>Теги</template>
      <template #content>
        <VMultiselect
          v-model="tags"
          mode="tags"
          placeholder="Data Science"
          :close-on-select="false"
          :searchable="true"
          :options="allTags.data.value"
          :loading="allTags.loading.value"
          :label="TagKeys.tag"
          :track-by="TagKeys.id"
          :value-prop="TagKeys.id"
        />
        <div v-if="allTags.error.value" class="mt-2">
          {{ allTags.error.value }}
        </div>
      </template>
    </BaseAccordion>

    <div class="divider"></div>

    <BaseAccordion>
      <template #title>Сроки реализации</template>
      <template #content>
        <div class="date">
          <input v-model="dateStart" class="input" type="date" />
          <input v-model="dateEnd" class="input" type="date" />
        </div>
      </template>
    </BaseAccordion>

    <div class="divider"></div>

    <BaseAccordion>
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
    </BaseAccordion>

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
  import { SupervisorNameKeys, TagKeys } from '@/models/enums/keys';
  import BaseAccordion from './base/BaseAccordion.vue';
  import BaseButton from './base/BaseButton.vue';
  import { useProjectFilterOptions } from '@/hooks/useProjectFilterOptions';
  import { toJSONLocal } from '@/helpers/string';
  import { RouteNames } from '@/router/types/route-names';
  import { encodeProjectFiltersToQueries } from '@/helpers/query';
  import { useProjectsStore } from '@/stores/projects';

  const store = useProjectsStore();
  const router = useRouter();
  const globalLoading = computed(() => store.loading);
  const { allSupervisorNames, allTags, allTypes, allStates } =
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
    () => store.filters,
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
      query: {
        ...encodeProjectFiltersToQueries({
          tags: tags.value,
          difficulty: difficulty.value,
          state: states.value,
          supervisor: supervisors.value,
          type: type.value ? [type.value] : [],
          date_end: dateEnd.value || '',
          date_start: dateStart.value || '',
          page: 1,
          title: router.currentRoute.value.query.title?.toString() || '',
        }),
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
    padding-top: 0.625rem;
    padding-bottom: 0.6875rem;
  }

  .label {
    font-weight: 400;
    font-size: 1.125rem;
    line-height: normal;
    display: flex;
    align-items: center;

    color: var(--text-color);
    gap: 0.9375rem;
  }

  .label:hover {
    color: var(--accent-color-1);
    cursor: pointer;
  }

  .label:not(:last-child) {
    margin-bottom: 0.8125rem;
  }

  .date {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
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
