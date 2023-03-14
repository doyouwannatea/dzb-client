<template>
  <PageLayout>
    <header class="header">
      <h1 class="title page-title">Создать проект</h1>
    </header>
    <BasePanel>
      <FormSection tag="1" title="Тип проекта" :divider="true">
        <h1>Контент</h1>
      </FormSection>
      <FormSection tag="2" title="Данные о проекте" :divider="true">
        <h1>Контент</h1>
      </FormSection>
      <FormSection tag="3" title="Роли в проекте" :divider="true">
        <h1>Контент</h1>
      </FormSection>
      <FormSection tag="4" title="Результаты и идея проекта" :divider="true">
        <h1>Контент</h1>
      </FormSection>
      <FormSection
        tag="5"
        title="Направления (специальности), профилей  участников проекта"
      >
        <h1>Контент</h1>
      </FormSection>
      <FormSection
        tag="6"
        title="Навыки, которые необходимы на проекте"
        :divider="true"
      >
        <h1>Контент</h1>
      </FormSection>
    </BasePanel>
  </PageLayout>
</template>

<script setup lang="ts">
  import PageLayout from '@/components/layout/PageLayout.vue';
  import BasePanel from '@/components/ui/BasePanel.vue';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import FormSection from '@/components/ui/FormSection.vue';
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
