<template>
  <!-- auth modal -->
  <BaseModal
    :is-show="authStore.authModalShow"
    @close="authStore.authModalShow = false"
  >
    <!-- MAIN CONTENT -->
    <div class="success-modal">
      <h1>Вы не авторизованы</h1>
      <p class="message">
        Чтобы подавать заявки на проект, вам необходимо войти в свой профиль
        через систему “Кампус”.
      </p>
      <div class="modal-buttons">
        <BaseButton
          case="uppercase"
          @click="
            authStore.auth();
            authStore.authModalShow = false;
          "
        >
          войти через кампус
        </BaseButton>
      </div>
    </div>
    <!-- MAIN CONTENT -->
  </BaseModal>
</template>

<script setup lang="ts">
  import BaseModal from './base/BaseModal.vue';
  import BaseButton from './base/BaseButton.vue';
  import { useAuthStore } from '@/stores/auth/useAuthStore';

  const authStore = useAuthStore();
</script>

<style scoped>
  .success-modal {
    text-align: center;
  }

  .message {
    margin-top: 1.5625rem;
  }

  .modal-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2.1875rem;
  }
</style>
