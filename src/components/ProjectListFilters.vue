<template>
  <form class="filters" @submit.prevent>
    <VAccordion class="filter-wrapper">
      <template #title>Статус проекта</template>
      <template #content>
        <label class="label">
          <input
            v-model="statuses"
            class="checkbox"
            type="checkbox"
            value="new"
          />
          Новый проект
        </label>
        <label class="label">
          <input
            v-model="statuses"
            class="checkbox"
            type="checkbox"
            value="open"
          />
          Открыт для записи
        </label>
        <label class="label">
          <input
            v-model="statuses"
            class="checkbox"
            type="checkbox"
            value="addition"
          />
          Добор участников
        </label>
        <label class="label">
          <input
            v-model="statuses"
            class="checkbox"
            type="checkbox"
            value="close"
          />
          Закрыт для записи
        </label>
      </template>
    </VAccordion>

    <div class="divider"></div>

    <VAccordion class="filter-wrapper">
      <template #title>Тип проекта</template>
      <template #content>
        <label class="label">
          <input
            v-model="type"
            class="radio"
            type="radio"
            value="project"
            name="project-type"
          />
          Проектное обучение
        </label>
        <label class="label">
          <input
            v-model="type"
            class="radio"
            type="radio"
            value="science"
            name="project-type"
          />
          Научная деятельность
        </label>
      </template>
    </VAccordion>

    <div class="divider"></div>

    <VAccordion class="filter-wrapper">
      <template #title>Руководитель проекта</template>
      <template #content>
        <VMultiselect
          v-model="teacher"
          class="input"
          placeholder="Куцый Н.Н."
          :searchable="true"
          :options="options"
        />
      </template>
    </VAccordion>

    <div class="divider"></div>

    <VAccordion class="filter-wrapper">
      <template #title>Теги</template>
      <template #content>
        <VMultiselect
          v-model="tags"
          mode="tags"
          placeholder="Data Science"
          :searchable="true"
          :options="options"
        />
      </template>
    </VAccordion>

    <div class="divider"></div>

    <VAccordion class="filter-wrapper">
      <template #title>Сроки реализации</template>
      <template #content>
        <div class="date">
          <input v-model="dateFrom" class="input" type="date" />
          <input v-model="dateTo" class="input" type="date" />
        </div>
      </template>
    </VAccordion>

    <div class="divider"></div>

    <VAccordion class="filter-wrapper">
      <template #title>Уровни сложности</template>
      <template #content>
        <label class="label">
          <input
            v-model="difficulty"
            class="checkbox"
            type="checkbox"
            value="easy"
          />
          Легко
        </label>
        <label class="label">
          <input
            v-model="difficulty"
            class="checkbox"
            type="checkbox"
            value="medium"
          />
          Средне
        </label>
        <label class="label">
          <input
            v-model="difficulty"
            class="checkbox"
            type="checkbox"
            value="hard"
          />
          Сложно
        </label>
      </template>
    </VAccordion>

    <footer class="filter-wrapper footer">
      <BaseButton full-width>найти</BaseButton>
      <BaseButton full-width variant="link">сбросить фильтр</BaseButton>
    </footer>
  </form>
</template>

<script setup lang="ts">
  import { ref } from '@vue/reactivity';
  import VAccordion from './base/VAccordion.vue';
  import VMultiselect from '@vueform/multiselect';
  import BaseButton from './base/BaseButton.vue';

  const tags = ref([]);
  const teacher = ref('');
  const type = ref('project');
  const statuses = ref(['new']);
  const difficulty = ref([]);
  const dateFrom = ref<Date>();
  const dateTo = ref<Date>();

  const options = [
    'Далеко-далеко',
    'за',
    'словесными',
    'горами',
    'в',
    'стране',
    'гласных',
    'и',
    'согласных',
    'живут',
    'рыбные',
    'тексты.',
    'Запятых',
    'выйти',
    'лучше',
    'не',
    'проектах',
    'текста',
    'по',
    'всей',
    'своих',
    'прямо',
    'рукопись',
    'вдали',
    'оксмокс',
    'эта',
    'залетают',
    'назад,',
    'толку',
  ];
</script>

<style scoped>
  .divider {
    margin-top: 8px;
    margin-bottom: 8px;
    width: 100%;
    height: 1px;
    background-color: var(--gray-color-1);
  }

  .filters {
    padding-top: 10px;
    padding-bottom: 11px;
  }

  .filter-wrapper {
    margin-top: 18px;
    padding-left: 22px;
    padding-right: 22px;
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
  }
</style>
