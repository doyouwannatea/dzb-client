<template>
  <div v-if="editableList">
    <Draggable v-model="editableList" v-bind="dragOptions" :move="onMove">
      <template #item="{ element }">
        <UserProjectRequestCard
          :editable="!dragOptions.disabled"
          :project-request="element"
          @delete="onRequestDeleteModalOpen"
        />
      </template>
    </Draggable>
  </div>
  <div v-if="authStore.loading">loading...</div>
  <div v-if="authStore.error">{{ authStore.error }}</div>

  <div class="actions">
    <BaseButton
      v-if="!dragOptions.disabled"
      class="btn"
      case="uppercase"
      @click="onSave"
    >
      сохранить изменения
    </BaseButton>
    <BaseButton
      v-if="!dragOptions.disabled"
      class="btn"
      case="uppercase"
      variant="outlined"
      @click="onCancelEdit"
    >
      отмена
    </BaseButton>
    <BaseButton
      v-if="dragOptions.disabled"
      class="btn edit-btn"
      variant="outlined"
      case="uppercase"
      @click="onToggleEdit"
    >
      Редактировать заявки
    </BaseButton>
  </div>
  <RequestDeleteModal
    :is-show="deleteRequestModalShow"
    :request="currentDeleteable"
    @close="deleteRequestModalShow = false"
    @delete-request="onDeleteRequest"
  />
</template>

<script setup lang="ts">
  import Draggable from 'vuedraggable';
  import { ref, watch } from 'vue';
  import UserProjectRequestCard from './UserProjectRequestCard.vue';
  import BaseButton from './base/BaseButton.vue';
  import { Participation } from '@/models/Participation';
  import { deleteByKey, deepClone } from '@/helpers/array';
  import { useAuthStore } from '@/stores/auth';
  import RequestDeleteModal from './RequestDeleteModal.vue';

  const authStore = useAuthStore();

  const currentDeleteable = ref<Participation | undefined>(undefined);
  const deleteRequestModalShow = ref(false);
  const editableList = ref<Participation[] | undefined>(undefined);

  watch(
    () => authStore.requestsList,
    () => (editableList.value = deepClone(authStore.requestsList)),
    { immediate: true },
  );

  const dragOptions = ref({
    animation: 200,
    disabled: true,
    ghostClass: 'ghost',
    itemKey: 'id',
    tag: 'transition-group',
  });

  function onToggleEdit() {
    dragOptions.value.disabled = false;
  }

  function onCancelEdit() {
    dragOptions.value.disabled = true;
    editableList.value = deepClone(authStore.requestsList);
  }

  function onSave() {
    dragOptions.value.disabled = true;
    authStore.requestsList = editableList.value;
  }

  function onRequestDeleteModalOpen(request: Participation) {
    deleteRequestModalShow.value = true;
    currentDeleteable.value = request;
  }

  function onDeleteRequest(request: Participation) {
    if (editableList.value) {
      editableList.value = deleteByKey(editableList.value, 'id', request.id);
    }
  }

  function onMove(evt: any) {
    if (editableList.value) {
      const index: number = evt.draggedContext.index;
      const futureIndex: number = evt.draggedContext.futureIndex;
      const priority = editableList.value[index].priority;
      const futurePriority = editableList.value[futureIndex].priority;

      editableList.value[index].priority = futurePriority;
      editableList.value[futureIndex].priority = priority;
    }
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
