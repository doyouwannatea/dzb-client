<template>
  <section>
    <ProjectPanel>
      <div class="row three-cols">
        <div class="col">
          <ul class="info-list">
            <li class="info-list-item">
              <h2 class="info-list-title">Руководитель проекта</h2>
              <b class="bold">{{ project.supervisor_name }}</b>
            </li>
            <li class="info-list-item">
              <h2 class="info-list-title">Заказчик</h2>
              <b class="bold">{{ project.customer }}</b>
            </li>
            <li class="info-list-item">
              <h2 class="info-list-title">Сроки реализации</h2>
              <b class="bold">
                {{ project.date_start }} – {{ project.date_end }}
              </b>
            </li>
            <li class="info-list-item">
              <h2 class="info-list-title">Требуемые навыки</h2>
              <span class="tags">
                <h1>у нас есть только теги проекта</h1>
              </span>
            </li>
          </ul>
        </div>
        <div class="col">
          <ul class="info-list">
            <li class="info-list-item">
              <h2 class="info-list-title">Тип проекта</h2>
              <b class="bold">{{ project.type_name }}</b>
            </li>
            <li class="info-list-item">
              <h2 class="info-list-title">Цель проекта</h2>
              <b class="bold">{{ project.goal }}</b>
            </li>
            <li class="info-list-item">
              <h2 class="info-list-title">Сложность</h2>
              <b class="bold">{{ DifficultyText[project.difficulty] }}</b>
            </li>
          </ul>
        </div>
        <div class="col">
          <h2 class="info-list-title">Статус проекта</h2>
          <AppBadge class="badge mt-2">{{ project.state_name }}</AppBadge>
          <h2 class="info-list-title mt-4">Кол-во участников</h2>
          <ProjectTeamCounter
            class="mt-2"
            :count="project.vacant_places"
            :total="project.places"
          />
          <AppButton class="mt-4">Подать заявку</AppButton>
        </div>
      </div>
    </ProjectPanel>
    <ProjectPanel>
      <div class="row two-cols">
        <div class="col">
          <ul class="info-list">
            <li class="info-list-item">
              <h2 class="info-list-title">Ожидаемый результат</h2>
              <b class="bold">{{ project.expected_result }}</b>
            </li>
          </ul>
        </div>
        <div class="col">
          <ul class="info-list">
            <li class="info-list-item">
              <h2 class="info-list-title">Требования к участникам</h2>
              <b class="bold">{{ project.requirements }}</b>
            </li>
          </ul>
        </div>
      </div>
    </ProjectPanel>
    <ProjectPanel>
      <ul class="info-list">
        <li class="info-list-item wide">
          <h2 class="info-list-title">Идея проекта</h2>
          <span>{{ project.idea }}</span>
        </li>
        <li class="info-list-item wide">
          <h2 class="info-list-title">Теги</h2>
          <span class="tags">
            <AppTag v-for="tag in project.tags" :key="tag.id">
              {{ tag.tag }}
            </AppTag>
          </span>
        </li>
      </ul>
    </ProjectPanel>
  </section>
</template>

<script setup lang="ts">
  import ProjectPanel from './ProjectPanel.vue';
  import AppTag from './base/AppTag.vue';
  import AppBadge from './base/AppBadge.vue';
  import ProjectTeamCounter from './ProjectTeamCounter.vue';
  import AppButton from './base/AppButton.vue';
  import type { Project } from '@/models/Project';
  import { DifficultyText } from '@/models/enums/difficulty-text';

  defineProps<{ project: Project }>();
</script>

<style scoped>
  /* Text */
  .bold {
    line-height: 23px;
    font-weight: 700;
  }

  /* Components */
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }

  .badge {
    width: max-content;
  }

  /* Layout */
  .row {
    display: grid;
    row-gap: 30px;
  }

  .row.three-cols {
    grid-template-columns: 4fr 4fr 2fr;
  }

  .row.two-cols {
    grid-template-columns: 1fr 1fr;
  }

  .col:not(:last-child) {
    padding-right: 30px;
    margin-right: 30px;
    border-right: 1px solid var(--gray-color-1);
  }

  .info-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    row-gap: 45px;
    font-size: 1.13rem;
  }

  .info-list-title {
    font-size: inherit;
    font-weight: 600;
    line-height: normal;
  }
  .info-list-item {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: flex-start;
    line-height: 27px;
  }

  .info-list-item.wide {
    grid-template-columns: minmax(auto, 230px) auto;
  }
</style>
