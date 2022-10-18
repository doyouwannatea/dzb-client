<template>
  <!-- auth modal -->
  <BaseModal
    :is-show="modalsStore.selectedProjectModal"
    @close="modalsStore.selectedProjectModal = false"
  >
    <!-- MAIN CONTENT -->
    <div class="modal-content">
      <h1>Вы уже подали заявку на этот проект</h1>
      <div class="modal-buttons">
        <BaseButton
          case="uppercase"
          @click="modalsStore.selectedProjectModal = false"
        >
          Понятно
        </BaseButton>
      </div>
    </div>
    <!-- MAIN CONTENT -->
  </BaseModal>
</template>

<script setup lang="ts">
  import { useModalsStore } from '@/stores/modals/useModalsStore';
  // components
  import BaseModal from '../ui/BaseModal.vue';
  import BaseButton from '../ui/BaseButton.vue';

  const modalsStore = useModalsStore();
</script>

<style scoped>
  .modal-content {
    text-align: center;
  }

  .modal-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2.1875rem;
  }
</style>
