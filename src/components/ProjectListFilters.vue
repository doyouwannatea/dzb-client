<template>
  <form class="filters" @submit.prevent>
    <Accordion class="filter-wrapper">
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
    </Accordion>

    <div class="divider"></div>

    <Accordion class="filter-wrapper">
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
    </Accordion>

    <div class="divider"></div>

    <Accordion class="filter-wrapper">
      <template #title>Руководитель проекта</template>
      <template #content>
        <Multiselect
          v-model="teacher"
          class="input"
          placeholder="Куцый Н.Н."
          :searchable="true"
          :options="options"
        />
      </template>
    </Accordion>

    <div class="divider"></div>

    <Accordion class="filter-wrapper">
      <template #title>Теги</template>
      <template #content>
        <Multiselect
          v-model="tags"
          mode="tags"
          placeholder="Data Science"
          :searchable="true"
          :options="options"
        />
      </template>
    </Accordion>

    <div class="divider"></div>

    <Accordion class="filter-wrapper">
      <template #title>Сроки реализации</template>
      <template #content>
        <div class="date">
          <input v-model="dateFrom" class="input" type="date" />
          <input v-model="dateTo" class="input" type="date" />
        </div>
      </template>
    </Accordion>

    <div class="divider"></div>

    <Accordion class="filter-wrapper">
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
    </Accordion>

    <div class="divider"></div>

    <div class="filter-wrapper">
      <div>Tags: {{ tags }}</div>
      <div>Teacher: {{ teacher }}</div>
      <div>Type: {{ type }}</div>
      <div>Statuses: {{ statuses }}</div>
      <div>date: {{ dateFrom }} - {{ dateTo }}</div>
      <div>difficulty: {{ difficulty }}</div>
    </div>

    <footer class="filter-wrapper footer">
      <Button full-width>найти</Button>
      <Button full-width variant="link">сбросить фильтр</Button>
    </footer>
  </form>
</template>

<script setup lang="ts">
  import Accordion from './Accordion.vue';
  import Multiselect from './Multiselect.vue';
  import { ref } from '@vue/reactivity';
  import Button from '@/controls/Button.vue';

  const tags = ref([]);
  const teacher = ref('');
  const type = ref('');
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
    'предупреждал',
    'она',
    'коварных',
    'несколько,',
    'ручеек',
    'даже',
    'путь',
    'безорфографичный',
    'букв.',
    'Оксмокс',
    'свой',
    'безорфографичный',
    'рукопись',
    'над',
    'курсивных',
    'сих',
    'снова',
    'рекламных,',
    'предупреждал',
    'решила',
    'путь',
    'грустный',
    'составитель',
    'по',
    'всей',
    'раз',
    'вскоре,',
    'своих',
    'первую',
    'заголовок,',
    'собрал',
    'которое',
    'грамматики',
    'которой?',
    'Моей,',
    'ipsum',
    'до',
    'эта',
    'о',
    'власти',
    'он',
    'буквоград',
    'однажды',
    'букв',
    'агентство',
    'они',
    'рыбного',
    'единственное',
    'ее',
    'безорфографичный',
    'напоивший',
    'то?',
    'Дороге',
    'возвращайся',
    'своих,',
    'великий',
    'большой',
    'правилами',
    'они',
    'на',
    'берегу.',
    'Переписали',
    'текста',
    'пустился',
    'бросил',
    'что',
    'даль',
    'свою',
    'вопроса',
    'языком',
    'текст',
    'прямо',
    'коварных',
    'приставка',
    'рукопись',
    'текстов',
    'текстами,',
    'дороге',
    'решила',
    'диких',
    'своего',
    'рот',
    'сих,',
    'предупредила',
    'рыбного',
    'жаренные',
    'толку.',
    'До,',
    'снова',
    'моей',
    'проектах',
    'подзаголовок',
    'оксмокс',
    'вершину',
    'запятых?',
    'Собрал',
    'она',
    'буквенных',
    'решила',
    'языкового',
    'lorem',
    'лучше',
    'путь',
    'по',
    'всей',
    'если',
    'проектах',
    'языком',
    'переписали',
    'безопасную,',
    'оксмокс',
    'маленькая',
    'послушавшись',
    'текст',
    'великий',
    'однажды',
    'гор.',
    'Однажды',
    'путь',
    'что',
    'от',
    'всех',
    'большой',
    'ручеек',
    'парадигматическая',
    'подпоясал',
    'составитель',
    'эта.',
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
    margin-top: 45px;
  }
</style>
