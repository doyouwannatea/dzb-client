<template>
  <form class="filters" @submit.prevent="filter">
    <BaseAccordion>
      <template #title>
        <span v-if="allStates.loading.value" class="multiselect-spinner"></span>
        <span>Статус проекта</span>
      </template>
      <template #content>
        <BaseCheckbox
          v-for="state in allStates.data.value"
          :key="state.id"
          v-model="states"
          :value="state.id"
          class="label"
        >
          {{ state.state }}
        </BaseCheckbox>
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
        <BaseRadioButton
          v-for="projectType in allTypes.data.value"
          :key="projectType.id"
          v-model="type"
          :value="projectType.id"
          class="label"
        >
          {{ projectType.type }}
        </BaseRadioButton>
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
          :track-by="SupervisorNameKeys.fio"
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
          :track-by="TagKeys.tag"
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
          <BaseInput v-model="dateStart" class="input" type="date" />
          <BaseInput v-model="dateEnd" class="input" type="date" />
        </div>
      </template>
    </BaseAccordion>

    <div class="divider"></div>

    <BaseAccordion>
      <template #title>Уровни сложности</template>
      <template #content>
        <BaseCheckbox v-model="difficulty" class="label" value="1">
          Легко
        </BaseCheckbox>
        <BaseCheckbox v-model="difficulty" class="label" value="2">
          Средне
        </BaseCheckbox>
        <BaseCheckbox v-model="difficulty" class="label" value="3">
          Сложно
        </BaseCheckbox>
      </template>
    </BaseAccordion>

    <footer class="footer">
      <BaseButton case="uppercase" full-width :disabled="prjectsStore.loading">
        найти
      </BaseButton>
      <BaseButton
        case="uppercase"
        type="button"
        full-width
        variant="link"
        :disabled="prjectsStore.loading"
        @click="clearFilter"
      >
        сбросить фильтр
      </BaseButton>
    </footer>
  </form>
</template>

<script setup lang="ts">
  import { SupervisorNameKeys, TagKeys } from '@/models/enums/keys';

  import VMultiselect from '@vueform/multiselect';
  import BaseAccordion from './base/BaseAccordion.vue';
  import BaseButton from './base/BaseButton.vue';
  import BaseCheckbox from './base/BaseCheckbox.vue';
  import BaseRadioButton from './base/BaseRadioButton.vue';
  import BaseInput from './base/BaseInput.vue';

  import { useProjectFilterOptions } from '@/hooks/useProjectFilterOptions';
  import { useProjectsStore } from '@/stores/projects';
  import { useProjectFilters } from '@/hooks/useProjectFilters';

  const prjectsStore = useProjectsStore();
  const { allSupervisorNames, allTags, allTypes, allStates } =
    useProjectFilterOptions();

  const {
    clearFilter,
    filter,
    difficulty,
    states,
    supervisors,
    tags,
    type,
    dateStart,
    dateEnd,
  } = useProjectFilters();
</script>

<style scoped>
  .input {
    background-color: #f9f9f9;
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
