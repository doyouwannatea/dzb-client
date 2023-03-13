<template>
  <BaseModal
    :is-show="Boolean(modalsStore.confirmModalTitle)"
    @close="modalsStore.closeConfirmModal()"
  >
    <!-- MAIN CONTENT -->
    <div class="modal-content">
      <h1>{{ modalsStore.confirmModalTitle }}</h1>
      <div class="modal-buttons">
        <BaseButton
          case="uppercase"
          @click="modalsStore.confirmModalDisagreeAction"
        >
          {{ modalsStore.confirmModalDisagree }}
        </BaseButton>
        <BaseButton
          case="uppercase"
          variant="outlined"
          @click="modalsStore.confirmModalAgreeAction"
        >
          {{ modalsStore.confirmModalAgree }}
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

<style lang="scss" scoped>
  .modal-content {
    text-align: center;
  }

  .modal-buttons {
    display: flex;
    gap: 1.375rem;
    align-items: center;
    justify-content: center;
    margin-top: 2.1875rem;
  }
</style>
