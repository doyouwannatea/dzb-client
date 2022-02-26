<template>
  <div class="actions">
    <template v-if="authStore.isAuth && authStore.userData">
      <button class="ring-btn">
        <RingIcon />
      </button>
      <div ref="handleDdShow" class="user" @click="toggleDd">
        <UserPicture />
        <span class="username">{{ authStore.userData.fio }}</span>
        <button :class="['menu-btn', { active: isDdOpen }]">
          <ArrowIcon />
        </button>
        <BaseDropdown
          :hadle-node="handleDdShow"
          :is-open="isDdOpen"
          :items-list="ddItems"
          @close="closeDd"
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
  import BaseDropdown, { DropdownItem } from './base/BaseDropdown.vue';

  const authStore = useAuthStore();
  const handleDdShow = ref(null);
  const isDdOpen = ref(false);
  const closeDd = () => (isDdOpen.value = false);
  const toggleDd = () => (isDdOpen.value = !isDdOpen.value);
  const ddItems: DropdownItem[] = [
    { content: 'Мой профиль', type: 'link', href: '#' },
    { content: 'Мои заявки', type: 'link', href: '#' },
    { content: 'Мои проекты', type: 'link', href: '#' },
    { content: 'Навыки', type: 'link', href: '#' },
    { content: 'Выйти', type: 'button', action: () => console.log('выйти') },
  ];
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
