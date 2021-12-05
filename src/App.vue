<template>
  <main class="page">
    <Header />
  </main>
</template>

<script lang="ts">
  import Header from './components/Header.vue';
  import { defineComponent } from '@vue/runtime-core';

  export default defineComponent({
    components: {
      Header,
    },
  });
</script>
