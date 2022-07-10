<template>
  <BaseModal
    class="modal"
    :is-show="modalsStore.projectFilterModal"
    size="m"
    @close="modalsStore.projectFilterModal = false"
  >
    <ProjectListFilter />
  </BaseModal>
</template>

<script setup lang="ts">
  import { useModalsStore } from '@/stores/modals/useModalsStore';
  import { useAuthStore } from '@/stores/auth/useAuthStore';
  // components
  import BaseModal from '../ui/BaseModal.vue';
  import ProjectListFilter from './ProjectListFilter.vue';

  const modalsStore = useModalsStore();
</script>

<style lang="scss" scoped>
  @import '@styles/breakpoints.scss';

  .modal {
    @media (max-width: $mobile-s) {
      &:deep(.modal-content) {
        padding: 0;
      }

      &:deep(.filters) {
        border: none;
        padding: 0;
      }
    }
  }
</style>
