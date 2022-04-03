<template>
  <UserProjectRequestCard
    v-for="projectRequest in participationsList"
    :key="projectRequest.id"
    :editable="editable"
    :project-request="projectRequest"
  />

  <div class="actions">
    <BaseButton v-if="editable" class="btn" case="uppercase" @click="onSave">
      сохранить изменения
    </BaseButton>
    <BaseButton
      v-if="editable"
      class="btn"
      case="uppercase"
      variant="outlined"
      @click="onCancelEdit"
    >
      отмена
    </BaseButton>
    <BaseButton
      v-if="!editable"
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
  import { ref } from 'vue';
  import { participationsList } from '@/models/mock/participation';
  import UserProjectRequestCard from './UserProjectRequestCard.vue';
  import BaseButton from './base/BaseButton.vue';

  const editable = ref(false);

  function onToggleEdit() {
    editable.value = true;
  }

  function onCancelEdit() {
    editable.value = false;
  }

  function onSave() {
    console.log('save');
  }
</script>

<style scoped>
  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }

  .edit-btn {
    width: 100%;
    max-width: 25rem;
  }
</style>
