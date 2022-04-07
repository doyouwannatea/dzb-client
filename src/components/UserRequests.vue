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
      @click="onCancelEdit"
    >
      отмена
    </BaseButton>
    <BaseButton
      v-if="dragDisabled"
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
    :request="currentDeleteableRequest"
    @close="deleteRequestModalShow = false"
    @delete-request="deleteRequest"
  />
</template>

<script setup lang="ts">
  import Draggable from 'vuedraggable';
  import { onBeforeMount, ref } from 'vue';
  import UserProjectRequestCard from './ProjectRequestCard.vue';
  import BaseButton from './base/BaseButton.vue';
  import { Participation } from '@/models/Participation';
  import { immutableSort } from '@/helpers/array';
  import { useAuthStore } from '@/stores/auth/useAuthStore';
  import RequestDeleteModal from './RequestDeleteModal.vue';
  import campusAuthApi from '@/api/CampusAuthApi';
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

  onBeforeMount(initEditableList);

  function initEditableList() {
    if (authStore.requestsList?.length) {
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
    editableRequestsList.value = [];
    initEditableList();
  }

  function onMove(event: any) {
    if (!event.draggedContext.element.content) return false;
  }

  function onSave() {
    dragDisabled.value = true;
    if (editableRequestsList.value) {
      for (const [index, item] of editableRequestsList.value.entries()) {
        if (item.content)
          campusAuthApi.setParticipationPriority(item.content.id, index + 1);
      }
    }
  }

  function openDeleteModal(request: Participation) {
    deleteRequestModalShow.value = true;
    currentDeleteableRequest.value = request;
  }

  function deleteRequest(request: Participation) {
    if (editableRequestsList.value) {
      const idx = editableRequestsList.value.findIndex(
        (item) => item.content?.id === request.id,
      );
      editableRequestsList.value = [
        ...editableRequestsList.value.slice(0, idx),
        ...editableRequestsList.value.slice(idx + 1),
      ];
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
