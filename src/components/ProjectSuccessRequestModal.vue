<template>
  <!-- succsess modal -->
  <BaseModal
    :is-show="authStore.successParticipationCreate"
    @close="closeModal"
  >
    <!-- MAIN CONTENT -->
    <div class="success-modal">
      <h1>Успех!</h1>
      <p class="message">
        Ваша заявка на участие в проекте отправлена. <br />
        Вы можете изменять и отслеживать её в разделе <br />
        <BaseButton
          is="router-link"
          :to="{ name: RouteNames.USER_REQUESTS }"
          variant="inline-link"
          @click="closeModal"
        >
          “Мои заявки”</BaseButton
        >.
      </p>
      <div class="modal-buttons">
        <BaseButton
          is="router-link"
          case="uppercase"
          :to="{ name: RouteNames.HOME }"
          @click="closeModal"
        >
          к списку проектов
        </BaseButton>
        <BaseButton
          is="router-link"
          case="uppercase"
          :to="{ name: RouteNames.USER_REQUESTS }"
          variant="link"
          @click="closeModal"
        >
          Мои заявки
        </BaseButton>
      </div>
    </div>
    <!-- MAIN CONTENT -->
  </BaseModal>
</template>

<script setup lang="ts">
  import { RouteNames } from '@/router/types/route-names';
  import BaseModal from './base/BaseModal.vue';
  import BaseButton from './base/BaseButton.vue';
  import { useAuthStore } from '@/stores/auth/useAuthStore';

  const authStore = useAuthStore();

  function closeModal() {
    authStore.successParticipationCreate = false;
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
