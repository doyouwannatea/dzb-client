<template>
  <!-- delete participation modal -->
  <BaseModal :is-show="isShow" @close="$emit('close')">
    <!-- MAIN CONTENT -->
    <div class="delete-participation-modal">
      <h1>Вы действительно хотите отозвать заявку с проекта?</h1>
      <p class="subtitle">
        Отозвав заявку вы потеряете своё место в очереди на проект
      </p>
      <div class="actions">
        <BaseButton
          class="delete-btn"
          case="uppercase"
          variant="outlined"
          color="red"
          @click="onDeleteParticipation"
        >
          удалить заявку
        </BaseButton>
        <BaseButton case="uppercase" @click="$emit('close')">отмена</BaseButton>
      </div>
    </div>
    <!-- MAIN CONTENT -->
  </BaseModal>
</template>

<script setup lang="ts">
  import { Participation } from '@/models/Participation';
  // components
  import BaseModal from '../ui/BaseModal.vue';
  import BaseButton from '../ui/BaseButton.vue';

  type Props = {
    isShow: boolean;
    participation?: Participation;
  };
  type Emits = {
    (e: 'close'): void;
    (e: 'delete-participation', participation: Participation): void;
  };
  const props = defineProps<Props>();
  const emits = defineEmits<Emits>();

  function onDeleteParticipation() {
    if (props.participation) {
      emits('delete-participation', props.participation);
    }
    emits('close');
  }
</script>

<style lang="scss" scoped>
  @import '@styles/breakpoints.scss';

  .delete-participation-modal {
    text-align: center;
  }

  .subtitle {
    padding: 0 5rem;
    margin-top: 0.75rem;
    font-size: 1.125rem;

    @media (max-width: $mobile-s) {
      padding: 0;
    }
  }
  .actions {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    margin-top: 2.5rem;
  }
</style>
