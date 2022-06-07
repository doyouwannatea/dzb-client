<template>
  <BaseButton
    v-if="fromBottom !== undefined && fromBottom < 100"
    class="btn"
    @click="scroll"
  />
</template>

<script setup lang="ts">
  import { onBeforeMount, onBeforeUnmount, ref } from 'vue';
  import BaseButton from './BaseButton.vue';

  const fromBottom = ref<number | undefined>(undefined);

  function scroll() {
    window.scrollTo({ behavior: 'smooth', left: 0, top: 0 });
  }

  function onScroll() {
    fromBottom.value = Math.floor(
      document.documentElement.scrollHeight -
        document.documentElement.clientHeight -
        scrollY,
    );
    console.log(fromBottom.value);
  }

  onBeforeMount(() => {
    window.addEventListener('scroll', onScroll);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll);
  });
</script>

<style scoped>
  .btn {
    position: fixed;
    bottom: 8.625rem;
    left: 5.625rem;
    z-index: 9999;
    width: 4rem;
    height: 4rem;
    padding: 0;
    background-image: url('@/assets/icons/to-up-arrow.png');
    background-repeat: no-repeat;
    background-position: 50% 45%;
    background-size: 50%;
    border-radius: 50%;
  }
</style>
