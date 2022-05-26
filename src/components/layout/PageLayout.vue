<template>
  <BaseLayout>
    <template #header>
      <AppHeader />
    </template>
    <template #content>
      <BaseContainer size="md">
        <slot></slot>
      </BaseContainer>
    </template>
    <template #footer>
      <AppFooter />
    </template>
  </BaseLayout>
</template>

<script setup lang="ts">
  // components
  import BaseLayout from '../ui/BaseLayout.vue';
  import AppHeader from './AppHeader.vue';
  import AppFooter from './AppFooter.vue';
  import BaseContainer from '../ui/BaseContainer.vue';
</script>
