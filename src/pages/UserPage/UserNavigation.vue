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
      <button :class="['action', props.variant]" @click="authStore.exit()">
        Выйти из профиля
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
  import { useRoledUserNavigationRoutes } from '@/hooks/useRoutes';
  import { useAuthStore } from '@/stores/auth/useAuthStore';
  import { RouterLink } from 'vue-router';

  type Props = { variant: 'desktop' | 'mobile' };
  const props = withDefaults(defineProps<Props>(), { variant: 'desktop' });
  const authStore = useAuthStore();
  const routes = useRoledUserNavigationRoutes();
</script>

<style lang="scss" scoped>
  @import '@styles/breakpoints.scss';

  .list {
    padding: 0 1.375rem;
    background: #ffffff;
    border: 1px solid var(--gray-color-1);
    border-radius: 0.625rem;

    &.mobile {
      @media (max-width: $mobile-s) {
        border: none;
        border-radius: 0;

        display: flex;
        overflow-x: auto;
        margin-top: -2px;
        position: sticky;
        top: 0;
        z-index: 10;
        gap: 1rem;

        box-shadow: 0px 0.25rem 0.625rem rgba(0, 0, 0, 0.07);
        padding-bottom: 0.625rem;
      }
    }
  }

  .item {
    list-style: none;

    &.mobile {
      @media (max-width: $mobile-s) {
        white-space: nowrap;
      }
    }
  }

  .item:not(:last-child) {
    border-bottom: 1px solid var(--gray-color-1);

    &.mobile {
      @media (max-width: $mobile-s) {
        border-bottom: none;
      }
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
      @media (max-width: $mobile-s) {
        font-size: 0.9rem;
        text-transform: uppercase;
        color: var(--gray-color-2);
        padding: 1rem;
      }
    }
  }

  .action:hover,
  .action.router-link-exact-active {
    color: var(--accent-color-1);

    &.mobile {
      border-bottom: 2px solid transparent;

      @media (max-width: $mobile-s) {
        border-bottom: 2px solid var(--accent-color-1);
      }
    }
  }
</style>
