<template>
  <ul :class="['list', props.variant]">
    <template v-for="link in routes" :key="link.name">
      <li :class="['item', props.variant]">
        <RouterLink
          :class="['action', props.variant]"
          :to="{ name: link.name }"
        >
          {{ link.meta.title }}
        </RouterLink>
      </li>
    </template>

    <li :class="['item', props.variant]">
      <button
        :class="['action', props.variant]"
        @click="modalsStore.openExitConfirmModal()"
      >
        Выйти из профиля
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
  import { useRoledUserNavigationRoutes } from '@/hooks/useRoutes';
  import { useAuthStore } from '@/stores/auth/useAuthStore';
  import { useModalsStore } from '@/stores/modals/useModalsStore';
  import { RouterLink } from 'vue-router';

  type Props = { variant: 'desktop' | 'mobile' };
  const props = withDefaults(defineProps<Props>(), { variant: 'desktop' });
  const modalsStore = useModalsStore();
  const routes = useRoledUserNavigationRoutes();
</script>

<style lang="scss" scoped>
  .list {
    padding: 0 1.375rem;
    background: #fff;
    border: 1px solid var(--gray-color-1);
    border-radius: 0.625rem;

    &.mobile {
      position: sticky;
      top: 0;
      z-index: 10;
      display: flex;
      gap: 1rem;
      padding-bottom: 0.625rem;
      margin-top: -2px;
      margin-right: calc(var(--side-padding) * -1);
      margin-left: calc(var(--side-padding) * -1);
      overflow-x: auto;
      border: none;
      border-radius: 0;
      box-shadow: 0 0.25rem 0.3rem rgb(0 0 0 / 7%);
    }
  }

  .item {
    list-style: none;

    &.mobile {
      white-space: nowrap;
    }
  }

  .item:not(:last-child) {
    border-bottom: 1px solid var(--gray-color-1);

    &.mobile {
      border-bottom: none;
    }
  }

  .action {
    display: inline-block;
    width: 100%;
    padding: 1.25rem 0;
    font-size: 1.25rem;
    line-height: 1.625rem;
    color: var(--text-color);

    /* for button */
    text-align: left;
    text-decoration: none;
    cursor: pointer;
    background: transparent;
    border: none;

    &.mobile {
      padding: 1rem;
      font-size: 0.9rem;
      color: var(--gray-color-2);
      text-transform: uppercase;
    }
  }

  .action:hover,
  .action.router-link-exact-active {
    color: var(--accent-color-1);

    &.mobile {
      border-bottom: 2px solid var(--accent-color-1);
    }
  }
</style>
