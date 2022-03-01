<template>
  <!-- auth modal -->
  <BaseModal :is-show="props.isShow" @close="emit('close')">
    <!-- MAIN CONTENT -->
    <div class="success-modal">
      <h1 class="title">Вы не авторизованы</h1>
      <p class="message">
        Чтобы подавать заявки на проект, вам необходимо войти в свой профиль
        через систему “Кампус”.
      </p>
      <div class="modal-buttons">
        <BaseButton>войти через кампус</BaseButton>
      </div>
    </div>
    <!-- MAIN CONTENT -->
  </BaseModal>
</template>

<script setup lang="ts">
  import { withDefaults } from 'vue';
  import BaseModal from './base/BaseModal.vue';
  import BaseButton from './base/BaseButton.vue';

  type Props = { isShow: boolean };
  type Emits = { (e: 'close'): void };

  const props = withDefaults(defineProps<Props>(), { isShow: false });
  const emit = defineEmits<Emits>();
</script>

<style scoped>
  .title {
    margin-top: 2.8125rem;
  }

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
