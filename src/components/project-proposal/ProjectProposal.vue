<template>
  <BasePanel class="card">
    <header class="header">
      <RouterLink
        class="title"
        :to="toProjectCreateRoute(props.projectProposal.id)"
      >
        {{ props.projectProposal.title }}
      </RouterLink>
      <ProjectProposalStatus
        class="status"
        :state="props.projectProposal.state"
      />
      <p class="subtitle">
        {{ props.projectProposal.goal }}
      </p>
    </header>
    <footer class="footer">
      <p class="subtitle">
        <template v-if="currentUserRoleList">
          Роли в проекте:
          <b
            v-for="(role, index) in currentUserRoleList"
            :key="role"
            class="user-role"
          >
            {{
              index === currentUserRoleList.length - 1 ? role : `${role},&nbsp;`
            }}
          </b>
        </template>
        <template v-else>Ваша роль в проекте не установлена</template>
      </p>
      <div class="actions">
        <BaseButton
          v-if="showDeleteButton"
          class="button-with-icon"
          color="red"
          variant="inline-link"
          @click="deleteDraft"
        >
          <span class="icon" v-html="trashIcon"></span>
          удалить черновик
        </BaseButton>

        <BaseButton
          v-if="showRejectionReasonButton"
          class="button-with-icon"
          variant="inline-link"
          @click="openRejectionModal"
        >
          <span class="icon" v-html="accentQuestionIcon"></span>
          узнать причину отклонения
        </BaseButton>

        <BaseButton
          is="router-link"
          v-if="showEditButton"
          class="button-with-icon"
          :to="toProjectCreateRoute(props.projectProposal.id)"
          variant="inline-link"
        >
          <span class="icon" v-html="penIcon"></span>
          редактировать заявку
        </BaseButton>

        <BaseButton
          is="router-link"
          v-else
          class="button-with-icon"
          :to="toProjectCreateRoute(props.projectProposal.id)"
          variant="inline-link"
        >
          <span class="icon" v-html="accentQuestionIcon"></span>
          подробнее
        </BaseButton>
      </div>
    </footer>
  </BasePanel>

  <ProjectProposalRejectionReasonModal
    v-model:is-show="showRejectionModal"
    :reason="props.projectProposal.rejection_reason"
  >
    <template #actions>
      <BaseButton
        v-if="showSaveAsDraftButton"
        :disabled="updateProjectProposalMutation.isLoading.value"
        variant="outlined"
        @click="saveAsDraft"
      >
        <template v-if="updateProjectProposalMutation.isLoading.value">
          сохранение...
        </template>
        <template v-else>сохранить как черновик</template>
      </BaseButton>
      <BaseButton variant="primary" @click="closeRejectionModal">
        Закрыть
      </BaseButton>
    </template>
  </ProjectProposalRejectionReasonModal>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import BasePanel from '@/components/ui/BasePanel.vue';
  import BaseButton from '@/components/ui/BaseButton.vue';
  import { toProjectCreateRoute, toProjectRoute } from '@/router/utils/routes';
  import ProjectProposalStatus from '@/components/project/ProjectProposalStatus.vue';
  import {
    CreatedProjectProposal,
    MemberRoleText,
    MemberRole,
    ProjectProposalStateId,
  } from '@/models/ProjectProposal';
  import { useAuthStore } from '@/stores/auth/useAuthStore';
  import trashIcon from '@/assets/icons/trash.svg?raw';
  import penIcon from '@/assets/icons/pen.svg?raw';
  import accentQuestionIcon from '@/assets/icons/accent-question-icon.svg?raw';
  import ProjectProposalRejectionReasonModal from './ProjectProposalRejectionReasonModal.vue';
  import { useModalsStore } from '@/stores/modals/useModalsStore';
  import { useUpdateProjectProposal } from '@/queries/useUpdateProjectProposal';
  import { TYPE, useToast } from 'vue-toastification';

  interface Props {
    projectProposal: CreatedProjectProposal;
  }

  const props = defineProps<Props>();
  const authStore = useAuthStore();
  const modalsStore = useModalsStore();
  const toast = useToast();
  const updateProjectProposalMutation = useUpdateProjectProposal();

  const showRejectionModal = ref(false);

  // TODO: аналогичные кнопки и функции есть на странице CreateProjectPage.vue, надо отрефакторить
  const currentUser = computed(() =>
    props.projectProposal.supervisors.find(
      (member) => member.supervisor.id === authStore.profileData?.id,
    ),
  );
  const currentUserRoleList = computed(() =>
    currentUser.value?.roles.map((role) => MemberRoleText[role.id]),
  );
  const canUserEdit = computed(() =>
    currentUser.value?.roles
      .map((role) => role.id)
      .includes(MemberRole.JobDeveloper),
  );
  const proposalState = computed(() => props.projectProposal.state.id);

  const showEditButton = computed(
    () =>
      canUserEdit.value && proposalState.value === ProjectProposalStateId.Draft,
  );
  const showDeleteButton = computed(
    () =>
      canUserEdit.value && proposalState.value === ProjectProposalStateId.Draft,
  );
  const showSaveAsDraftButton = computed(
    () =>
      canUserEdit.value &&
      proposalState.value === ProjectProposalStateId.Rejected,
  );
  const showRejectionReasonButton = computed(
    () =>
      proposalState.value === ProjectProposalStateId.Rejected ||
      props.projectProposal.rejection_reason,
  );

  function saveAsDraft() {
    updateProjectProposalMutation.mutate(
      {
        id: props.projectProposal.id,
        projectProposal: { state_id: ProjectProposalStateId.Draft },
      },
      { onError },
    );

    function onError(error: unknown) {
      toast(String(error), { type: TYPE.ERROR });
    }
  }

  function deleteDraft() {
    modalsStore.openAlertModal(
      'Функция удаления черновика на данный момент недоступна 😢',
    );
  }

  function closeRejectionModal() {
    showRejectionModal.value = false;
  }

  function openRejectionModal() {
    showRejectionModal.value = true;
  }
</script>

<style lang="scss" scoped>
  @import '@styles/breakpoints';

  .actions {
    display: flex;
    gap: 1.25rem;
    align-items: center;
  }

  .icon {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: 1.6em;
    height: 100%;
  }

  .button-with-icon {
    gap: 0.5rem;
  }

  .header {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.8125rem;
    align-items: center;
    padding-bottom: 1.25rem;
  }

  .status {
    align-self: flex-start;
    justify-self: flex-end;
    white-space: nowrap;

    @media (max-width: $tablet) {
      grid-column: 2;
      padding-right: 1rem;
      padding-left: 1rem;
    }
  }

  .card {
    padding: 1.375rem 1.3125rem;
  }

  .footer {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: space-between;
  }

  .title {
    max-width: 26.375rem;
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1.9375rem;
    color: #4f5569;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .subtitle {
    grid-column: 1 / -1;
    max-width: 26.3125rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.25rem;
    color: #4f5569;

    &:nth-child(3) {
      grid-row: 2;
    }

    &:nth-child(4) {
      grid-row: 3;
    }
  }

  .user-role {
    display: inline-block;
    white-space: nowrap;
  }
</style>
