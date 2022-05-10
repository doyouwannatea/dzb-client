<template>
  <BasePanel class="panel">
    <GridLayout :cols="2">
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
        <SkillList :skills="profileData?.skills" :default-visible="7" />
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
    </GridLayout>
  </BasePanel>
</template>

<script setup lang="ts">
  import SkillList from './SkillList.vue';
  import BaseButton from './base/BaseButton.vue';
  import InformationListItem from './InformationListItem.vue';
  import InformationList from './InformationList.vue';
  import BasePanel from './base/BasePanel.vue';
  import { useAuthStore } from '@/stores/auth/useAuthStore';
  import GridLayout from './GridLayout.vue';

  const authStore = useAuthStore();
  const profileData = authStore.profileData;
</script>

<style scoped>
  .panel {
    display: flex;
    min-height: 100%;
  }

  .label {
    color: var(--gray-color-2);
  }

  .subtitle {
    margin-bottom: 1.0625rem;
    font-size: 1.125rem;
    font-weight: 800;
    line-height: 1.6875rem;
  }

  .title {
    padding-bottom: 1.5rem;
    margin-bottom: 1.5rem;
    line-height: 2.375rem;
    border-bottom: 1px solid var(--gray-color-1);
  }

  .edit-btn {
    align-self: flex-end;
    margin-top: auto;
  }

  .right-col {
    display: flex;
    flex-direction: column;
  }

  .margin-b {
    margin-bottom: 3.125rem;
  }
</style>
