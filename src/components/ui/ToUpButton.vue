<template>
  <BaseButton v-if="visible" class="btn" @click="scroll" />
</template>

<script setup lang="ts">
  import { computed, onBeforeMount, onBeforeUnmount, ref } from 'vue';
  import BaseButton from './BaseButton.vue';

  const bottomOffset = 100;
  const fromBottom = ref<number | undefined>(undefined);
  const visible = computed(
    () =>
      fromBottom.value !== undefined &&
      fromBottom.value < bottomOffset &&
      document.documentElement.scrollHeight -
        document.documentElement.clientHeight >=
        bottomOffset,
  );

  function scroll() {
    window.scrollTo({ behavior: 'smooth', left: 0, top: 0 });
  }

  function onScroll() {
    fromBottom.value = Math.floor(
      document.documentElement.scrollHeight -
        document.documentElement.clientHeight -
        scrollY,
    );
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
    bottom: 24rem;
    right: 5.625rem;
    z-index: 9999;
    width: 4rem;
    height: 4rem;
    padding: 0;
    background-image: url('@/assets/icons/to-up-arrow.png');
    background-repeat: no-repeat;
    background-position: 50% 45%;
    background-size: 50%;
    border-radius: 50%;
    box-shadow: 0px 0px 0.3125rem rgba(0, 0, 0, 0.18);
  }
</style>
