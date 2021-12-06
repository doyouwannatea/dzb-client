<template>
  <BaseLayout>
    <template #header>
      <Header></Header>
    </template>
    <template #content>
      <Container size="md">
        <slot></slot>
      </Container>
    </template>
    <template #footer>
      <Footer></Footer>
    </template>
  </BaseLayout>
</template>

<script setup lang="ts">
  import Footer from '@/components/Footer.vue';
  import Header from '@/components/Header.vue';
  import BaseLayout from '../layout/BaseLayout.vue';
  import Container from './Container.vue';
</script>
