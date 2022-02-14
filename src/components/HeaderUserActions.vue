<template>
  <div class="actions">
    <button class="ring-btn">
      <RingIcon />
    </button>
    <div class="user">
      <UserPicture />
      <span class="username">Иванов Иван Иванович</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import RingIcon from '../assets/icons/ring.svg';
  import UserPicture from '../assets/icons/user-picture.svg';
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
