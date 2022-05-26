<template>
  <div v-if="authStore.isParticipationList">
    <Draggable
      v-model="editableParticipationList"
      v-bind="dragOptions"
      :disabled="dragDisabled"
      :move="onMove"
    >
      <template #item="{ element, index }">
        <ParticipationCard
          :key="element.order"
          :editable="!dragDisabled"
          :priority="index + 1"
          :participation="element.content"
          :project="element.content?.project"
          @delete="openDeleteModal"
        />
      </template>
    </Draggable>
  </div>
  <UserParticipationListStub v-else />
  <div v-if="authStore.loading">loading...</div>
  <div v-if="authStore.error">{{ authStore.error }}</div>

  <div v-if="authStore.isParticipationList" class="actions">
    <p v-if="!dragDisabled" class="info">
      <img class="cursor-icon" :src="cursorIconUrl" alt="" />
      для изменения приоритета зажмите и перетащите карточку заявки в поле
      другого приоритета
    </p>
    <div class="buttons">
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
  </div>
  <ParticipationDeleteModal
    :is-show="deleteParticipationModalShow"
    :participation="currentDeleteableParticipation"
    @close="deleteParticipationModalShow = false"
    @delete-participation="deleteParticipation"
  />
</template>

<script setup lang="ts">
  import Draggable from 'vuedraggable';
  import { ref, watch } from 'vue';
  import {
    Participation,
    Priority,
    ALL_PRIORITIES,
    ParticipationWithProject,
  } from '@/models/Participation';
  import { immutableSort } from '@/helpers/array';
  import { useAuthStore } from '@/stores/auth/useAuthStore';
  import cursorIconUrl from '@/assets/icons/cursor.svg?url';
  // components
  import ParticipationCard from '@/components/participation/ParticipationCard.vue';
  import UserParticipationListStub from './UserParticipationListStub.vue';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import ParticipationDeleteModal from '@/components/participation/ParticipationDeleteModal.vue';

  type EditableListItem = {
    order: number;
    content?: ParticipationWithProject;
  };

  const dragOptions = {
    animation: 200,
    ghostClass: 'ghost',
    itemKey: 'order',
    tag: 'transition-group',
  };

  const authStore = useAuthStore();

  const deleteParticipationModalShow = ref(false);
  const dragDisabled = ref(true);
  const currentDeleteableParticipation = ref<
    ParticipationWithProject | undefined
  >(undefined);
  const editableParticipationList = ref<EditableListItem[]>([]);

  watch(() => authStore.participationList, initEditableList, {
    deep: true,
    immediate: true,
  });

  function initEditableList() {
    if (authStore.participationList) {
      editableParticipationList.value = [];
      const existingPriorities = new Set<number>();

      for (const participation of authStore.participationList) {
        editableParticipationList.value.push({
          order: participation.priority,
          content: participation,
        });
        existingPriorities.add(participation.priority);
      }

      const missingPriorities = ALL_PRIORITIES.filter(
        (priority) => !existingPriorities.has(priority),
      );

      for (const priority of missingPriorities) {
        editableParticipationList.value.push({
          order: priority,
        });
      }

      editableParticipationList.value = immutableSort(
        editableParticipationList.value,
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
    if (editableParticipationList.value) {
      const participations: ParticipationWithProject[] = [];
      for (const [index, item] of editableParticipationList.value.entries()) {
        if (item.content)
          participations.push({
            ...item.content,
            priority: (index + 1) as Priority,
          });
      }
      authStore.updateParticipationsPriorities(participations);
    }
  }

  function openDeleteModal(participation: Participation) {
    deleteParticipationModalShow.value = true;
    currentDeleteableParticipation.value = participation;
  }

  function deleteParticipation(participation: Participation) {
    if (editableParticipationList.value) {
      authStore.deleteParticipation(participation.id);
    }
  }
</script>

<style scoped>
  .actions {
    display: flex;
    gap: 0.5rem;
    align-items: flex-start;
    justify-content: flex-end;
  }

  .buttons {
    display: flex;
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
