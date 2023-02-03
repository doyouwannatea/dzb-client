<template>
  <!-- auth modal -->
  <BaseModal
    :is-show="Boolean(modalsStore.understandModalTitle)"
    @close="modalsStore.understandModalTitle = undefined"
  >
    <!-- MAIN CONTENT -->
    <div class="modal-content">
      <h1>{{ modalsStore.understandModalTitle }}</h1>
      <p class="subtitle">{{ modalsStore.understandModalSubtitle }}</p>
      <div class="modal-buttons">
        <BaseButton
          case="uppercase"
          @click="modalsStore.understandModalTitle = undefined"
        >
          {{ buttonText }}
        </BaseButton>
      </div>
    </div>
    <!-- MAIN CONTENT -->
  </BaseModal>
</template>

<script setup lang="ts">
  import { watch, ref } from 'vue';
  import { useModalsStore } from '@/stores/modals/useModalsStore';
  import { getRandomIntInclusive } from '@/helpers/number';
  // components
  import BaseModal from '../ui/BaseModal.vue';
  import BaseButton from '../ui/BaseButton.vue';

  const modalsStore = useModalsStore();
  const buttonTextVariants = ['Понятно', 'Ясно', 'Хорошо', 'Закрыть'];
  const buttonText = ref('');

  watch(
    () => modalsStore.understandModalTitle,
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
