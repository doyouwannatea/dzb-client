<template>
  <div v-if="authStore.requestsList && authStore.requestsList.length > 0">
    <Draggable
      v-model="editableRequestsList"
      v-bind="dragOptions"
      :disabled="dragDisabled"
      :move="onMove"
    >
      <template #item="{ element, index }">
        <UserProjectRequestCard
          :key="element.order"
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

  <div
    v-if="authStore.requestsList && authStore.requestsList.length > 0"
    class="actions"
  >
    <p v-if="!dragDisabled" class="info">
      <img class="cursor-icon" :src="cursorIconUrl" alt="" />
      для изменения приоритета зажмите и перетащите карточку заявки в поле
      другого приоритета
    </p>
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
  import { Participation, Priority } from '@/models/Participation';
  import { immutableSort } from '@/helpers/array';
  import { useAuthStore } from '@/stores/auth/useAuthStore';
  import RequestDeleteModal from './RequestDeleteModal.vue';
  import UserProjectRequestsStub from './UserProjectRequestsStub.vue';
  import { ALL_PRIORITIES } from '@/models/values/project-priority';
  import cursorIconUrl from '@/assets/icons/cursor.svg?url';

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
      const participations: { id: number; priority: Priority }[] = [];
      for (const [index, item] of editableRequestsList.value.entries()) {
        if (item.content)
          participations.push({
            id: item.content.id,
            priority: (index + 1) as Priority,
          });
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
    align-items: flex-start;
    gap: 0.5rem;
  }

  .edit-btn {
    width: 100%;
    max-width: 25rem;
  }

  .info {
    display: flex;
    gap: 0.625rem;
    align-items: center;

    line-height: 150%;
    color: var(--gray-color-2);
  }

  .cursor-icon {
    width: 1.5rem;
    height: 1.5rem;
    aspect-ratio: 1 / 1;
  }
</style>
