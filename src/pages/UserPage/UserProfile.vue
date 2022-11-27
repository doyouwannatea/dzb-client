<template>
  <BasePanel class="panel">
    <!-- USER INFORMATION -->
    <h1 class="title">{{ profileData?.fio }}</h1>

    <!-- CONTACT INFO -->
    <h2 class="subtitle">Контактная информация</h2>
    <AppList
      class="margin-b app-list desktop"
      row-gap="m"
      :items="contactInfo"
    />
    <AppList
      class="margin-b app-list mobile"
      row-gap="m"
      :items="makeAppListItemsWide(contactInfo)"
    />
    <!-- CONTACT INFO -->

    <!-- ADDITIONAL INFO -->
    <h2 class="subtitle">Дополнительная информация</h2>
    <AppList class="app-list desktop" row-gap="m" :items="addInfo" />
    <AppList
      class="app-list mobile"
      row-gap="m"
      :items="makeAppListItemsWide(addInfo)"
    />
    <!-- ADDITIONAL INFO -->

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
    <!-- USER INFORMATION -->
  </BasePanel>
</template>

<script setup lang="ts">
  import { useAuthStore } from '@/stores/auth/useAuthStore';
  // components
  import AppList, { AppListItemType } from '@/components/ui/AppList.vue';
  import BasePanel from '@/components/ui/BasePanel.vue';
  import BaseButton from '@/components/ui/BaseButton.vue';

  const authStore = useAuthStore();
  const profileData = authStore.profileData;

  const contactInfo: AppListItemType[] = [
    {
      title: 'E-Mail:',
      content: profileData?.email ? profileData.email : '-',
    },
    {
      title: 'Телефон:',
      content: profileData?.phone ? profileData.phone : '-',
    },
  ];

  const addInfo: AppListItemType[] = [
    {
      title: 'Учебная группа:',
      content: profileData?.training_group ? profileData.training_group : '-',
    },
    {
      title: 'Курс:',
      content: String(profileData?.course ? profileData.course : '-'),
    },
  ];

  function makeAppListItemsWide(items: AppListItemType[]) {
    return items.map((item) => ({ ...item, wide: true }));
  }
</script>

<style lang="scss" scoped>
  @import '@styles/breakpoints';

  .panel {
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }

  .panel:deep(.row) {
    width: 100%;
  }

  .app-list {
    &:deep(.info-list-title) {
      color: var(--gray-color-2);
    }

    &.desktop {
      @media (max-width: $mobile-s) {
        display: none;
      }
    }

    &.mobile {
      display: none;

      &:deep(.info-list-item) {
        gap: 0.5rem;
      }

      @media (max-width: $mobile-s) {
        display: flex;
      }
    }
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

    @media (max-width: $mobile-s) {
      width: 100%;
      margin-top: 2.5rem;
    }
  }

  .right-col {
    display: flex;
    flex-direction: column;
  }

  .margin-b {
    margin-bottom: 3.125rem;
  }
</style>
