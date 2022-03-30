<template>
  <UserProjectRequestCard :editable="editable" />
  <UserProjectRequestCard :editable="editable" />
  <UserProjectRequestCard :editable="editable" />

  <div class="actions">
    <BaseButton
      v-if="editable"
      class="btn save-btn"
      case="uppercase"
      @click="onSave"
    >
      сохранить изменения
    </BaseButton>
    <BaseButton
      v-else
      class="btn edit-btn"
      variant="outlined"
      case="uppercase"
      @click="onToggleEdit"
    >
      Редактировать заявки
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
  import UserProjectRequestCard from './UserProjectRequestCard.vue';
  import BaseButton from './base/BaseButton.vue';
  import { ref } from 'vue';

  const editable = ref(false);

  function onToggleEdit() {
    editable.value = true;
  }
  function onSave() {
    console.log('save');
  }
</script>

<style scoped>
  .actions {
    display: flex;
  }

  .btn {
    margin-left: auto;
  }
  .edit-btn {
    width: 100%;
    max-width: 25rem;
  }
</style>
