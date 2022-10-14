<template>
  <transition name="btn">
    <BaseButton v-if="visible" class="btn" @click="scroll" />
  </transition>
</template>

<script setup lang="ts">
  import { computed, onBeforeMount, onBeforeUnmount, ref } from 'vue';
  import BaseButton from './BaseButton.vue';

  const topOffset = 0;
  const fromTop = ref<number | undefined>(undefined);
  const visible = computed(
    () => fromTop.value !== undefined && fromTop.value > topOffset,
  );

  function scroll() {
    window.scrollTo({ behavior: 'smooth', left: 0, top: 0 });
  }

  function onScroll() {
    fromTop.value = Math.floor(scrollY);
  }

  onBeforeMount(() => {
    window.addEventListener('scroll', onScroll);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll);
  });
</script>

<style lang="scss" scoped>
  @import '@styles/breakpoints.scss';

  .btn {
    position: fixed;
    right: 5rem;
    bottom: 7rem;
    z-index: 999;
    width: 4rem;
    height: 4rem;
    padding: 0;
    background-image: url('@/assets/icons/to-up-arrow.png');
    background-repeat: no-repeat;
    background-position: 50% 45%;
    background-size: 50%;
    border-radius: 50%;
    box-shadow: 0px 0px 0.3125rem rgba(0, 0, 0, 0.18);

    @media (max-width: $mobile-s) {
      display: none;
    }
  }

  .btn-enter-active,
  .btn-leave-active {
    transition: opacity 0.3s ease;
  }

  .btn-enter-from,
  .btn-leave-to {
    opacity: 0;
  }
</style>
