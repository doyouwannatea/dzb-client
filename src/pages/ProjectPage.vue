<template>
  <BasePageLayout>
    <header class="header">
      <Breadcrumbs class="breadcrumbs" />
      <h1 class="page-title">Платформа для размещения вузовских олимпиад</h1>
    </header>
    <ProjectPanel>
      <div class="row three-cols">
        <div class="col">
          <ul class="info-list">
            <li>
              <h2 class="info-list-title">Руководитель проекта</h2>
              <b>Лукьянов Никита Дмитриевич</b>
            </li>
            <li>
              <h2 class="info-list-title">Заказчик</h2>
              <b>ЦЭО, Лукьянов Н.Д.</b>
            </li>
            <li>
              <h2 class="info-list-title">Сроки реализации</h2>
              <b>29.01.21 – 1.06.21</b>
            </li>
            <li>
              <h2 class="info-list-title">Требуемые навыки</h2>
              <span class="tags">
                <Tag>HTML</Tag>
                <Tag>CSS</Tag>
                <Tag>PHP</Tag>
              </span>
            </li>
          </ul>
        </div>
        <div class="col">
          <ul class="info-list">
            <li>
              <h2 class="info-list-title">Тип проекта</h2>
              <b>Проектное обучение (Прикладной)</b>
            </li>
            <li>
              <h2 class="info-list-title">Цель проекта</h2>
              <b>Создать платформу (страничку) для рекламы олимпиад</b>
            </li>
            <li>
              <h2 class="info-list-title">Сложность</h2>
              <b>Легкая</b>
            </li>
          </ul>
        </div>
        <div class="col">
          <h2 class="info-list-title">Статус проекта</h2>
          <Badge class="badge mt-2">новый</Badge>
          <h2 class="info-list-title mt-4">Кол-во участников</h2>
          <TeamCounter class="mt-2" :count="0" :total="13" />
          <Button class="mt-4">Подать заявку</Button>
        </div>
      </div>
    </ProjectPanel>
    <ProjectPanel>
      <div class="row two-cols">
        <div class="col">
          <ul class="info-list">
            <li>
              <h2 class="info-list-title">Ожидаемый результат</h2>
              <b>
                Платформа пригодная для размещения олимпиад, анонса других
                мероприятий интегрированная с moodle
              </b>
            </li>
          </ul>
        </div>
        <div class="col">
          <ul class="info-list">
            <li>
              <h2 class="info-list-title">Требования к участникам</h2>
              <b>Знание основ верстки и дизайна веб-страниц</b>
            </li>
          </ul>
        </div>
      </div>
    </ProjectPanel>
    <ProjectPanel>
      <ul class="info-list">
        <li class="wide">
          <h2 class="info-list-title">Идея проекта</h2>
          <span>
            В настоящий момент олимпиады проводятся на сайте "Открытые курсы
            ИРНИТУ", базирующемся на платформе MOODLE, данная платформа при всех
            ее достоинствах имеет существенный недостаток в сложности
            регистрации, поэтому необходимо создать страницу с простой
            регистрацией на мероприятия и подключением через api к moodle
          </span>
        </li>
        <li class="wide">
          <h2 class="info-list-title">Теги</h2>
          <span class="tags">
            <Tag>JavaScript</Tag>
            <Tag>WEB</Tag>
            <Tag>Конференция</Tag>
            <Tag>Обучение</Tag>
            <Tag>Конференция</Tag>
            <Tag>Конференция</Tag>
          </span>
        </li>
      </ul>
    </ProjectPanel>

    <div class="d-flex justify-content-center mt-3">
      <Button wrapper variant="link">
        <RouterLink class="clear-link" :to="{ name: 'home' }">
          назад к списку
        </RouterLink>
      </Button>
    </div>
  </BasePageLayout>
</template>

<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import BasePageLayout from '@/layout/BasePageLayout.vue';
  import Breadcrumbs from '@/components/Breadcrumbs.vue';
  import Tag from '../components/Tag.vue';
  import Badge from '../components/Badge.vue';
  import TeamCounter from '../components/TeamCounter.vue';
  import Button from '../controls/Button.vue';
  import ProjectPanel from '@/layout/ProjectPanel.vue';
</script>

<style scoped>
  /* Text */
  b {
    line-height: 23px;
  }
  .page-title {
    margin-top: 26px;
    margin-bottom: 24px;
  }

  /* Components */
  .breadcrumbs {
    margin-top: 32px;
  }

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
  .info-list > li {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: flex-start;
    line-height: 27px;
  }

  .info-list > li.wide {
    grid-template-columns: minmax(auto, 230px) auto;
  }
</style>
