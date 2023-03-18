<template>
  <div class="actions">
    <template v-if="authStore.profileData">
      <!-- UNDER DEV  -->
      <button v-if="false" class="ring-btn">
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
        <UserNavigationDropdown
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
  import arrowIconUrl from '@/assets/icons/dropdown-arrow.svg?url';
  import ringIconUrl from '@/assets/icons/ring.svg?url';
  import userPictureUrl from '@/assets/icons/user-picture.svg?url';
  import userPictureGrayUrl from '@/assets/icons/user-picture-gray.svg?url';
  // components
  import UserNavigationDropdown from './UserNavigationDropdown.vue';
  import BaseButton from '../ui/BaseButton.vue';

  const authStore = useAuthStore();
  const handleMenuNode = ref();
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
    gap: 1.875rem;
    align-items: center;
  }

  .ring-btn {
    padding: 0.5rem;
    cursor: pointer;
    background: transparent;
    border: 0;
  }

  .menu-btn {
    width: 2.1875rem;
    height: 1.9375rem;
    padding: 0 0.5rem;
    cursor: pointer;
    background-color: transparent;
    border: 0;
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
    display: flex;
    gap: 0.8125rem;
    align-items: center;
    max-width: 18.375rem;
    height: 100%;
    cursor: default;
  }

  .dropdown-container {
    position: relative;
    height: 100%;
  }

  .username {
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 1.4375em;
    color: var(--accent-color-1);
    user-select: none;
  }
</style>
