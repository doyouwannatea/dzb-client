<template>
  <!-- succsess modal -->
  <BaseModal
    :is-show="modalsStore.participationSuccessModal"
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
          :to="{ name: RouteNames.CANDIDATE_PARTICIPATIONS }"
          variant="inline-link"
          @click="closeModal"
        >
          «Мои заявки»</BaseButton
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
          :to="{ name: RouteNames.CANDIDATE_PARTICIPATIONS }"
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
  import { useModalsStore } from '@/stores/modals/useModalsStore';
  import BaseButton from '../ui/BaseButton.vue';
  import BaseModal from '../ui/BaseModal.vue';

  const modalsStore = useModalsStore();

  function closeModal() {
    modalsStore.participationSuccessModal = false;
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
