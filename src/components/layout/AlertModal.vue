<template>
  <!-- auth modal -->
  <BaseModal
    :is-show="Boolean(modalsStore.alertModalTitle)"
    @close="modalsStore.closeAlertModal()"
  >
    <!-- MAIN CONTENT -->
    <div class="modal-content">
      <h1>{{ modalsStore.alertModalTitle }}</h1>
      <p class="subtitle">{{ modalsStore.alertModalSubtitle }}</p>
      <div class="modal-buttons">
        <BaseButton case="uppercase" @click="modalsStore.closeAlertModal()">
          {{ buttonText }}
        </BaseButton>
      </div>
    </div>
    <!-- MAIN CONTENT -->
  </BaseModal>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { getRandomIntInclusive } from '@/helpers/number';
  import { useModalsStore } from '@/stores/modals/useModalsStore';
  import BaseButton from '../ui/BaseButton.vue';
  import BaseModal from '../ui/BaseModal.vue';

  const modalsStore = useModalsStore();
  const buttonTextVariants = ['Понятно', 'Ясно', 'Хорошо', 'Закрыть'];
  const buttonText = ref('');

  watch(
    () => modalsStore.alertModalTitle,
    () => {
      buttonText.value =
        buttonTextVariants[
          getRandomIntInclusive(0, buttonTextVariants.length - 1)
        ];
    },
    { immediate: true },
  );
</script>

<style lang="scss" scoped>
  .modal-content {
    text-align: center;
  }

  .modal-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2.1875rem;
  }

  .subtitle {
    margin-top: 0.75rem;
    font-size: 1.125rem;

    &:empty {
      margin: 0;
    }
  }
</style>
