<template>
  <transition name="nav">
    <nav v-if="visible" class="navigation">
      <BaseContainer class="container" :size="ContainerSize.lg">
        <template v-for="link in mobileRoutes" :key="link.name">
          <RouterLink class="link" :to="{ name: link.name }">
            <div v-if="link.meta.svg" v-html="link.meta.svg"></div>
            {{ link.meta.title }}
          </RouterLink>
        </template>
      </BaseContainer>
    </nav>
  </transition>
</template>

<script setup lang="ts">
  import { onBeforeMount, onBeforeUnmount, ref } from 'vue';
  import { RouterLink } from 'vue-router';
  import BaseContainer from '@/components/ui/BaseContainer.vue';
  import { ContainerSize } from '@/models/components/BaseContainer';
  import { useMobileNavigationRoutes } from '@/hooks/useRoutes';

  const mobileRoutes = useMobileNavigationRoutes();

  const lastScroll = ref<number>(Number.MAX_SAFE_INTEGER);
  const visible = ref<boolean>(true);

  function onScroll() {
    visible.value = lastScroll.value > scrollY;
    lastScroll.value = scrollY;
  }

  onBeforeMount(() => {
    window.addEventListener('scroll', onScroll);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll);
  });
</script>

<style lang="scss" scoped>
  .navigation {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    background: #fff;
    border-radius: 1.25rem 1.25rem 0 0;
    box-shadow: 0 -0.4375rem 1.25rem rgb(0 0 0 / 7%);
  }

  .nav-enter-active,
  .nav-leave-active {
    transition: transform 500ms cubic-bezier(0.23, 1, 0.32, 1);
  }

  .nav-enter-from,
  .nav-leave-to {
    transform: translateY(100%);
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .link {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 0.5625rem;
    align-items: center;
    min-width: 70px;
    padding-top: 0.875rem;
    padding-bottom: 0.875rem;
    font-family: Mont, Arial, Helvetica, sans-serif;
    font-size: 0.625rem;
    font-weight: 600;
    color: var(--gray-color-2);
    text-decoration: none;

    &:deep(svg) {
      width: 1.875rem;
      height: 1.875rem;
    }

    &:deep(path) {
      stroke: var(--gray-color-2);
    }

    &:hover,
    &:active,
    &:focus-visible,
    &.router-link-exact-active {
      color: var(--accent-color-1);

      &:deep(svg),
      &:deep(path) {
        stroke: var(--accent-color-1);
      }
    }
  }
</style>
