<template>
  <div v-if="editableRequestsList.length > 0">
    <Draggable
      v-model="editableRequestsList"
      v-bind="dragOptions"
      :disabled="dragDisabled"
      :move="onMove"
    >
      <template #item="{ element, index }">
        <UserProjectRequestCard
          :editable="!dragDisabled"
          :priority="index + 1"
          :project-request="element.content"
          @delete="openDeleteModal"
        />
      </template>
    </Draggable>
  </div>
  <UserProjectRequestsStub v-else />
  <div v-if="authStore.loading">loading...</div>
  <div v-if="authStore.error">{{ authStore.error }}</div>

  <div v-if="editableRequestsList.length > 0" class="actions">
    <BaseButton
      v-if="!dragDisabled"
      class="btn"
      case="uppercase"
      :disabled="authStore.loading"
      @click="onSave"
    >
      сохранить изменения
    </BaseButton>
    <BaseButton
      v-if="!dragDisabled"
      class="btn"
      case="uppercase"
      variant="outlined"
      color="red"
      :disabled="authStore.loading"
      @click="onCancelEdit"
    >
      отмена
    </BaseButton>
    <BaseButton
      v-if="dragDisabled"
      class="btn edit-btn"
      variant="outlined"
      case="uppercase"
      :disabled="authStore.loading"
      @click="onToggleEdit"
    >
      Редактировать заявки
    </BaseButton>
  </div>
  <RequestDeleteModal
    :is-show="deleteRequestModalShow"
    :request="currentDeleteableRequest"
    @close="deleteRequestModalShow = false"
    @delete-request="deleteRequest"
  />
</template>

<script setup lang="ts">
  import Draggable from 'vuedraggable';
  import { ref, watch } from 'vue';
  import UserProjectRequestCard from './ProjectRequestCard.vue';
  import BaseButton from './base/BaseButton.vue';
  import { Participation } from '@/models/Participation';
  import { immutableSort } from '@/helpers/array';
  import { useAuthStore } from '@/stores/auth/useAuthStore';
  import RequestDeleteModal from './RequestDeleteModal.vue';
  import { ALL_PRIORITIES } from '@/models/values/participation-priority';
  import UserProjectRequestsStub from './UserProjectRequestsStub.vue';

  type EditableListItem = {
    order: number;
    content?: Participation;
  };

  const dragOptions = {
    animation: 200,
    ghostClass: 'ghost',
    itemKey: 'order',
    tag: 'transition-group',
  };

  const authStore = useAuthStore();

  const deleteRequestModalShow = ref(false);
  const dragDisabled = ref(true);
  const currentDeleteableRequest = ref<Participation | undefined>(undefined);
  const editableRequestsList = ref<EditableListItem[]>([]);

  watch(() => authStore.requestsList, initEditableList, {
    deep: true,
    immediate: true,
  });

  function initEditableList() {
    if (authStore.requestsList) {
      editableRequestsList.value = [];
      const existingPriorities = new Set<number>();

      for (const request of authStore.requestsList) {
        editableRequestsList.value.push({
          order: request.priority,
          content: request,
        });
        existingPriorities.add(request.priority);
      }

      const missingPriorities = ALL_PRIORITIES.filter(
        (priority) => !existingPriorities.has(priority),
      );

      for (const priority of missingPriorities) {
        editableRequestsList.value.push({
          order: priority,
        });
      }

      editableRequestsList.value = immutableSort(
        editableRequestsList.value,
        'ASC',
        'order',
      );
    }
  }

  function onToggleEdit() {
    dragDisabled.value = false;
  }

  function onCancelEdit() {
    dragDisabled.value = true;
    initEditableList();
  }

  function onMove(event: any) {
    if (!event.draggedContext.element.content) return false;
  }

  function onSave() {
    dragDisabled.value = true;
    if (editableRequestsList.value) {
      const participations: { id: number; priority: number }[] = [];
      for (const [index, item] of editableRequestsList.value.entries()) {
        if (item.content)
          participations.push({ id: item.content.id, priority: index + 1 });
      }
      authStore.updateParticipationsPriorities(participations);
    }
  }

  function openDeleteModal(request: Participation) {
    deleteRequestModalShow.value = true;
    currentDeleteableRequest.value = request;
  }

  function deleteRequest(request: Participation) {
    if (editableRequestsList.value) {
      authStore.deleteParticipation(request.id);
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
