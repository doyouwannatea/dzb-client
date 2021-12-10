<template>
  <article :class="['card', status]">
    <header class="header container">
      <h2 class="title">
        Платформа для размещения вузовских олимпиад lorem ipsum dolor sit amet,
        consectetur adipiscing elit
      </h2>
      <Badge class="status">{{ statusText }}</Badge>
      <div class="subtitle">Лукьянов Н.Д.</div>
    </header>
    <div class="divider"></div>
    <div class="body container">
      <ul class="list">
        <li>
          <b>Цель:</b> Создать платформу (страничку) для рекламы олимпиад.
        </li>
        <li>
          <b>Требования к студентам:</b> Знание основ верстки и дизайна
          веб-страниц.
        </li>
        <li><b>Сроки реализации:</b> 29.01.21 – 1.06.21</li>
        <li><b>Тип проекта:</b> Проектное обучение</li>
      </ul>
      <div class="info">
        <div class="team-counter">
          <span class="icon team-icon"></span>
          <span>0/13</span>
        </div>
        <div class="difficulty">
          <span class="icon star-icon"></span>
          <span>легко</span>
        </div>
      </div>
    </div>
    <footer class="footer container">
      <ul class="tag-list">
        <li v-for="tag of visibleTags" :key="tag">
          <Tag>{{ tag }}</Tag>
        </li>
        <li
          v-if="tags.length > TAGS_DEFAULT_VISIBLE && !isTagsVisible"
          class="tag-btn"
        >
          <Button variant="inline-link" @click="isTagsVisible = true">
            +{{ hiddenTagsCount }}
            {{ declOfNum(hiddenTagsCount, ['тег', 'тега', 'тегов']) }}
          </Button>
        </li>
      </ul>

      <div class="actions">
        <Button variant="outlined">Подать заявку</Button>
        <Button>Подробнее</Button>
      </div>
    </footer>
  </article>
</template>

<script setup lang="ts">
  import { computed, PropType, ref } from 'vue';
  import Badge from './Badge.vue';
  import Button from '../controls/Button.vue';
  import Tag from './Tag.vue';
  import { declOfNum } from '@/helpers';

  type status = 'new' | 'active' | 'recruitment' | 'closed';
  const props = defineProps({
    status: {
      type: String as PropType<status>,
      default: 'new',
    },
    tags: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  });

  const TAGS_DEFAULT_VISIBLE = 3;
  const hiddenTagsCount = props.tags.length - TAGS_DEFAULT_VISIBLE;
  let statusText = '';
  switch (props.status) {
    case 'active':
      statusText = 'Активен';
      break;
    case 'closed':
      statusText = 'Закрыт';
      break;
    case 'recruitment':
      statusText = 'Добор';
      break;
    case 'new':
      statusText = 'Новый';
      break;
  }

  const isTagsVisible = ref(false);
  const visibleTags = computed(() => {
    if (isTagsVisible.value) {
      return props.tags;
    }
    return props.tags.slice(0, TAGS_DEFAULT_VISIBLE);
  });
</script>

<style scoped>
  .card {
    --status-color: var(--accent-color-1);
    --border-left-color: var(--accent-color-1);
    --team-counter-color: var(--accent-color-1);
    --team-counter-bg: url('../assets/team.svg');

    width: 100%;
    background: #ffffff;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.18);
    border-radius: 10px;
    border-left: 20px solid var(--border-left-color);
    padding-top: 22px;
    padding-bottom: 22px;
  }

  .card.active {
    --status-color: #26ab5b;
    --border-left-color: #26ab5b;
    --team-counter-color: #26ab5b;
    --team-counter-bg: url('../assets/team-active.svg');
  }

  .card.recruitment {
    --status-color: #ffa500;
    --border-left-color: #ffa500;
    --team-counter-color: #ff7a00;
    --team-counter-bg: url('../assets/team-recruitment.svg');
  }

  .card.closed {
    --status-color: #e24c4c;
    --border-left-color: #e24c4c;
    --team-counter-color: #e24c4c;
    --team-counter-bg: url('../assets/team-closed.svg');
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 54px;
  }

  .header {
    padding-bottom: 20px;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 13px;
  }

  .tag-list {
    list-style: none;
    padding-left: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .tag-btn {
    display: flex;
    align-items: center;
  }

  .actions {
    display: flex;
    gap: 12px;
    align-self: flex-end;
  }

  .info {
    display: flex;
    justify-content: flex-end;
    font-size: 18px;
    line-height: 23px;
    gap: 22px;
    margin-top: 10px;
  }

  .team-counter,
  .difficulty {
    display: flex;
    align-items: center;
    gap: 9px;
  }

  .difficulty {
    color: var(--text-color);
  }

  .team-counter {
    color: var(--team-counter-color);
  }

  .icon {
    width: 24px;
    height: 24px;
    background: center / contain no-repeat;
  }

  .team-icon {
    background-image: var(--team-counter-bg);
  }

  .star-icon {
    background-image: url('../assets/star.svg');
  }

  .container {
    padding-left: 20px;
    padding-right: 20px;
  }

  .divider {
    width: 100%;
    height: 2px;
    background-color: var(--gray-color-1);
  }

  .title {
    font-weight: 600;
    font-size: 24px;
    line-height: 31px;
    color: #4f5569;
    max-width: 705px;
  }

  .subtitle {
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: #4f5569;
  }

  .status {
    align-self: baseline;
    justify-self: flex-end;
    border-color: var(--status-color);
    color: var(--status-color);
  }

  .body {
    padding-top: 37px;
    padding-bottom: 26px;
  }

  .list {
    padding-left: 0;
  }

  .list > li {
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    color: var(--text-color);
    list-style: none;
  }
  .list > li:not(:last-child) {
    margin-bottom: 17px;
  }
</style>
