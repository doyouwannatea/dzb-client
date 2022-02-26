<template>
  <div class="actions">
    <template v-if="authStore.isAuth && authStore.userData">
      <button class="ring-btn">
        <RingIcon />
      </button>
      <div ref="handleMenuNode" class="user" @click="toggleMenu">
        <UserPicture />
        <span class="username">{{ authStore.userData.fio }}</span>
        <button :class="['menu-btn', { active: isMenuOpen }]">
          <ArrowIcon />
        </button>
        <HeaderUserDropdown
          :handle-node="handleMenuNode"
          :is-open="isMenuOpen"
          @close="closeMenu"
        />
      </div>
    </template>

    <template v-else>
      <BaseButton :disabled="authStore.loading" @click="authStore.auth()">
        авторизоваться
      </BaseButton>
    </template>
  </div>
</template>

<script setup lang="ts">
  import ArrowIcon from '@/assets/icons/dropdown-arrow.svg?component';
  import { useAuthStore } from '@/stores/auth';
  import { ref } from 'vue';
  import RingIcon from '../assets/icons/ring.svg?component';
  import UserPicture from '../assets/icons/user-picture.svg?component';
  import BaseButton from './base/BaseButton.vue';
  import HeaderUserDropdown from './HeaderUserDropdown.vue';

  const authStore = useAuthStore();
  const handleMenuNode = ref(undefined);
  const isMenuOpen = ref(false);
  const closeMenu = () => (isMenuOpen.value = false);
  const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value);
</script>

<style scoped>
  .actions {
    display: flex;
    align-items: center;
    gap: 1.875rem;
  }

  .ring-btn {
    border: 0;
    background: transparent;
    padding: 0.5rem;
    cursor: pointer;
  }

  .menu-btn {
    border: 0;
    background-color: transparent;
    cursor: pointer;
    padding: 0;
    align-self: normal;
    padding: 0 0.5rem;
    border-radius: 0.25rem;
    transform: rotate(180deg);
  }

  .menu-btn:hover {
    background-color: var(--gray-color-1);
  }

  .menu-btn.active {
    transform: rotate(0deg);
  }

  .user {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.8125rem;
  }

  .username {
    font-weight: 600;
    font-size: 1.125rem;
    line-height: 1.4375em;
    color: var(--accent-color-1);
  }
</style>
