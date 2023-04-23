<template>
  <BaseModal size="m" :is-show="props.isShow" @close="onCloseModal">
    <h2>Причина отклонения заявки</h2>

    <p :class="$style.reason">
      <template v-if="props.reason">
        {{ props.reason }}
      </template>
      <template v-else>
        <b>Заявка на проект была отклонена без указания причины.</b>
      </template>
    </p>

    <div :class="$style.actions">
      <slot name="actions">
        <BaseButton variant="primary" @click="onCloseModal">Закрыть</BaseButton>
      </slot>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
  import BaseButton from '../ui/BaseButton.vue';
  import BaseModal from '../ui/BaseModal.vue';

  type Props = {
    isShow: boolean;
    reason?: string;
  };
  type Emits = {
    (event: 'update:isShow', isShow: boolean): void;
  };

  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();

  function onCloseModal() {
    emit('update:isShow', false);
  }
</script>

<style module lang="scss">
  .actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    margin-top: 2.75rem;
  }

  .reason {
    margin-top: 3.125rem;
    white-space: pre-wrap;
  }
</style>
