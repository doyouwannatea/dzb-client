<template>
  <!-- CONTENT -->
  <section>
    <!-- STUB -->
    <UserParticipationListStub
      v-if="!participationsStore.listNotEmpty && !participationsStore.loading"
    />
    <!-- STUB -->

    <!-- LOADING -->
    <LoadingParticipationsList
      v-if="participationsStore.loading && !participationsStore.listNotEmpty"
    />
    <!-- LOADING -->

    <!-- ERROR -->
    <div v-if="participationsStore.error">{{ participationsStore.error }}</div>
    <!-- ERROR -->

    <!-- PARTICIPATION LIST -->
    <template v-if="participationsStore.listNotEmpty">
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

      <footer class="footer">
        <p v-if="!dragDisabled" class="info">
          <img class="cursor-icon" :src="cursorIconUrl" alt="" />
          для изменения приоритета зажмите и перетащите карточку заявки в поле
          другого приоритета
        </p>
        <div class="actions">
          <BaseButton
            v-if="!dragDisabled"
            class="btn"
            case="uppercase"
            :disabled="participationsStore.loading"
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
            :disabled="participationsStore.loading"
            @click="onCancelEdit"
          >
            отмена
          </BaseButton>
          <BaseButton
            v-if="dragDisabled"
            class="btn edit-btn"
            variant="outlined"
            case="uppercase"
            :disabled="participationsStore.loading"
            @click="
              authStore.profileData?.canSendParticipations
                ? onToggleEdit()
                : modalsStore.openEditDisableModal()
            "
          >
            Редактировать заявки
          </BaseButton>
        </div>
      </footer>
    </template>
    <!-- PARTICIPATION LIST -->
  </section>
  <!-- CONTENT -->

  <ParticipationDeleteModal
    :is-show="deleteParticipationModalShow"
    :participation="currentDeleteableParticipation"
    @close="deleteParticipationModalShow = false"
    @delete-participation="deleteParticipation"
  />
</template>

<script setup lang="ts">
  import Draggable from 'vuedraggable';
  import { ref, watch, computed } from 'vue';
  import {
    Participation,
    Priority,
    ALL_PRIORITIES,
    ParticipationWithProject,
  } from '@/models/Participation';
  import { immutableSort } from '@/helpers/array';
  import { useParticipationsStore } from '@/stores/participations/useParticipationsStore';
  import { useMobileS } from '@/helpers/breakpoints';
  import cursorIconUrl from '@/assets/icons/cursor.svg?url';
  // components
  import ParticipationCard from '@/components/participation/ParticipationCard.vue';
  import UserParticipationListStub from './UserParticipationListStub.vue';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import ParticipationDeleteModal from '@/components/participation/ParticipationDeleteModal.vue';
  import LoadingParticipationsList from '@/pages/UserPage/LoadingParticipationsList.vue';
  import { useModalsStore } from '@/stores/modals/useModalsStore';
  import { useAuthStore } from '@/stores/auth/useAuthStore';

  type EditableListItem = {
    order: number;
    content?: ParticipationWithProject;
  };

  const isMobile = useMobileS();
  const modalsStore = useModalsStore();
  const authStore = useAuthStore();
  const dragOptions = computed(() => ({
    animation: 200,
    delay: isMobile.value ? 300 : 0,
    forceFallback: true,
    fallbackOnBody: true,
    scrollSpeed: 20,
    ghostClass: 'ghost',
    itemKey: 'order',
    tag: 'transition-group',
  }));

  const participationsStore = useParticipationsStore();

  const deleteParticipationModalShow = ref(false);
  const dragDisabled = ref(true);
  const currentDeleteableParticipation = ref<
    ParticipationWithProject | undefined
  >(undefined);
  const editableParticipationList = ref<EditableListItem[]>([]);

  watch(() => participationsStore.participationList, initEditableList, {
    deep: true,
    immediate: true,
  });

  function initEditableList() {
    if (participationsStore.participationList) {
      editableParticipationList.value = [];
      const existingPriorities = new Set<number>();

      for (const participation of participationsStore.participationList) {
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
      participationsStore.updateParticipationsPriorities(participations);
    }
  }

  function openDeleteModal(participation: Participation) {
    deleteParticipationModalShow.value = true;
    currentDeleteableParticipation.value = participation;
  }

  function deleteParticipation(participation: Participation) {
    if (editableParticipationList.value) {
      participationsStore.deleteParticipation(participation.id);
    }
  }
</script>

<style lang="scss" scoped>
  @import '@styles/breakpoints.scss';

  .footer {
    display: flex;
    gap: 0.5rem;
    align-items: flex-start;
    justify-content: flex-end;

    @media (max-width: $mobile-s) {
      flex-direction: column;
    }
  }

  .actions {
    display: flex;
    gap: 0.5rem;

    @media (max-width: $mobile-s) {
      width: 100%;
    }
  }

  .edit-btn {
    width: 100%;
    max-width: 25rem;

    @media (max-width: $mobile-s) {
      max-width: unset;
      width: 100%;
    }
  }

  .info {
    display: flex;
    gap: 0.625rem;
    align-items: center;

    line-height: 150%;
    color: var(--gray-color-2);

    @media (max-width: $mobile-s) {
      margin-bottom: 1.25rem;
    }
  }

  .cursor-icon {
    width: 1.5rem;
    height: 1.5rem;
    aspect-ratio: 1 / 1;
  }
</style>
