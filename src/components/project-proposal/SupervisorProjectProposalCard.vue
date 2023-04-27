<template>
  <ProjectProposalCard :project-proposal="props.projectProposal">
    <template #team-member="{ teamMember }">
      <template v-if="teamMember.supervisor.id === authStore.profileData?.id">
        <p :class="$style['member-roles-title']">Роли в проекте:&nbsp;</p>
        <b
          v-for="(role, index) in teamMember.roles"
          :key="role.id"
          :class="$style['user-role']"
        >
          {{
            index === teamMember.roles.length - 1
              ? role.name
              : `${role.name},&nbsp;`
          }}
        </b>
      </template>
    </template>

    <template #actions>
      <BaseButton
        v-if="showDeleteButton"
        :class="$style['button-with-icon']"
        color="red"
        variant="inline-link"
        @click="deleteDraft"
      >
        <span :class="$style.icon" v-html="trashIcon"></span>
        удалить черновик
      </BaseButton>

      <BaseButton
        v-if="showRejectionReasonButton"
        :class="$style['button-with-icon']"
        variant="inline-link"
        @click="openRejectionModal"
      >
        <span :class="$style.icon" v-html="accentQuestionIcon"></span>
        узнать причину отклонения
      </BaseButton>

      <BaseButton
        is="router-link"
        v-if="showEditButton"
        :class="$style['button-with-icon']"
        :to="toProjectProposalCreateRoute(props.projectProposal.id)"
        variant="inline-link"
      >
        <span :class="$style.icon" v-html="penIcon"></span>
        редактировать заявку
      </BaseButton>

      <BaseButton
        is="router-link"
        v-else
        :class="$style['button-with-icon']"
        :to="toProjectProposalCreateRoute(props.projectProposal.id)"
        variant="inline-link"
      >
        <span :class="$style.icon" v-html="accentQuestionIcon"></span>
        подробнее
      </BaseButton>
    </template>
  </ProjectProposalCard>

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
  import BaseButton from '@/components/ui/BaseButton.vue';
  import { toProjectProposalCreateRoute } from '@/router/utils/routes';
  import {
    CreatedProjectProposal,
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
  import ProjectProposalCard from './ProjectProposalCard.vue';

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

<style lang="scss" module>
  @import '@styles/breakpoints';

  .icon {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: 1.6em;
    height: 100%;
  }

  .button-with-icon {
    gap: 0.5rem !important;
  }

  .user-role {
    display: inline-block;
    white-space: nowrap;
  }

  .member-roles-title {
    display: inline-block;
  }
</style>
