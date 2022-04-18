<template>
  <div class="actions">
    <template v-if="authStore.isAuth">
      <button class="ring-btn">
        <img :src="ringIconUrl" alt="уведомления" class="icon" />
      </button>
      <div class="dropdown-container">
        <div ref="handleMenuNode" class="user" @click="toggleMenu">
          <img :src="userPictureUrl" alt="" class="user-icon" />
          <span class="username">{{ authStore.profileData?.fio }}</span>
          <button :class="['menu-btn', { active: isMenuOpen }]">
            <img :src="arrowIconUrl" alt="↓" />
          </button>
        </div>
        <HeaderUserDropdown
          :handle-node="handleMenuNode"
          :is-open="isMenuOpen"
          @close="closeMenu"
        />
      </div>
    </template>

    <template v-else>
      <BaseButton
        class="auth-btn"
        variant="link"
        :disabled="authStore.loading"
        @click="authStore.auth()"
      >
        <img
          v-if="authStore.loading"
          :src="userPictureGrayUrl"
          alt=""
          class="user-icon"
        />
        <img v-else :src="userPictureUrl" alt="" class="user-icon" />
        Войти
      </BaseButton>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useAuthStore } from '@/stores/auth/useAuthStore';
  import BaseButton from './base/BaseButton.vue';
  import HeaderUserDropdown from './HeaderUserDropdown.vue';
  import arrowIconUrl from '@/assets/icons/dropdown-arrow.svg?url';
  import ringIconUrl from '../assets/icons/ring.svg?url';
  import userPictureUrl from '../assets/icons/user-picture.svg?url';
  import userPictureGrayUrl from '../assets/icons/user-picture-gray.svg?url';

  const authStore = useAuthStore();
  const handleMenuNode = ref(undefined);
  const isMenuOpen = ref(false);
  const closeMenu = () => (isMenuOpen.value = false);
  const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value);
</script>

<style scoped>
  .auth-btn {
    font-size: 1.125rem;
  }

  .icon {
    width: 2rem;
    height: 2rem;
  }

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
    width: 2.1875rem;
    height: 1.9375rem;
    border: 0;
    background-color: transparent;
    cursor: pointer;
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
    height: 100%;
    display: flex;
    align-items: center;
    gap: 0.8125rem;
    cursor: default;
    max-width: 18.375rem;
  }

  .dropdown-container {
    position: relative;
    height: 100%;
  }

  .username {
    font-weight: 600;
    font-size: 1.125rem;
    line-height: 1.4375em;
    color: var(--accent-color-1);
    user-select: none;
  }
</style>
