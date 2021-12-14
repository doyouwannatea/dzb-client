<template>
  <BaseLayout>
    <template #header>
      <TheHeader />
    </template>
    <template #content>
      <AppContainer size="md">
        <slot></slot>
      </AppContainer>
    </template>
    <template #footer>
      <TheFooter />
    </template>
  </BaseLayout>
</template>

<script setup lang="ts">
  import TheFooter from '@/components/unique/TheFooter.vue';
  import TheHeader from '@/components/unique/TheHeader.vue';
  import BaseLayout from './BaseLayout.vue';
  import AppContainer from './AppContainer.vue';
</script>
