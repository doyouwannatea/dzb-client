<template>
  <PageLayout>
    <header class="header">
      <h1 class="title page-title">Создать проект</h1>
    </header>
    <BasePanel>
      <CreateProjectSection tag="1" title="Тип проекта" :divider="true">
        <h1>Контент</h1>
      </CreateProjectSection>
      <CreateProjectSection tag="2" title="Данные о проекте" :divider="true">
        <h1>Контент</h1>
      </CreateProjectSection>
      <CreateProjectSection tag="3" title="Роли в проекте" :divider="true">
        <h1>Контент</h1>
      </CreateProjectSection>
      <CreateProjectSection
        tag="4"
        title="Результаты и идея проекта"
        :divider="true"
      >
        <h1>Контент</h1>
      </CreateProjectSection>
      <CreateProjectSection
        tag="5"
        title="Направления (специальности), профилей  участников проекта"
      >
        <h1>Контент</h1>
      </CreateProjectSection>
      <CreateProjectSection
        tag="6"
        title="Навыки, которые необходимы на проекте"
        :divider="true"
      >
        <h1>Контент</h1>
      </CreateProjectSection>
    </BasePanel>
  </PageLayout>
</template>

<script setup lang="ts">
  import PageLayout from '@/components/layout/PageLayout.vue';
  import BasePanel from '@/components/ui/BasePanel.vue';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import CreateProjectSection from '@/components/ui/CreateProjectSection.vue';
</script>

<style lang="scss" scoped>
  @import '@styles/breakpoints';

  .header {
    margin-top: 4.75rem;
    margin-bottom: 2.8125rem;

    @media (max-width: $tablet) {
      margin-top: 1.875rem;
    }
  }
</style>
