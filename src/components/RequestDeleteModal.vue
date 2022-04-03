<template>
  <!-- delete request modal -->
  <BaseModal :is-show="isShow" @close="$emit('close')">
    <!-- MAIN CONTENT -->
    <div class="delete-request-modal">
      <h1>Вы действительно хотите отозвать заявку с проекта?</h1>
      <p class="subtitle">
        Отозвав заявку вы потеряете своё место в очереди на проект
      </p>
      <div class="actions">
        <BaseButton
          class="delete-btn"
          case="uppercase"
          variant="outlined"
          @click="onDeleteRequest"
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
  import BaseButton from './base/BaseButton.vue';
  import BaseModal from './base/BaseModal.vue';

  type Props = {
    isShow: boolean;
    request?: Participation;
  };
  type Emits = {
    (e: 'close'): void;
    (e: 'delete-request', request: Participation): void;
  };
  const props = defineProps<Props>();
  const emits = defineEmits<Emits>();

  function onDeleteRequest() {
    if (props.request) {
      emits('delete-request', props.request);
    }
    emits('close');
  }
</script>

<style scoped>
  .delete-request-modal {
    text-align: center;
  }

  .subtitle {
    margin-top: 0.75rem;
    font-size: 1.125rem;
    padding: 0 5rem;
  }
  .actions {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    margin-top: 2.5rem;
  }

  .delete-btn {
    --background-color: var(--red-color-1);
    --hover-color: var(--red-color-1);
    --active-color: var(--red-color-2);
  }
</style>
