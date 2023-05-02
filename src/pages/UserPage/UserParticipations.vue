<template>
  <!-- CONTENT -->
  <section v-if="authStore.profileData && isCandidate(authStore.profileData)">
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
      <!-- <div> нужен для DnD -->
      <div>
        <Draggable
          v-model="editableParticipationListRef"
          v-bind="dragOptions"
          tag="transition-group"
          :disabled="dragDisabled"
          :move="onMove"
          :group="{ name: 'participations', put: onPutIntoEditableList }"
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

      <Draggable
        v-model="editableAutoParticipationListRef"
        v-bind="dragOptions"
        :disabled="dragDisabled"
        :move="onMove"
        :group="{ name: 'auto-participations', pull: true }"
        @change="onChangeAutoParticipationsList"
      >
        <template #item="{ element }">
          <ParticipationCard
            :key="element.order"
            :editable="!dragDisabled"
            :participation="element.content"
            :project="element.content?.project"
            :priority="element.content?.priority"
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
            @click="onDisableDrag"
          >
            отмена
          </BaseButton>
          <BaseButton
            v-if="dragDisabled"
            class="btn edit-btn"
            variant="outlined"
            case="uppercase"
            :disabled="participationsStore.loading"
            @click="onEnableDrag"
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
    ParticipationPriority,
    ALL_PRIORITIES,
    ParticipationWithProject,
  } from '@/models/Participation';
  import { immutableArraySort } from '@/helpers/object';
  import { useParticipationsStore } from '@/stores/participations/useParticipationsStore';
  import { useSmallDevice } from '@/helpers/breakpoints';
  import cursorIconUrl from '@/assets/icons/cursor.svg?url';
  // components
  import ParticipationCard from '@/components/participation/ParticipationCard.vue';
  import UserParticipationListStub from './UserParticipationListStub.vue';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import ParticipationDeleteModal from '@/components/participation/ParticipationDeleteModal.vue';
  import LoadingParticipationsList from '@/pages/UserPage/LoadingParticipationsList.vue';
  import { useModalsStore } from '@/stores/modals/useModalsStore';
  import { useAuthStore } from '@/stores/auth/useAuthStore';
  import { isCandidate } from '@/helpers/typeCheck';
  import { isAutoParticipation } from '@/api/CandidateApi/utils/participations';

  type EditableListItem = {
    order: number;
    content?: ParticipationWithProject;
  };

  const isSmallDevice = useSmallDevice();
  const modalsStore = useModalsStore();
  const authStore = useAuthStore();
  const dragOptions = computed(() => ({
    animation: 200,
    delay: isSmallDevice.value ? 300 : 0,
    forceFallback: true,
    fallbackOnBody: true,
    scrollSpeed: 20,
    ghostClass: 'ghost',
    itemKey: 'order',
  }));

  const participationsStore = useParticipationsStore();

  const deleteParticipationModalShow = ref(false);
  const dragDisabled = ref(true);
  const currentDeleteableParticipation = ref<
    ParticipationWithProject | undefined
  >(undefined);
  const editableParticipationListRef = ref<EditableListItem[]>([]);
  const editableAutoParticipationListRef = ref<EditableListItem[]>([]);

  watch(
    () => participationsStore.participationList,
    (participationList) => {
      initList();
      if (
        participationList?.find((participation) =>
          isAutoParticipation(participation.priority),
        )
      ) {
        modalsStore.openAutoParticipationInfoModal();
      }
    },
    {
      deep: true,
      immediate: true,
    },
  );

  function editableParticipationsWithContent(
    list: EditableListItem[],
  ): EditableListItem[] {
    return list.filter((el) => el.content);
  }

  function initList() {
    if (!participationsStore.participationList) return;
    const editableParticipationList = createEditableList(
      participationsStore.participationList,
    );
    editableParticipationListRef.value = immutableArraySort(
      editableParticipationList.filter(
        ({ content }) =>
          content?.priority !== ParticipationPriority.AutoWithApplication &&
          content?.priority !== ParticipationPriority.AutoWithoutApplication,
      ),
      'ASC',
      'order',
    );
    editableAutoParticipationListRef.value = editableParticipationList.filter(
      ({ content }) =>
        content?.priority === ParticipationPriority.AutoWithApplication ||
        content?.priority === ParticipationPriority.AutoWithoutApplication,
    );
  }

  function createEditableList(
    participationList: ParticipationWithProject[],
  ): EditableListItem[] {
    const editableParticipationList: EditableListItem[] = [];
    const existingPriorities = new Set<number>();

    for (const participation of participationList) {
      editableParticipationList.push({
        order: participation.priority,
        content: participation,
      });
      existingPriorities.add(participation.priority);
    }

    const missingPriorities = ALL_PRIORITIES.filter(
      (priority) => !existingPriorities.has(priority),
    );

    for (const priority of missingPriorities) {
      editableParticipationList.push({
        order: priority,
      });
    }

    return editableParticipationList;
  }

  function onPutIntoEditableList() {
    return (
      editableParticipationsWithContent(editableParticipationListRef.value)
        .length < ALL_PRIORITIES.length
    );
  }

  function onChangeAutoParticipationsList() {
    const list = editableParticipationsWithContent(
      editableParticipationListRef.value,
    );
    editableParticipationListRef.value = list;
  }

  function onEnableDrag() {
    if (!authStore.profileData || !isCandidate(authStore.profileData)) return;
    if (!authStore.profileData.canSendParticipations) {
      modalsStore.openEditParticipationsDisabledModal();
      return;
    }
    dragDisabled.value = false;
  }

  function onDisableDrag() {
    dragDisabled.value = true;
    initList();
  }

  function onMove(event: any) {
    if (!event.draggedContext.element.content) return false;
  }

  function onSave() {
    dragDisabled.value = true;
    if (editableParticipationListRef.value) {
      const participations: ParticipationWithProject[] = [];
      // Основные заявки
      for (const [
        index,
        item,
      ] of editableParticipationListRef.value.entries()) {
        if (item.content)
          participations.push({
            ...item.content,
            priority: (index + 1) as ParticipationPriority,
          });
      }
      // Автоматически сгенерированные заявки
      for (const [
        index,
        item,
      ] of editableAutoParticipationListRef.value.entries()) {
        if (item.content)
          participations.push({
            ...item.content,
            priority: item.content.priority as ParticipationPriority,
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
    if (editableParticipationListRef.value) {
      participationsStore.deleteParticipation(participation.id);
    }
  }
</script>

<style lang="scss" scoped>
  @import '@styles/breakpoints';

  .footer {
    display: flex;
    gap: 0.5rem;
    align-items: flex-start;
    justify-content: flex-end;

    @media (max-width: $tablet) {
      flex-direction: column;
    }
  }

  .actions {
    display: flex;
    gap: 0.5rem;

    @media (max-width: $tablet) {
      flex-wrap: wrap;
      width: 100%;
    }
  }

  .edit-btn {
    width: 100%;
    max-width: 25rem;

    @media (max-width: $tablet) {
      width: 100%;
      max-width: unset;
    }
  }

  .info {
    display: flex;
    gap: 0.625rem;
    align-items: center;
    line-height: 150%;
    color: var(--gray-color-2);

    @media (max-width: $tablet) {
      margin-bottom: 1.25rem;
    }
  }

  .cursor-icon {
    width: 1.5rem;
    height: 1.5rem;
    aspect-ratio: 1 / 1;
  }
</style>
