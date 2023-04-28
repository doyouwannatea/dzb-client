<template>
  <BaseModal size="m" :is-show="props.isShow" @close="onCloseModal">
    <h2>Причина отклонения заявки</h2>

    <BaseTextarea
      v-model="reasonRef"
      :class="$style.textarea"
      :disabled="props.isLoading"
      placeholder="Опишите причину отклонения заявки"
    />

    <div :class="$style.actions">
      <BaseButton variant="primary" @click="onCloseModal">Закрыть</BaseButton>

      <BaseButton
        color="red"
        variant="primary"
        :disabled="props.isLoading"
        @click="onReject"
      >
        Отклонить
      </BaseButton>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import BaseButton from '../ui/BaseButton.vue';
  import BaseModal from '../ui/BaseModal.vue';
  import BaseTextarea from '../ui/BaseTextarea.vue';

  type Props = {
    isShow: boolean;
    isLoading: boolean;
    reason?: string;
  };
  type Emits = {
    (event: 'update:isShow', isShow: boolean): void;
    (event: 'reject', reason: string): void;
  };

  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();

  const reasonRef = ref(props.reason || '');

  function onCloseModal() {
    if (props.reason) reasonRef.value = props.reason;
    emit('update:isShow', false);
  }
  function onReject() {
    emit('reject', reasonRef.value);
  }
</script>

<style module lang="scss">
  .actions {
    display: flex;
    gap: 0.8125rem;
    justify-content: flex-end;
    margin-top: 1.375rem;
  }

  .textarea {
    min-height: 22.9375rem;
    margin-top: 1.875rem;
  }
</style>
