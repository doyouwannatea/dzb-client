<template>
  <BasePanel class="panel">
    <!-- USER INFORMATION -->
    <h1 class="title">{{ profileData?.fio }}</h1>

    <!-- CONTACT INFO -->
    <h2 class="subtitle">Контактная информация</h2>
    <AppList
      class="margin-b app-list"
      row-gap="m"
      :items="isDesktop ? contactInfo : makeAppListItemsWide(contactInfo)"
    />
    <!-- CONTACT INFO -->

    <!-- ADDITIONAL INFO -->
    <h2 class="subtitle">Дополнительная информация</h2>
    <AppList
      class="margin-b app-list"
      row-gap="m"
      :items="isDesktop ? addInfo : makeAppListItemsWide(addInfo)"
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
  import { isCandidate, isSupervisor } from '@/helpers/typeCheck';
  // components
  import AppList, { AppListItemType } from '@/components/ui/AppList.vue';
  import BasePanel from '@/components/ui/BasePanel.vue';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import { useDesktop } from '@/helpers/breakpoints';

  const isDesktop = useDesktop();
  const authStore = useAuthStore();
  const profileData = authStore.profileData;

  const contactInfo: AppListItemType[] = [
    {
      title: 'E-Mail:',
      content: withDefaultFiller(profileData?.email),
    },
  ];

  const addInfo: AppListItemType[] = [];

  if (profileData && isCandidate(profileData)) {
    contactInfo.push({
      title: 'Телефон:',
      content: withDefaultFiller(profileData?.phone),
    });

    addInfo.push(
      {
        title: 'Учебная группа:',
        content: withDefaultFiller(profileData?.training_group),
      },
      {
        title: 'Курс:',
        content: withDefaultFiller(profileData?.course),
      },
    );
  }

  if (profileData && isSupervisor(profileData)) {
    addInfo.push({
      title: 'Должность:',
      content: withDefaultFiller(profileData?.position),
    });
  }

  function withDefaultFiller(str?: string | number, filler = '-'): string {
    return str ? String(str) : filler;
  }

  function makeAppListItemsWide(items: AppListItemType[]) {
    return items.map((item) => ({ ...item, wide: true }));
  }
</script>

<style lang="scss" scoped>
  @import '@styles/breakpoints';

  .panel {
    display: flex;
    flex-direction: column;
  }

  .panel:deep(.row) {
    width: 100%;
  }

  .app-list {
    &:deep(.info-list-title) {
      color: var(--gray-color-2);
    }

    &:deep(.info-list-item) {
      @media (max-width: $tablet) {
        gap: 0.5rem;
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

    @media (max-width: $tablet) {
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
