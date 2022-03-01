<template>
  <!-- succsess modal -->
  <BaseModal :is-show="props.isShow" @close="emit('close')">
    <!-- MAIN CONTENT -->
    <div class="success-modal">
      <h1 class="title">Успех!</h1>
      <p class="message">
        Ваша заявка на участие в проекте отправлена. <br />
        Вы можете изменять и отслеживать её в разделе <br />
        <BaseButton
          is="router-link"
          :to="{ name: RouteNames.HOME }"
          variant="inline-link"
        >
          “Мои заявки”</BaseButton
        >.
      </p>
      <div class="modal-buttons">
        <BaseButton>назад к списку</BaseButton>
        <BaseButton variant="link">Мои заявки</BaseButton>
      </div>
    </div>
    <!-- MAIN CONTENT -->
  </BaseModal>
</template>

<script setup lang="ts">
  import { withDefaults } from 'vue';
  import { RouteNames } from '@/router/types/route-names';
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
