<template>
  <PageLayout>
    <header class="header">
      <AppBreadcrumbs class="breadcrumbs" />
      <h1 class="page-title">Платформа для размещения вузовских олимпиад</h1>
    </header>
    <ProjectPanel>
      <div class="row three-cols">
        <div class="col">
          <ul class="info-list">
            <li class="info-list-item">
              <h2 class="info-list-title">Руководитель проекта</h2>
              <b class="bold">Лукьянов Никита Дмитриевич</b>
            </li>
            <li class="info-list-item">
              <h2 class="info-list-title">Заказчик</h2>
              <b class="bold">ЦЭО, Лукьянов Н.Д.</b>
            </li>
            <li class="info-list-item">
              <h2 class="info-list-title">Сроки реализации</h2>
              <b class="bold">29.01.21 – 1.06.21</b>
            </li>
            <li class="info-list-item">
              <h2 class="info-list-title">Требуемые навыки</h2>
              <span class="tags">
                <AppTag>HTML</AppTag>
                <AppTag>CSS</AppTag>
                <AppTag>PHP</AppTag>
              </span>
            </li>
          </ul>
        </div>
        <div class="col">
          <ul class="info-list">
            <li class="info-list-item">
              <h2 class="info-list-title">Тип проекта</h2>
              <b class="bold">Проектное обучение (Прикладной)</b>
            </li>
            <li class="info-list-item">
              <h2 class="info-list-title">Цель проекта</h2>
              <b class="bold">
                Создать платформу (страничку) для рекламы олимпиад
              </b>
            </li>
            <li class="info-list-item">
              <h2 class="info-list-title">Сложность</h2>
              <b class="bold">Легкая</b>
            </li>
          </ul>
        </div>
        <div class="col">
          <h2 class="info-list-title">Статус проекта</h2>
          <AppBadge class="badge mt-2">новый</AppBadge>
          <h2 class="info-list-title mt-4">Кол-во участников</h2>
          <ProjectTeamCounter class="mt-2" :count="0" :total="13" />
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
              <b class="bold">
                Платформа пригодная для размещения олимпиад, анонса других
                мероприятий интегрированная с moodle
              </b>
            </li>
          </ul>
        </div>
        <div class="col">
          <ul class="info-list">
            <li class="info-list-item">
              <h2 class="info-list-title">Требования к участникам</h2>
              <b class="bold">Знание основ верстки и дизайна веб-страниц</b>
            </li>
          </ul>
        </div>
      </div>
    </ProjectPanel>
    <ProjectPanel>
      <ul class="info-list">
        <li class="info-list-item wide">
          <h2 class="info-list-title">Идея проекта</h2>
          <span>
            В настоящий момент олимпиады проводятся на сайте "Открытые курсы
            ИРНИТУ", базирующемся на платформе MOODLE, данная платформа при всех
            ее достоинствах имеет существенный недостаток в сложности
            регистрации, поэтому необходимо создать страницу с простой
            регистрацией на мероприятия и подключением через api к moodle
          </span>
        </li>
        <li class="info-list-item wide">
          <h2 class="info-list-title">Теги</h2>
          <span class="tags">
            <AppTag>JavaScript</AppTag>
            <AppTag>WEB</AppTag>
            <AppTag>Конференция</AppTag>
            <AppTag>Обучение</AppTag>
            <AppTag>Конференция</AppTag>
            <AppTag>Конференция</AppTag>
          </span>
        </li>
      </ul>
    </ProjectPanel>

    <div class="d-flex justify-content-center mt-3">
      <AppButton wrapper variant="link">
        <RouterLink class="clear-link" :to="{ name: 'home' }">
          назад к списку
        </RouterLink>
      </AppButton>
    </div>
  </PageLayout>
</template>

<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import PageLayout from '@/components/base/PageLayout.vue';
  import AppBreadcrumbs from '@/components/base/AppBreadcrumbs.vue';
  import AppTag from '@/components/base/AppTag.vue';
  import AppBadge from '@/components/base/AppBadge.vue';
  import ProjectTeamCounter from '@/components/ProjectTeamCounter.vue';
  import AppButton from '@/components/base/AppButton.vue';
  import ProjectPanel from '@/components/ProjectPanel.vue';
</script>

<style scoped>
  /* Text */
  .bold {
    line-height: 23px;
    font-weight: 700;
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
