<template>
  <!-- auth modal -->
  <BaseModal
    :is-show="modalsStore.wrongInstitutionModal"
    @close="modalsStore.wrongInstitutionModal = false"
  >
    <!-- MAIN CONTENT -->
    <div class="success-modal">
      <h1>Ошибка</h1>
      <p class="message">
        Вы не можете отправлять заявки на проекты другого института
      </p>
    </div>
    <div class="modal-buttons">
      <BaseButton
        case="uppercase"
        @click="modalsStore.wrongInstitutionModal = false"
      >
        закрыть окно
      </BaseButton>
    </div>
    <!-- MAIN CONTENT -->
  </BaseModal>
</template>

<script setup lang="ts">
  import { useModalsStore } from '@/stores/modals/useModalsStore';
  import { useAuthStore } from '@/stores/auth/useAuthStore';
  // components
  import BaseModal from '../ui/BaseModal.vue';
  import BaseButton from '../ui/BaseButton.vue';

  const modalsStore = useModalsStore();
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
