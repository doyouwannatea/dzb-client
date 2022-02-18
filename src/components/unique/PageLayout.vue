<template>
  <BaseLayout>
    <template #header>
      <Header />
    </template>
    <template #content>
      <BaseContainer size="md">
        <slot></slot>
      </BaseContainer>
    </template>
    <template #footer>
      <Footer />
    </template>
  </BaseLayout>
</template>

<script setup lang="ts">
  import Footer from '@/components/unique/Footer.vue';
  import Header from '@/components/unique/Header.vue';
  import BaseLayout from '../base/BaseLayout.vue';
  import BaseContainer from '../base/BaseContainer.vue';
</script>
