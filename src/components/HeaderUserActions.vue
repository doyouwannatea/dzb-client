<template>
  <div class="actions">
    <template v-if="authStore.isAuth && authStore.userData">
      <button class="ring-btn">
        <RingIcon />
      </button>
      <div class="user">
        <UserPicture />
        <span class="username">{{ authStore.userData.fio }}</span>
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
  import { useAuthStore } from '@/stores/auth';
  import RingIcon from '../assets/icons/ring.svg?component';
  import UserPicture from '../assets/icons/user-picture.svg?component';
  import BaseButton from './base/BaseButton.vue';
  const authStore = useAuthStore();
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

  .user {
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
