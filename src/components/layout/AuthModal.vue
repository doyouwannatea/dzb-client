<template>
  <!-- auth modal -->
  <BaseModal
    :is-show="modalsStore.authModal"
    @close="modalsStore.authModal = false"
  >
    <!-- MAIN CONTENT -->
    <div class="success-modal">
      <h1>Вы не авторизованы</h1>
      <p class="message">
        Чтобы подавать заявки на проекты, Вам необходимо войти в свой профиль
        через систему «Кампус»
      </p>
      <div class="modal-buttons">
        <BaseButton case="uppercase" @click="auth">
          войти через кампус
        </BaseButton>
      </div>
    </div>
    <!-- MAIN CONTENT -->
  </BaseModal>
</template>

<script setup lang="ts">
  import { useModalsStore } from '@/stores/modals/useModalsStore';
  import BaseModal from '../ui/BaseModal.vue';
  import BaseButton from '../ui/BaseButton.vue';
  import { useAuthMutation } from '@/api/AuthApi/hooks/useAuthMutation';
  import { useToast } from 'vue-toastification';

  const toast = useToast();
  const modalsStore = useModalsStore();
  const authMutation = useAuthMutation({ onError });

  function auth() {
    modalsStore.authModal = false;
    authMutation.mutate();
  }

  function onError(error: unknown) {
    toast.error(String(error));
  }
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
