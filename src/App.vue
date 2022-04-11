<template>
  <AuthModal />
  <ProjectRequestModal />
  <ProjectSuccessRequestModal />
  <RouterView></RouterView>
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import ProjectRequestModal from './components/ProjectRequestModal.vue';
  import AuthModal from './components/AuthModal.vue';
  import ProjectSuccessRequestModal from './components/ProjectSuccessRequestModal.vue';
</script>
