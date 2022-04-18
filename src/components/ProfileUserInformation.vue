<template>
  <BasePanel class="panel" :cols="2">
    <!-- USER INFORMATION -->
    <div>
      <h1 class="title">{{ profileData?.fio }}</h1>
      <h2 class="subtitle">Контактная информация</h2>
      <!-- CONTACT INFO -->
      <InformationList class="margin-b" row-gap="m">
        <!-- EMAIL -->
        <InformationListItem v-if="profileData?.email" :bold="false">
          <template #title>
            <span class="label">E-Mail:</span>
          </template>
          <template #default>{{ profileData?.email }}</template>
        </InformationListItem>
        <!-- EMAIL -->

        <!-- PHONE -->
        <InformationListItem v-if="profileData?.phone" :bold="false">
          <template #title>
            <span class="label">Телефон:</span>
          </template>
          <template #default>{{ profileData?.phone }}</template>
        </InformationListItem>
        <!-- PHONE -->
      </InformationList>
      <!-- CONTACT INFO -->

      <!-- ADDITIONAL INFO -->
      <h2 class="subtitle">Дополнительная информация</h2>
      <InformationList row-gap="m">
        <!-- GROUP -->
        <InformationListItem v-if="profileData?.training_group" :bold="false">
          <template #title>
            <span class="label">Учебная группа:</span>
          </template>
          <template #default>{{ profileData?.training_group }}</template>
        </InformationListItem>
        <!-- GROUP -->

        <!-- INSTITUTE -->
        <InformationListItem v-if="profileData?.course" :bold="false">
          <template #title>
            <span class="label">Курс:</span>
          </template>
          <template #default>{{ profileData?.course }}</template>
        </InformationListItem>
        <!-- INSTITUTE -->
      </InformationList>
      <!-- ADDITIONAL INFO -->
    </div>
    <!-- USER INFORMATION -->

    <!-- SKILLS -->
    <div class="right-col">
      <h2 class="subtitle">Навыки</h2>
      <SkillsList :skills="skills" :default-visible="7" />
      <BaseButton
        is="a"
        class="edit-btn"
        case="uppercase"
        variant="outlined"
        target="_blank"
        rel="noopener noreferrer"
        href="https://int.istu.edu/"
      >
        Редактировать профиль
      </BaseButton>
    </div>
    <!-- SKILLS -->
  </BasePanel>
</template>

<script setup lang="ts">
  import SkillsList from './SkillsList.vue';
  import BaseButton from './base/BaseButton.vue';
  import { skills } from '@/models/mock/project';
  import InformationListItem from './InformationListItem.vue';
  import InformationList from './InformationList.vue';
  import BasePanel from './base/BasePanel.vue';
  import { useAuthStore } from '@/stores/auth/useAuthStore';

  const authStore = useAuthStore();
  const profileData = authStore.profileData;
</script>

<style scoped>
  .panel {
    min-height: 100%;
    display: flex;
  }

  .label {
    color: var(--gray-color-2);
  }

  .subtitle {
    font-weight: 800;
    font-size: 1.125rem;
    line-height: 1.6875rem;
    margin-bottom: 1.0625rem;
  }

  .title {
    line-height: 2.375rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--gray-color-1);
  }

  .edit-btn {
    margin-top: auto;
    align-self: flex-end;
  }

  .right-col {
    display: flex;
    flex-direction: column;
  }

  .margin-b {
    margin-bottom: 3.125rem;
  }
</style>
